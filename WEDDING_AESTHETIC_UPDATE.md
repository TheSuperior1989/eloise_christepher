# 🌸 Wedding Website Aesthetic Update

## Overview
This document details the complete aesthetic overhaul of the wedding website to match a soft, romantic peachy/coral color palette with watercolor textures and floral decorations inspired by the reference design.

## 🎨 Color Palette

### Primary Colors
- **Wedding Peach**: `oklch(0.78 0.09 30)` - #E8B4A0
- **Wedding Coral**: `oklch(0.72 0.08 35)` - #D4A89A
- **Wedding Cream**: `oklch(0.97 0.015 45)` - #F5EDE6
- **Wedding Beige**: `oklch(0.90 0.03 45)` - #F0E8E0
- **Wedding Sage**: `oklch(0.65 0.08 120)` - Sage green
- **Wedding Olive**: `oklch(0.60 0.07 130)` - Olive green

### Updated CSS Variables
All color variables in `app/globals.css` have been updated to use the new peachy/coral palette:
- Background colors use warm cream tones
- Primary colors use soft terracotta/coral
- Secondary colors use peachy beige
- Accent colors use warm peachy tones
- Borders and inputs use soft peachy borders

## 🌺 New Assets Created

### Floral SVG Decorations
1. **floral-corner-top-left.svg** - Watercolor-style corner decoration with roses, eucalyptus, and pampas grass
2. **floral-corner-top-right.svg** - Mirrored version for top right corner
3. **floral-corner-bottom-left.svg** - Bottom left corner decoration
4. **floral-corner-bottom-right.svg** - Bottom right corner decoration
5. **floral-divider.svg** - Horizontal floral divider for section breaks

### Watercolor Textures
1. **watercolor-texture-1.svg** - Peachy tones watercolor overlay
2. **watercolor-texture-2.svg** - Beige/cream tones watercolor overlay

All assets are located in `/public/assets/`

## 🧩 New Components

### WeddingBackground Component
**Location**: `components/wedding-background.tsx`

A versatile background wrapper component with the following features:
- **Variants**: 
  - `default` - Standard background color
  - `peach` - Peachy gradient background
  - `cream` - Soft cream background
  - `gradient` - Wedding gradient background
- **Props**:
  - `showFloralCorners` - Displays floral decorations in all four corners
  - `showDivider` - Shows floral divider at bottom
  - `textureOpacity` - Controls watercolor texture intensity (0-1)
  - `className` - Additional CSS classes

### FloralDivider Component
Standalone component for section dividers with floral decoration.

### WatercolorSection Component
Wrapper component for adding watercolor texture overlays with intensity control:
- `light` - 30% opacity
- `medium` - 60% opacity (default)
- `strong` - 100% opacity

## 📝 Updated Files

### 1. app/globals.css
- Updated all CSS color variables to peachy/coral palette
- Added custom wedding theme color variables
- Added utility classes for watercolor textures
- Added gradient background classes
- Added floral divider styles

### 2. app/page.tsx
- Wrapped all sections with `WeddingBackground` component
- Added `FloralDivider` between sections
- Applied different background variants to each section for visual variety
- Hero and Location sections have floral corners
- Alternating texture opacities for depth

### 3. components/hero.tsx
- Updated to use new color scheme (foreground, muted-foreground, accent)
- Added "are getting married" subtitle with italic styling
- Added decorative divider line
- Increased vertical spacing and made it more prominent
- Added min-height for better visual impact

### 4. components/our-story.tsx
- Updated color scheme to use CSS variables
- Added soft border and shadow to photo
- Added decorative divider under heading
- Updated text colors to use muted-foreground

### 5. components/schedule-section.tsx
- Removed hardcoded background color
- Updated all color references to use CSS variables
- Updated timeline colors to use accent color
- Updated badge backgrounds to use secondary color

