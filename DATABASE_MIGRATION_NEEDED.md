# Database Migration Required

## Issue Fixed
The guest registration was failing with a 500 error because:
1. The database schema had `@@unique([email])` which caused issues with empty emails
2. The API wasn't properly handling empty string values for optional fields

## Changes Made

### 1. Prisma Schema (`prisma/schema.prisma`)
**Changed:**
```prisma
email String? @unique
```
**Removed:**
```prisma
@@unique([email])
```

This allows the email field to be optional and unique only when provided.

### 2. API Route (`app/api/register-guest/route.ts`)
**Updated** to properly handle empty strings by converting them to `undefined`:
```typescript
email: guest.email && guest.email.trim() !== "" ? guest.email : undefined,
phone: guest.phone && guest.phone.trim() !== "" ? guest.phone : undefined,
relationToBride: guest.relationToBride && guest.relationToBride.trim() !== "" ? guest.relationToBride : undefined,
relationToGroom: guest.relationToGroom && guest.relationToGroom.trim() !== "" ? guest.relationToGroom : undefined,
```

## Required Action: Apply Database Migration

You need to apply this schema change to your Supabase database. Here are your options:

### Option 1: Using Prisma Migrate (Recommended for Production)

1. Make sure your `.env` file has the correct `DATABASE_URL` for Supabase
2. Run the migration:
   ```bash
   npx prisma migrate deploy
   ```

### Option 2: Using Prisma DB Push (Quick for Development)

```bash
npx prisma db push
```

This will sync your schema directly to the database without creating a migration file.

### Option 3: Manual SQL (If you prefer)

Run this SQL in your Supabase SQL Editor:

```sql
-- Remove the old unique constraint on email
ALTER TABLE "Guest" DROP CONSTRAINT IF EXISTS "Guest_email_key";

-- Add the unique constraint directly to the email column (allows NULL)
-- This is already handled by the @unique in the schema
-- Prisma will create the constraint automatically
```

## Verification

After applying the migration, test the guest registration:

1. Go to `/register-guest`
2. Try registering a guest WITHOUT an email
3. Try registering a guest WITH an email
4. Verify both work correctly

## Background Image

The background image issue has also been fixed:
- ✅ Created `public/assets/guest-registration-boho.jpg`
- ✅ Updated the page to use the new image
- ✅ Image should now display correctly

## Next Steps

1. **Apply the database migration** using one of the options above
2. **Test the guest registration** to ensure it works
3. **Verify the background image** displays correctly

## Troubleshooting

If you still get errors after migration:

1. **Check Supabase Connection:**
   - Verify your `DATABASE_URL` in `.env` is correct
   - Make sure your Supabase project is running

2. **Check Prisma Client:**
   - Run `npx prisma generate` to regenerate the client
   - Restart your dev server

3. **Check Database:**
   - Log into Supabase dashboard
   - Check the `Guest` table schema
   - Verify the email column has the unique constraint

## Files Changed

- ✅ `prisma/schema.prisma` - Fixed email unique constraint
- ✅ `app/api/register-guest/route.ts` - Handle empty strings properly
- ✅ `public/assets/guest-registration-boho.jpg` - Added background image

All changes have been committed and pushed to GitHub! 🚀

