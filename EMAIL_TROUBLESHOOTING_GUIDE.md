# 📧 Email Troubleshooting Guide - Why Guests Don't Receive Invitations

## 🔍 Common Reasons Emails Don't Arrive

### 1. **Resend API Key Issues**
The most common problem is with the Resend API configuration.

**Check:**
- ✅ Is `RESEND_API_KEY` set in Vercel environment variables?
- ✅ Is the API key valid and active in your Resend dashboard?
- ✅ Has the API key been revoked or expired?

**How to verify:**
1. Go to https://resend.com/api-keys
2. Check if your API key is still active
3. If not, create a new one and update Vercel environment variables

---

### 2. **Email Domain Not Verified**
Currently using `onboarding@resend.dev` which is Resend's test domain.

**Problems with test domain:**
- ⚠️ Emails often go to spam/junk folders
- ⚠️ Some email providers block test domains
- ⚠️ Limited sending capacity

**Solution - Verify Your Own Domain:**

1. **Go to Resend Dashboard** → Domains → Add Domain
2. **Add your domain** (e.g., `eloiseandchristepher.com`)
3. **Add DNS records** provided by Resend to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
4. **Wait for verification** (usually 5-15 minutes)
5. **Update environment variable:**
   ```env
   RESEND_FROM_EMAIL=wedding@eloiseandchristepher.com
   ```

---

### 3. **Emails Going to Spam**
Even if emails are sent successfully, they might end up in spam.

**Why this happens:**
- Using test domain (`onboarding@resend.dev`)
- No SPF/DKIM records
- Email content triggers spam filters
- Recipient's email provider is strict

**How to check:**
1. Ask guests to check their spam/junk folder
2. Search for "Eloise & Christepher" in their email
3. Mark as "Not Spam" if found

**Long-term solution:**
- Verify your own domain (see #2 above)
- Add SPF, DKIM, and DMARC records
- Use a professional email address

---

### 4. **Environment Variables Not Set**
The code needs these environment variables to work:

**Required in Vercel:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev  # or your verified domain
NEXTAUTH_URL=https://your-domain.vercel.app
```

**How to check:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify all three variables are set for **Production** environment
3. If missing, add them and redeploy

---

### 5. **Invalid Guest Email Addresses**
Sometimes the email address in the database is incorrect.

**Check:**
- ✅ Email address is valid format (has @ and domain)
- ✅ No typos in the email address
- ✅ Email address is not a temporary/disposable email

**How to verify:**
1. Go to Admin Dashboard
2. Check the guest's email address
3. Edit if needed
4. Resend invitation

---

### 6. **Resend Rate Limits**
Free tier has sending limits.

**Resend Free Tier Limits:**
- 100 emails per day
- 3,000 emails per month

**If you hit the limit:**
- Wait 24 hours for daily limit to reset
- Upgrade to paid plan for higher limits
- Check Resend dashboard for current usage

---

### 7. **Email Template Issues**
The email template might have errors.

**Current template location:** `emails/wedding-invitation.tsx`

**Common issues:**
- Missing or broken images
- Invalid HTML/CSS
- React Email component errors

**How to test:**
1. Send a test email to yourself first
2. Check if it renders correctly
3. Look for any broken images or formatting

---

## 🛠️ Step-by-Step Debugging Process

### Step 1: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Go to "Functions" tab
4. Look for errors related to email sending

### Step 2: Check Resend Dashboard
1. Go to https://resend.com/emails
2. Check if emails are being sent
3. Look at delivery status:
   - ✅ **Delivered** - Email was sent successfully
   - ⚠️ **Bounced** - Email address is invalid
   - ⚠️ **Complained** - Marked as spam
   - ❌ **Failed** - Sending failed

### Step 3: Test with Your Own Email
1. Add yourself as a guest in the admin dashboard
2. Send invitation to yourself
3. Check if you receive it
4. Check spam folder if not in inbox

### Step 4: Check Database Status
1. Go to Admin Dashboard
2. Look at guest's invitation status:
   - `NOT_SENT` - Invitation hasn't been sent yet
   - `SENT` - Email was sent successfully
   - `FAILED` - Email sending failed

---

## ✅ Recommended Setup for Production

### 1. Get a Custom Domain
- Register a domain (e.g., `eloiseandchristepher.com`)
- Or use a subdomain of existing domain (e.g., `wedding.yourdomain.com`)

### 2. Verify Domain in Resend
- Add domain to Resend
- Configure DNS records (SPF, DKIM, DMARC)
- Wait for verification

### 3. Update Environment Variables
```env
RESEND_FROM_EMAIL=wedding@eloiseandchristepher.com
```

### 4. Test Thoroughly
- Send test emails to different email providers:
  - Gmail
  - Outlook/Hotmail
  - Yahoo
  - iCloud
- Check spam folders
- Verify all links work

---

## 🚨 Quick Fixes

### If emails are going to spam:
1. Ask guests to check spam folder
2. Add sender to contacts
3. Mark as "Not Spam"
4. Consider verifying your own domain

### If emails are not sending at all:
1. Check Vercel environment variables
2. Verify Resend API key is valid
3. Check Resend dashboard for errors
4. Look at Vercel function logs

### If some guests receive but others don't:
1. Check email addresses for typos
2. Some email providers might be blocking
3. Check Resend dashboard for bounces
4. Try resending to failed addresses

---

## 📊 Monitoring Email Delivery

### Resend Dashboard
- View all sent emails
- Check delivery status
- See bounce/complaint rates
- Monitor API usage

### Vercel Logs
- Check for server errors
- See email sending attempts
- Debug API issues

### Admin Dashboard
- Track invitation status per guest
- See who received invitations
- Identify failed sends
- Resend to failed guests

---

## 🔗 Useful Links

- **Resend Dashboard**: https://resend.com
- **Resend Documentation**: https://resend.com/docs
- **Resend API Keys**: https://resend.com/api-keys
- **Resend Domains**: https://resend.com/domains
- **Vercel Dashboard**: https://vercel.com

---

## 💡 Pro Tips

1. **Always test first** - Send to yourself before sending to all guests
2. **Use verified domain** - Much better deliverability than test domain
3. **Monitor Resend dashboard** - Check delivery status regularly
4. **Keep email simple** - Complex HTML can trigger spam filters
5. **Personalize emails** - Use guest names to avoid spam detection
6. **Check spam score** - Use tools like mail-tester.com
7. **Warm up domain** - Start with small batches, increase gradually

---

## 📝 Current Configuration

Based on your setup:

**Email Service:** Resend
**Current From Email:** `onboarding@resend.dev` (test domain)
**API Key Location:** Vercel Environment Variables
**Email Template:** `emails/wedding-invitation.tsx`

**Recommendation:** Verify your own domain for better deliverability!