### 6. components/location-section.tsx
- Added decorative divider under heading
- Updated map container with rounded corners and border
- Updated all text colors to use CSS variables
- Improved visual hierarchy

### 7. components/registry-section.tsx
- Removed hardcoded background
- Updated icon and divider colors to use accent
- Updated text colors to use CSS variables

### 8. components/qa-section.tsx
- Removed hardcoded background
- Updated accordion cards to use card background
- Added border to cards
- Updated hover states to use secondary color
- Updated all text colors to use CSS variables

## 🎯 Design Features

### Watercolor Aesthetic
- Subtle watercolor texture overlays on all sections
- Varying opacity levels for visual interest
- Soft, organic blob shapes in peachy and cream tones

### Floral Elements
- Corner decorations featuring:
  - Watercolor-style roses in peachy/coral tones
  - Eucalyptus leaves in sage green
  - Pampas grass plumes in cream
  - Small accent buds and flowers
- Horizontal dividers with centered floral clusters

### Typography
- Maintained Playfair Display for headings
- Maintained Crimson Text for body text
- Added decorative divider lines under major headings
- Improved spacing and hierarchy

### Color Application
- **Hero Section**: Gradient background with floral corners
- **Our Story**: Cream background with medium texture
- **Photo Section**: Default background with light texture
- **Schedule**: Peach gradient with medium texture
- **Wedding Party**: Cream background with medium texture
- **Registry**: Gradient background with medium texture
- **Q&A**: Default background with light texture
- **Location**: Peach background with floral corners and medium texture

## 🚀 Usage Examples

### Using WeddingBackground
```tsx
// With floral corners
<WeddingBackground variant="gradient" showFloralCorners={true}>
  <YourContent />
</WeddingBackground>

// With custom texture opacity
<WeddingBackground variant="peach" textureOpacity={0.5}>
  <YourContent />
</WeddingBackground>

// With bottom divider
<WeddingBackground variant="cream" showDivider={true}>
  <YourContent />
</WeddingBackground>
```

### Using FloralDivider
```tsx
<FloralDivider />
// or with custom className
<FloralDivider className="my-16" />
```

### Using WatercolorSection
```tsx
<WatercolorSection intensity="medium">
  <YourContent />
</WatercolorSection>
```

## 🎨 Custom CSS Utilities

### Watercolor Texture
```css
.watercolor-texture {
  /* Adds watercolor overlay with pseudo-element */
}
```

### Gradient Backgrounds
```css
.bg-wedding-gradient {
  /* Soft gradient from cream to peachy beige */
}

.bg-wedding-peach-gradient {
  /* Gradient from white to peachy beige */
}
```

### Floral Divider
```css
.floral-divider {
  /* Adds decorative line divider */
}
```

## 📱 Responsive Design
- Floral corners scale from 48px (mobile) to 80px (desktop)
- Floral dividers maintain aspect ratio across all screen sizes
- Watercolor textures are optimized for different viewport sizes
- All components are fully responsive

## ✨ Performance Considerations
- SVG assets are lightweight and scalable
- Watercolor textures use mix-blend-multiply for better performance
- Images use Next.js Image component for optimization
- Lazy loading applied to non-critical decorative elements

## 🔄 Future Enhancements
- Consider adding animated floral elements on scroll
- Add seasonal color variations
- Create additional floral decoration variants
- Add parallax effects to watercolor textures

## 📋 Checklist
- [x] Update color scheme in globals.css
- [x] Create floral SVG decorations
- [x] Create watercolor texture backgrounds
- [x] Build reusable background components
- [x] Update all page sections with new aesthetic
- [x] Test responsive design
- [x] Verify no TypeScript errors
- [x] Document all changes

## 🎉 Result
The website now features a cohesive, romantic aesthetic with:
- Soft peachy/coral color palette
- Watercolor texture overlays
- Beautiful floral decorations
- Elegant typography and spacing
- Consistent design language across all sections

