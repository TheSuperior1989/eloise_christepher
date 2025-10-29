# Quick Image Replacement Guide

## Wedding Party Images

Replace the placeholder SVG files in `public/assets/wedding-party/` with actual photos.

### File List

| Person | Role | Current File | Replace With |
|--------|------|--------------|--------------|
| Cherize Van Stade | Maid of Honor | `cherize-van-stade.svg` | Your photo (JPG/PNG/WebP) |
| Anieke Kelly | Bridesmaid | `anieke-kelly.svg` | Your photo (JPG/PNG/WebP) |
| Bianca | Bridesmaid | `bianca.svg` | Your photo (JPG/PNG/WebP) |
| Brian Le Roux | Best Man | `brian-le-roux.svg` | Your photo (JPG/PNG/WebP) |
| Jeandre Du Plessis | Best Man | `jeandre-du-plessis.svg` | Your photo (JPG/PNG/WebP) |
| Pieter Myburge | Groomsman | `pieter-myburge.svg` | Your photo (JPG/PNG/WebP) |
| Andre Bisset | Groomsman | `andre-bisset.svg` | Your photo (JPG/PNG/WebP) |

## Simple 3-Step Process

### Step 1: Prepare Your Photos
- Crop to square (1:1 ratio)
- Resize to 400x400 pixels minimum
- Save as JPG, PNG, or WebP

### Step 2: Replace Files
- Keep the same filename
- Just change the extension
- Example: `cherize-van-stade.svg` → `cherize-van-stade.jpg`

### Step 3: Update Code (if needed)
If you changed file extensions from `.svg` to something else:

1. Open `components/wedding-party-section.tsx`
2. Find the `bridalParty` and `groomsParty` arrays
3. Update the file extensions in the `image` paths

Example:
```typescript
// Change this:
{ name: "Cherize Van Stade", role: "Maid of Honor", image: "/assets/wedding-party/cherize-van-stade.svg" }

// To this:
{ name: "Cherize Van Stade", role: "Maid of Honor", image: "/assets/wedding-party/cherize-van-stade.jpg" }
```

## Other Images to Consider Replacing

### Hero/Main Images
Located in `public/`:
- `romantic-couple-portrait-outdoor-garden-setting.jpg` - Main couple photo
- `couple-walking-together-outdoors-in-nature-romanti.jpg` - Secondary couple photo
- `elegant-historic-southern-house-with-columns.jpg` - Venue photo (update to Kwalata)

### Placeholder Images
- `placeholder.jpg` - Generic placeholder
- `placeholder-user.jpg` - User avatar placeholder
- `placeholder-logo.png` - Logo placeholder
- `placeholder-logo.svg` - Logo SVG placeholder

## Image Specifications

### Wedding Party Photos
- **Size**: 400x400px minimum (square)
- **Format**: JPG (recommended), PNG, or WebP
- **File Size**: Under 500KB each
- **Display**: Shown in circular frames

### Hero/Couple Photos
- **Size**: 1200x800px minimum
- **Format**: JPG or WebP
- **File Size**: Under 1MB each
- **Display**: Full-width sections

### Venue Photos
- **Size**: 1920x1080px recommended
- **Format**: JPG or WebP
- **File Size**: Under 1.5MB
- **Display**: Featured sections

## Free Image Optimization Tools

- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim**: https://imageoptim.com/ (Mac only)
- **JPEG Optimizer**: https://jpeg-optimizer.com/

## Testing After Replacement

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000

3. Scroll to the "Wedding Party" section

4. Verify all images load correctly

5. Check that images look good in circular frames

## Need Help?

If images aren't showing:
1. Check file names match exactly (case-sensitive)
2. Verify files are in `public/assets/wedding-party/`
3. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors (F12)

## Pro Tips

✅ Use consistent photo style (same background, lighting)
✅ Ensure faces are centered and clearly visible
✅ Professional headshots work best
✅ Keep file sizes small for faster loading
✅ Test on mobile devices after replacing

---

**Location**: `public/assets/wedding-party/`  
**Total Images**: 7 wedding party members  
**Format**: Currently SVG placeholders → Replace with JPG/PNG/WebP

