# Production Checklist ✅

## Before Going Live

### 🔧 Technical Setup
- [x] All dependencies installed
- [x] TypeScript errors resolved
- [x] ESLint configured and passing
- [x] Production build successful
- [x] Image optimization enabled
- [x] Performance optimizations configured

### 🎨 Content & Design
- [ ] Update all wedding details (date, time, location)
- [ ] Replace placeholder images with actual photos
- [ ] Verify all text content is accurate
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check all links work correctly

### 🔍 SEO & Analytics
- [x] Meta tags configured
- [x] Open Graph tags added
- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Vercel Analytics integrated
- [ ] Update `NEXT_PUBLIC_SITE_URL` in environment variables
- [ ] Update robots.txt with production domain
- [ ] Test Open Graph preview (https://www.opengraph.xyz/)

### 🚀 Deployment
- [ ] Environment variables set in production
- [ ] Domain configured (if using custom domain)
- [ ] SSL certificate active (automatic on Vercel)
- [ ] Test production deployment
- [ ] Verify all sections load correctly

### 📱 Testing
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Tablet view
- [ ] Lighthouse audit (aim for 90+ scores)
- [ ] Accessibility check
- [ ] Load time under 3 seconds

### 🔒 Security
- [x] No sensitive data in code
- [x] Environment variables properly configured
- [x] Security headers enabled
- [x] HTTPS enforced

### 📊 Post-Launch
- [ ] Monitor analytics
- [ ] Check for errors in logs
- [ ] Gather feedback from guests
- [ ] Update content as needed

## Quick Commands

```bash
# Development
pnpm dev

# Production build
pnpm build

# Start production server locally
pnpm start

# Lint code
pnpm lint

# Type check
npx tsc --noEmit
```

## Important Files to Update

1. **Environment Variables** (`.env.local` or Vercel dashboard)
   - `NEXT_PUBLIC_SITE_URL` - Your production domain

2. **Robots.txt** (`public/robots.txt`)
   - Update sitemap URL with your domain

3. **Content Files**
   - `app/page.tsx` - Main page content
   - `components/*.tsx` - Individual sections
   - `public/` - Replace placeholder images

## Performance Targets

- **Lighthouse Performance**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Deployment Guide](./DEPLOYMENT.md)
- [README](./README.md)

---

**Last Updated**: 2025-10-29

