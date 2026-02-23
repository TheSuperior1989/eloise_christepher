# Local Development Setup Guide

## 🔴 Current Issue

Your local network **blocks connections to Supabase** (port 5432), so `npm run dev` cannot connect to the database.

## ✅ Solution: Use Vercel Dev

Vercel CLI's `vercel dev` command runs your app through Vercel's infrastructure, which CAN connect to Supabase.

## 📋 Setup Steps

### Step 1: Verify Vercel CLI is Installed ✅

Already done! You have Vercel CLI installed and linked to your project.

### Step 2: Set Environment Variables in Vercel Dashboard

You need to add your environment variables to Vercel so they can be pulled locally:

1. Go to: https://vercel.com/tiaans-projects-de125fa2/eloise-christepher/settings/environment-variables

2. Add these environment variables for **Development** environment:

```
DATABASE_URL=postgresql://postgres.oygrnxxuwozruvcfxyui:[YOUR_DB_PASSWORD]@db.oygrnxxuwozruvcfxyui.supabase.co:5432/postgres

NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production-min-32-chars

NEXTAUTH_URL=http://localhost:3000

RESEND_API_KEY=re_123456789 (if you have one)

AUTH_TRUST_HOST=true
```

**Important**: Make sure to select **Development** environment when adding these!

### Step 3: Pull Environment Variables

After adding them in Vercel dashboard, run:

```bash
vercel env pull .env.local
```

This will download all your environment variables to `.env.local`.

### Step 4: Run Development Server

Instead of `npm run dev`, use:

```bash
vercel dev
```

This will:
- Start a local development server
- Connect through Vercel's infrastructure
- Have access to Supabase (no network blocking)
- Use your environment variables from Vercel

## 🎯 Quick Start (After Setting Up Vercel Env Vars)

```bash
# Pull latest environment variables
vercel env pull .env.local

# Start development server through Vercel
vercel dev
```

Then open: http://localhost:3000

## 🔧 Alternative: Use Production Site

If you don't want to set up local development, just use the production site:

**https://eloise-christepher.vercel.app/admin/login**

Credentials:
- Email: `christiaanvonstade@gmail.com`
- Password: `[reset in app]`

## 📝 Why This Works

| Method | Database Connection | Works? |
|--------|-------------------|--------|
| `npm run dev` | Direct from your PC → Supabase | ❌ Blocked by network |
| `vercel dev` | Your PC → Vercel → Supabase | ✅ Works! |
| Production | Vercel → Supabase | ✅ Works! |

## 🚨 Important Notes

1. **Never commit `.env.local`** - it's already in `.gitignore`
2. **Use `vercel dev` instead of `npm run dev`** for local development
3. **Production site works perfectly** - use it if you don't need local dev

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/tiaans-projects-de125fa2/eloise-christepher
- Environment Variables: https://vercel.com/tiaans-projects-de125fa2/eloise-christepher/settings/environment-variables
- Production Site: https://eloise-christepher.vercel.app
- Vercel CLI Docs: https://vercel.com/docs/cli

