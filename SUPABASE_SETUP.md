# 🗄️ Supabase Integration Guide

## ✅ Supabase Project Created!

Your new Supabase project has been created:

- **Project Name**: eloise-christepher-wedding
- **Project ID**: oygrnxxuwozruvcfxyui
- **Region**: EU West (Ireland)
- **Status**: Active & Healthy
- **Database**: PostgreSQL 17.6

---

## 🔑 Connection Strings

### For Vercel (Production)
Use the **Connection Pooling** URL:
```
postgresql://postgres.oygrnxxuwozruvcfxyui:WeddingDB2025!Secure@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### For Local Development (Migrations)
Use the **Direct Connection** URL:
```
postgresql://postgres.oygrnxxuwozruvcfxyui:WeddingDB2025!Secure@db.oygrnxxuwozruvcfxyui.supabase.co:5432/postgres
```

---

## 📝 Setup Instructions

### 1. Add Environment Variables to Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```env
# Database
DATABASE_URL=postgresql://postgres.oygrnxxuwozruvcfxyui:WeddingDB2025!Secure@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

# NextAuth
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://your-domain.vercel.app

# Resend Email
RESEND_API_KEY=<your-resend-api-key>
RESEND_FROM_EMAIL=wedding@yourdomain.com
```

### 2. Run Database Migration

The Prisma schema has been updated to use PostgreSQL. To set up the database:

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to https://supabase.com/dashboard/project/oygrnxxuwozruvcfxyui
2. Navigate to SQL Editor
3. Run the migration SQL (see below)

**Option B: Using Prisma CLI (if connection works)**
```bash
npx prisma migrate deploy
```

### 3. Seed the Database

After migration, seed with admin users and wedding party:
```bash
npx tsx prisma/seed.ts
```

---

## 🗃️ Migration SQL

If you need to manually run the migration in Supabase SQL Editor:

```sql
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('NOT_SENT', 'SENT', 'DELIVERED', 'OPENED', 'FAILED');

-- CreateEnum
CREATE TYPE "RsvpStatus" AS ENUM ('PENDING', 'ATTENDING', 'NOT_ATTENDING', 'MAYBE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "relationToBride" TEXT,
    "relationToGroom" TEXT,
    "invitationStatus" "InvitationStatus" NOT NULL DEFAULT 'NOT_SENT',
    "rsvpStatus" "RsvpStatus" NOT NULL DEFAULT 'PENDING',
    "plusOne" BOOLEAN NOT NULL DEFAULT false,
    "plusOneName" TEXT,
    "dietaryRestrictions" TEXT,
    "notes" TEXT,
    "invitationToken" TEXT NOT NULL,
    "invitationSentAt" TIMESTAMP(3),
    "rsvpSubmittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_invitationToken_key" ON "Guest"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- CreateIndex
CREATE INDEX "Guest_invitationToken_idx" ON "Guest"("invitationToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

---

## 🔐 Database Credentials

**Database Password**: `WeddingDB2025!Secure`

⚠️ **Important**: Change this password in production!

To change the password:
1. Go to Supabase Dashboard → Settings → Database
2. Click "Reset Database Password"
3. Update all environment variables with the new password

---

## 🌐 Accessing Supabase Dashboard

Visit: https://supabase.com/dashboard/project/oygrnxxuwozruvcfxyui

From here you can:
- View and edit data in Table Editor
- Run SQL queries
- Monitor database performance
- Manage authentication
- View logs

---

## 🚀 Next Steps

1. ✅ Add environment variables to Vercel
2. ✅ Run migration SQL in Supabase dashboard
3. ✅ Seed the database with admin users
4. ✅ Deploy to Vercel
5. ✅ Test the application

---

## 📊 What Changed

### Files Updated:
- `prisma/schema.prisma` - Changed from SQLite to PostgreSQL
- `.env` - Updated with Supabase connection strings
- `.env.example` - Updated with Supabase template

### Key Changes:
- Database provider changed from `sqlite` to `postgresql`
- Added `directUrl` for migrations
- Updated `Guest.invitationToken` to have a default value
- Changed `Guest.email` unique constraint to support NULL values properly

---

## 🆘 Troubleshooting

### Can't connect to database locally
- Supabase requires IPv6 or you may need to use their connection pooler
- Try running migrations directly in Supabase SQL Editor instead

### Migration fails
- Make sure the database is empty or use `--create-only` flag
- Run the SQL manually in Supabase dashboard

### Seed fails
- Make sure migration ran successfully first
- Check that all tables exist in Supabase Table Editor

---

## 💡 Benefits of Supabase

✅ **Free PostgreSQL database** (500MB storage, 2GB bandwidth)
✅ **Automatic backups** (7 days retention on free tier)
✅ **Built-in authentication** (can replace NextAuth if needed)
✅ **Real-time subscriptions** (for future features)
✅ **Storage for files** (can store wedding photos)
✅ **Edge Functions** (serverless functions)
✅ **Dashboard UI** for easy data management

---

## 🔗 Useful Links

- Supabase Dashboard: https://supabase.com/dashboard/project/oygrnxxuwozruvcfxyui
- Prisma Docs: https://www.prisma.io/docs/guides/database/supabase
- Vercel Docs: https://vercel.com/docs/storage/vercel-postgres

