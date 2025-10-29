# Deployment Guide

## Production Checklist

Before deploying to production, ensure you've completed the following:

### ✅ Code Quality
- [x] All TypeScript errors resolved
- [x] ESLint passes without errors
- [x] Production build completes successfully
- [x] No console errors in browser

### ✅ Configuration
- [x] Environment variables configured
- [x] Image optimization enabled
- [x] SEO metadata configured
- [x] Analytics integrated (Vercel Analytics)
- [x] Robots.txt configured
- [x] Sitemap generated

### ✅ Performance
- [x] Images optimized (AVIF/WebP)
- [x] Bundle size optimized
- [x] Compression enabled
- [x] React strict mode enabled

### 📝 Pre-Deployment Steps

1. **Update Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Set `NEXT_PUBLIC_SITE_URL` to your production domain
   - Update any other required environment variables

2. **Update Site-Specific Content**
   - Update `public/robots.txt` with your production domain
   - Verify all wedding details are correct
   - Test all links and navigation

3. **Test Build Locally**
   ```bash
   npm run build
   npm run start
   ```
   Visit http://localhost:3000 and verify everything works

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest deployment option for Next.js applications.

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Git**
   - Push your code to GitHub/GitLab/Bitbucket
   - Import project at https://vercel.com/new
   - Vercel will auto-detect Next.js and configure everything
   - Set environment variables in Vercel dashboard

3. **Deploy via CLI**
   ```bash
   vercel
   ```

4. **Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SITE_URL` with your production domain
   - Redeploy after adding variables

### Option 2: Static Export (for static hosting)

If you want to deploy to static hosting (Netlify, GitHub Pages, etc.):

1. **Update next.config.mjs**
   ```javascript
   const nextConfig = {
     output: 'export',
     // ... rest of config
   }
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy the `out` folder** to your static host

### Option 3: Self-Hosted (Node.js)

For custom server deployment:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

3. **Use a process manager** (PM2, systemd, etc.)
   ```bash
   npm i -g pm2
   pm2 start npm --name "wedding-site" -- start
   ```

4. **Set up reverse proxy** (nginx, Apache, etc.)

## Post-Deployment

### Verify Deployment

1. **Check Core Functionality**
   - [ ] Site loads correctly
   - [ ] All sections visible
   - [ ] Navigation works
   - [ ] Images load properly
   - [ ] Mobile responsive

2. **Test SEO**
   - [ ] Meta tags present (view source)
   - [ ] Open Graph tags working (test with https://www.opengraph.xyz/)
   - [ ] Sitemap accessible at `/sitemap.xml`
   - [ ] Robots.txt accessible at `/robots.txt`

3. **Performance Testing**
   - [ ] Run Lighthouse audit (aim for 90+ scores)
   - [ ] Test on mobile devices
   - [ ] Check loading speed

### Monitoring

- **Vercel Analytics**: Automatically enabled if deployed on Vercel
- **Google Analytics**: Add GA_ID to environment variables if needed
- **Error Tracking**: Consider adding Sentry for production error tracking

## Updating the Site

### For Content Changes

1. Edit the relevant component files
2. Test locally: `npm run dev`
3. Commit and push to Git
4. Vercel will auto-deploy (or manually deploy)

### For Major Updates

1. Create a new branch
2. Make changes and test thoroughly
3. Run production build: `npm run build`
4. Create pull request
5. Merge to main after review
6. Deploy to production

## Troubleshooting

### Build Fails

- Check TypeScript errors: `npx tsc --noEmit`
- Check ESLint: `npm run lint`
- Clear cache: `rm -rf .next node_modules && npm install`

### Images Not Loading

- Verify image paths are correct
- Check image optimization settings in `next.config.mjs`
- Ensure images are in the `public` folder

### Environment Variables Not Working

- Prefix client-side variables with `NEXT_PUBLIC_`
- Redeploy after adding new variables
- Check Vercel dashboard for correct values

## Security Considerations

- ✅ No sensitive data in client-side code
- ✅ Environment variables properly configured
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Security headers configured
- ✅ No exposed API keys

## Performance Optimization Tips

1. **Images**: All images should be optimized and use Next.js Image component
2. **Fonts**: Using Google Fonts with next/font for optimal loading
3. **Bundle Size**: Monitor with `npm run build` output
4. **Caching**: Configured in next.config.mjs
5. **Compression**: Enabled for all responses

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Vercel support: https://vercel.com/support
- GitHub Issues: Create an issue in your repository

---

**Last Updated**: 2025-10-29
**Next.js Version**: 16.0.0
**Node Version Required**: 18.x or higher

