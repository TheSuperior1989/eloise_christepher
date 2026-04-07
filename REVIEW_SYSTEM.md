# Post-Wedding Review System

## Overview

This system collects post-wedding feedback from Eloise & Christepher's guests (April 4, 2026 — Kwalata Game Lodge, Dinokeng Game Reserve). Each guest receives a unique, one-time review link. Clicking the link opens a branded review form where they rate their experience across several dimensions (overall, venue, catering, photography, music, ceremony) and provide an NPS score and optional text feedback.

Reviews are stored in the Supabase/PostgreSQL database alongside the token records that track which guests have and haven't responded. An admin dashboard (protected by NextAuth session) gives a live view of all submissions and response rates.

The data collected here feeds directly into the IDOSA wedding marketplace — providing real, structured wedding venue and vendor feedback that reflects an actual South African bush wedding experience.

## Database Schema

```
ReviewToken
───────────
id          String    PK
token       String    UNIQUE  ← the value in the URL /review/{token}
guestName   String
guestEmail  String
usedAt      DateTime? ← set when a review is submitted
createdAt   DateTime

WeddingReview
─────────────
id                String    PK
tokenId           String    FK → ReviewToken.id (UNIQUE — one review per token)
guestName         String
guestEmail        String
overallRating     Int       1–5
npsScore          Int       0–10
venueRating       Int?      1–5
cateringRating    Int?      1–5
photographyRating Int?      1–5
musicRating       Int?      1–5
ceremonyRating    Int?      1–5
highlights        String?
improvements      String?
comments          String?
wouldRecommend    Boolean
submittedAt       DateTime
```

One-to-one relationship: each `ReviewToken` has at most one `WeddingReview`. A token can only be used once — subsequent submit attempts return HTTP 409.

## Setup

### 1. Environment variables

Add to `.env.local` (see `.env.example`):

```
REVIEW_ADMIN_SECRET="<generate with: openssl rand -base64 32>"
```

`NEXT_PUBLIC_SITE_URL` must also be set so generated review URLs use the correct domain.

### 2. Database migration

Run the migration to create the two new tables:

```bash
npx prisma migrate dev --name add-review-system
# or for production:
npx prisma migrate deploy
```

Alternatively, push directly:

```bash
npx prisma db push
```

### 3. Generate Prisma client

```bash
npx prisma generate
```

## Generating & Sending Review Links

### Step 1 — prepare a CSV

Create a file `guests.csv` with columns `guest_name` and `guest_email` (see `scripts/guests.csv` for an example):

```csv
guest_name,guest_email
Jane Smith,jane@example.com
Michael Johnson,michael@example.com
```

### Step 2 — run the token generation script

Make sure the Next.js dev server (or production site) is running, then:

```bash
# Against local dev server
NEXT_PUBLIC_SITE_URL=http://localhost:3000 npx tsx scripts/generate-review-tokens.ts guests.csv

# Against production
NEXT_PUBLIC_SITE_URL=https://your-domain.com npx tsx scripts/generate-review-tokens.ts guests.csv
```

This creates a `review-invites.csv` file with columns: `guest_name`, `guest_email`, `review_url`, `token`.

### Step 3 — send the links

Open `review-invites.csv` and paste the `review_url` for each guest into your email client, WhatsApp message, or Resend email campaign.

Each URL looks like: `https://your-domain.com/review/<token>`

## Admin Dashboard

Protected by NextAuth — you must be signed in as an admin first.

URL: `/admin/reviews`

The dashboard shows:
- Summary stats: total tokens issued, reviews submitted, response rate, average overall rating, average NPS
- All submitted reviews with expandable detail (category ratings, highlights, improvements, comments)
- All issued tokens with pending/submitted status and a copy of the review URL

## API Reference

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/reviews/generate-token` | POST | None | Creates a `ReviewToken`. Body: `{ guest_name, guest_email }`. Returns `{ token, review_url, guest_name, guest_email }`. |
| `/api/reviews/submit` | POST | Token in body | Submits a review. Body: `{ token, overallRating, npsScore, ... }`. Returns `{ success: true }`. |
| `/api/reviews/admin` | GET | `x-admin-secret` header | Returns `{ summary, reviews, tokens }`. Returns 401 if secret is missing or wrong. |

### POST /api/reviews/submit — full body schema

```json
{
  "token": "string (required)",
  "overallRating": "1–5 (required)",
  "npsScore": "0–10 (required)",
  "venueRating": "1–5 (optional)",
  "cateringRating": "1–5 (optional)",
  "photographyRating": "1–5 (optional)",
  "musicRating": "1–5 (optional)",
  "ceremonyRating": "1–5 (optional)",
  "highlights": "string (optional)",
  "improvements": "string (optional)",
  "comments": "string (optional)",
  "wouldRecommend": "boolean (default true)"
}
```

## Testing

A Playwright spec lives at `tests/review-system.spec.ts`. Install Playwright first:

```bash
npm install -D @playwright/test
npx playwright install chromium
```

Run the spec against the local dev server:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 \
REVIEW_ADMIN_SECRET=<your-secret> \
npx playwright test tests/review-system.spec.ts
```
