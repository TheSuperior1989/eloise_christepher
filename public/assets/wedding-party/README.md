# Wedding Party Images

This folder contains placeholder images for the wedding party members. Replace these SVG files with actual photos.

## Image Requirements

- **Format**: JPG, PNG, or WebP (recommended for best quality and performance)
- **Size**: Minimum 400x400 pixels (square format works best)
- **Aspect Ratio**: 1:1 (square) is ideal for circular display
- **File Size**: Keep under 500KB per image for optimal loading

## Files to Replace

### Bridal Party
1. `cherize-van-stade.svg` → Replace with Cherize Van Stade's photo
2. `anieke-kelly.svg` → Replace with Anieke Kelly's photo
3. `bianca.svg` → Replace with Bianca's photo

### Groom's Party
4. `brian-le-roux.svg` → Replace with Brian Le Roux's photo
5. `jeandre-du-plessis.svg` → Replace with Jeandre Du Plessis's photo
6. `pieter-myburge.svg` → Replace with Pieter Myburge's photo
7. `andre-bisset.svg` → Replace with Andre Bisset's photo

## How to Replace

1. **Prepare your images**:
   - Crop to square format (1:1 aspect ratio)
   - Resize to at least 400x400 pixels
   - Optimize for web (use tools like TinyPNG or ImageOptim)

2. **Replace the files**:
   - Keep the same filename (just change the extension)
   - For example: `cherize-van-stade.svg` → `cherize-van-stade.jpg`

3. **Update the component** (if changing file extensions):
   - Open `components/wedding-party-section.tsx`
   - Update the `image` paths to match your new file extensions
   - Example: Change `.svg` to `.jpg` or `.png`

## Tips

- Use high-quality photos with good lighting
- Ensure faces are clearly visible
- Consider using professional headshots if available
- All images should have a similar style/background for consistency
- The images will be displayed in circular frames on the website

## Image Optimization

After adding your images, you can optimize them using:

```bash
# Using ImageOptim (Mac)
# Drag and drop images into ImageOptim

# Using TinyPNG (Web)
# Visit https://tinypng.com/ and upload images

# Using Next.js Image Optimization
# Next.js will automatically optimize images when deployed
```

## Current Placeholders

The current SVG placeholders show:
- Simple avatar silhouettes
- Person's name and role
- Color-coded (gold for bridal party, brown for groom's party)

These are temporary and should be replaced with actual photos before going live.

