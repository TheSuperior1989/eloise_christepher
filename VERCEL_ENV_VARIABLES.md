# 🔐 Vercel Environment Variables

## Complete List of Environment Variables to Add

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Add each of these:

---

### 1. DATABASE_URL
**Description**: Supabase PostgreSQL connection string (with connection pooling)

**Value**:
```
postgresql://postgres.oygrnxxuwozruvcfxyui:WeddingDB2025!Secure@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Environment**: Production, Preview, Development

---

### 2. NEXTAUTH_SECRET
**Description**: Secret key for NextAuth.js to encrypt sessions and JWT tokens

**Value**:
```
PbaDTrt/SvI6JGTDt7SF5bCuQSebsdR7R6lqqwS6rYc=
```

**Environment**: Production, Preview, Development

---

### 3. NEXTAUTH_URL
**Description**: Full URL of your deployed website

**Value**:
```
https://eloise-christopher.vercel.app
```

**Environment**: Production only

**Note**: For Preview and Development, Vercel automatically sets this, so only add it to Production.

---

### 4. RESEND_API_KEY
**Description**: API key from Resend for sending emails

**Value**:
```
re_f2SrpZbS_9komerqALCqbcyfR2AppmVfL
```

**Environment**: Production, Preview, Development

---

### 5. RESEND_FROM_EMAIL
**Description**: Email address that wedding invitations will be sent from

**Value**:
```
onboarding@resend.dev
```

**Environment**: Production, Preview, Development

**Note**: This is Resend's test domain. Emails will work immediately but may go to spam. Upgrade to a custom domain later for better deliverability.

---

## 📋 Quick Copy-Paste Format

For easy copying into Vercel:

```
DATABASE_URL=postgresql://postgres.oygrnxxuwozruvcfxyui:WeddingDB2025!Secure@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true

NEXTAUTH_SECRET=PbaDTrt/SvI6JGTDt7SF5bCuQSebsdR7R6lqqwS6rYc=

NEXTAUTH_URL=https://eloise-christopher.vercel.app

RESEND_API_KEY=re_f2SrpZbS_9komerqALCqbcyfR2AppmVfL

RESEND_FROM_EMAIL=onboarding@resend.dev
```

---

## ✅ Checklist

After adding all environment variables:

- [ ] All 5 variables added to Vercel
- [ ] Vercel automatically redeploys (check deployment status)
- [ ] Wait for deployment to complete
- [ ] Run database migration in Supabase (see SUPABASE_SETUP.md)
- [ ] Seed database with admin users
- [ ] Test login at https://eloise-christopher.vercel.app/admin/login
- [ ] Test sending invitation emails

---

## 🔄 After Deployment

Once Vercel redeploys with the new environment variables:

1. **Set up the database** (if not done yet):
   - Go to Supabase SQL Editor
   - Run the migration SQL from `SUPABASE_SETUP.md`

2. **Seed the database**:
   - You can do this locally or via Supabase SQL Editor
   - Creates 3 admin users and 7 wedding party guests

3. **Test the application**:
   - Visit: https://eloise-christopher.vercel.app
   - Click "Sign In" in the navigation
   - Login with: `christiaanvonstade@gmail.com` / `admin123`
   - Try sending a test invitation

---

## 🚨 Important Notes

### Security
- ✅ Never commit `.env` file to Git (it's in `.gitignore`)
- ✅ Keep API keys secret
- ✅ Change database password in production
- ✅ Use different NEXTAUTH_SECRET for dev and production

### Email Deliverability
- ⚠️ Using `onboarding@resend.dev` means emails might go to spam
- ✅ For better deliverability, upgrade to a custom domain later
- ✅ Test emails with your own email addresses first

### Database
- ✅ Supabase free tier: 500MB storage, 2GB bandwidth
- ✅ Automatic backups (7 days retention)
- ✅ Can upgrade if needed

---

## 🆘 Troubleshooting

### Deployment fails
- Check that all environment variables are set correctly
- Look at Vercel deployment logs for specific errors
- Make sure DATABASE_URL is the connection pooling URL (port 6543)

### Can't login
- Make sure database migration ran successfully
- Make sure database was seeded with admin users
- Check Vercel logs for authentication errors

### Emails not sending
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for email logs
- Make sure RESEND_FROM_EMAIL is set to `onboarding@resend.dev`

---

## 📞 Admin Credentials

After seeding the database:

```
Email: christiaanvonstade@gmail.com
Password: admin123

Email: eloisebissei@gmail.com
Password: Tarzan@GooiMielies

Email: christepher.vonstade@gmail.com
Password: KolGans@Goosy
```

---

## 🔗 Useful Links

- **Your Website**: https://eloise-christopher.vercel.app
- **Admin Login**: https://eloise-christopher.vercel.app/admin/login
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://supabase.com/dashboard/project/oygrnxxuwozruvcfxyui
- **Resend Dashboard**: https://resend.com/emails

