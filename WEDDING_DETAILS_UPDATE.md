# Wedding Details Update Summary

## ✅ Changes Made

### 📅 Wedding Date Updated
- **Old**: Saturday, June 21, 2025
- **New**: Saturday, April 4, 2026

### 📍 Location Updated
- **Old**: Charleston, South Carolina, USA
- **New**: Kwalata Game Lodge, Dinokeng Game Reserve, Hammanskraal, South Africa

### 🖼️ Wedding Party Images Added

Created placeholder images for all wedding party members in `public/assets/wedding-party/`:

#### Bridal Party (3 members)
1. ✅ Cherize Van Stade - Maid of Honor
2. ✅ Anieke Kelly - Bridesmaid
3. ✅ Bianca - Bridesmaid

#### Groom's Party (4 members)
4. ✅ Brian Le Roux - Best Man
5. ✅ Jeandre Du Plessis - Best Man
6. ✅ Pieter Myburge - Groomsman
7. ✅ Andre Bisset - Groomsman

## 📝 Files Modified

### Components Updated
- `components/hero.tsx` - Updated date and location
- `components/location-section.tsx` - Updated venue details, map, and travel information
- `components/wedding-party-section.tsx` - Added images to wedding party cards
- `app/layout.tsx` - Updated all metadata, SEO tags, and Open Graph information

### New Files Created
- `public/assets/wedding-party/` - Folder for wedding party images
- `public/assets/wedding-party/*.svg` - 7 placeholder images (one for each person)
- `public/assets/wedding-party/README.md` - Instructions for replacing placeholders

## 🎨 Visual Changes

### Wedding Party Section
- Added circular profile images above each person's name
- Images are 128x128 pixels (w-32 h-32)
- Displayed in rounded circles with proper Next.js Image optimization
- Placeholder SVGs use wedding color scheme:
  - Gold (#C4A57B) for bridal party
  - Brown (#8B7355) for groom's party

### Location Section
- Updated venue name to "Kwalata Game Lodge"
- Updated address to Dinokeng Game Reserve, Hammanskraal
- Updated map embed (placeholder - needs actual coordinates)
- Updated accommodation info for South African context
- Updated airport info to O.R. Tambo International (JNB)

## 📋 Next Steps - Action Required

### 1. Replace Placeholder Images
Location: `public/assets/wedding-party/`

**For each person, replace the SVG file with an actual photo:**
- Recommended format: JPG or WebP
- Minimum size: 400x400 pixels (square)
- Keep the same filename, just change extension
- Example: `cherize-van-stade.svg` → `cherize-van-stade.jpg`

**If you change file extensions:**
- Update `components/wedding-party-section.tsx`
- Change `.svg` to `.jpg` (or your chosen format) in the image paths

### 2. Update Map Coordinates
File: `components/location-section.tsx`

The Google Maps embed needs actual coordinates for Kwalata Game Lodge:
- Current: Placeholder coordinates
- Action: Get proper embed code from Google Maps
- Visit: https://www.google.com/maps
- Search: "Kwalata Game Lodge, Dinokeng"
- Click "Share" → "Embed a map" → Copy iframe code
- Replace the iframe src in `location-section.tsx`

### 3. Verify All Details
- [ ] Check wedding date is correct: April 4, 2026
- [ ] Verify venue name spelling
- [ ] Confirm accommodation recommendations
- [ ] Update travel/airport information if needed
- [ ] Test the map embed works correctly

### 4. Update Other Sections (Optional)
You may want to review and update:
- `components/schedule-section.tsx` - Wedding day timeline
- `components/our-story.tsx` - Your story timeline
- `components/qa-section.tsx` - FAQ answers
- `components/registry-section.tsx` - Registry information

## 🔍 SEO Updates

All metadata has been updated with new date and location:
- Page title: "Eloise & Christopher - April 4, 2026"
- Description: Mentions Kwalata Game Lodge and South Africa
- Keywords: Updated to include South African location
- Open Graph tags: Updated for social media sharing
- Twitter cards: Updated with new information

## 🚀 Build Status

✅ **Production build successful**
- No TypeScript errors
- No build warnings (except workspace root warning - harmless)
- All images optimized
- All pages generated successfully

## 📸 Image Replacement Guide

### Quick Steps:
1. Gather 7 photos (one for each wedding party member)
2. Crop to square format (1:1 ratio)
3. Resize to at least 400x400 pixels
4. Save with same filenames in `public/assets/wedding-party/`
5. Recommended: Use JPG or WebP format
6. If changing extensions, update `components/wedding-party-section.tsx`

### Image Optimization Tools:
- **TinyPNG**: https://tinypng.com/ (free, web-based)
- **ImageOptim**: https://imageoptim.com/ (Mac)
- **Squoosh**: https://squoosh.app/ (web-based, by Google)

### Example Filename Changes:
```
cherize-van-stade.svg → cherize-van-stade.jpg
anieke-kelly.svg → anieke-kelly.jpg
bianca.svg → bianca.jpg
brian-le-roux.svg → brian-le-roux.jpg
jeandre-du-plessis.svg → jeandre-du-plessis.jpg
pieter-myburge.svg → pieter-myburge.jpg
andre-bisset.svg → andre-bisset.jpg
```

## 🌍 South Africa Specific Updates

### Travel Information
- Airport: O.R. Tambo International (JNB), Johannesburg
- Distance: ~90 minutes from venue
- Recommendation: Car rental or shuttle service

### Accommodation
- On-site: Kwalata Game Lodge
- Nearby: Pretoria (additional options)

### Time Zone
- South Africa Standard Time (SAST) - UTC+2
- No daylight saving time

## ✨ Ready to Deploy

Your site is ready for deployment with the updated wedding details. Just replace the placeholder images and verify the map coordinates, and you're all set!

---

**Updated**: 2025-10-29  
**Wedding Date**: Saturday, April 4, 2026  
**Location**: Kwalata Game Lodge, South Africa  
**Build Status**: ✅ Passing

