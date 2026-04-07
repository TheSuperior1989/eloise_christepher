-- ============================================================
-- Run this entire script in the Supabase SQL Editor
-- Supabase dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ── Migration 1: Add review tables ───────────────────────────

CREATE TABLE IF NOT EXISTS "ReviewToken" (
    "id"          TEXT        NOT NULL,
    "token"       TEXT        NOT NULL,
    "guestName"   TEXT        NOT NULL,
    "guestEmail"  TEXT        NOT NULL,
    "usedAt"      TIMESTAMP(3),
    "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReviewToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "WeddingReview" (
    "id"                TEXT        NOT NULL,
    "tokenId"           TEXT        NOT NULL,
    "guestName"         TEXT        NOT NULL,
    "guestEmail"        TEXT        NOT NULL,
    "overallRating"     INTEGER     NOT NULL,
    "npsScore"          INTEGER     NOT NULL,
    "venueRating"       INTEGER,
    "cateringRating"    INTEGER,
    "photographyRating" INTEGER,
    "musicRating"       INTEGER,
    "ceremonyRating"    INTEGER,
    "highlights"        TEXT,
    "improvements"      TEXT,
    "comments"          TEXT,
    "wouldRecommend"    BOOLEAN     NOT NULL DEFAULT true,
    "submittedAt"       TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeddingReview_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ReviewToken_token_key"      ON "ReviewToken"("token");
CREATE INDEX        IF NOT EXISTS "ReviewToken_token_idx"       ON "ReviewToken"("token");
CREATE UNIQUE INDEX IF NOT EXISTS "WeddingReview_tokenId_key"  ON "WeddingReview"("tokenId");

ALTER TABLE "WeddingReview"
    ADD CONSTRAINT IF NOT EXISTS "WeddingReview_tokenId_fkey"
    FOREIGN KEY ("tokenId") REFERENCES "ReviewToken"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- ── Migration 2: Enable RLS on all tables ────────────────────
-- Blocks all PostgREST / anon access.
-- Prisma's service_role connection bypasses RLS — app is unaffected.

ALTER TABLE "User"              ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Account"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Guest"             ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewToken"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WeddingReview"     ENABLE ROW LEVEL SECURITY;
