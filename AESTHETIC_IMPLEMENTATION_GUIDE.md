# 🌸 Wedding Website Aesthetic Implementation Guide

## Quick Start

Your wedding website now has a beautiful peachy/coral aesthetic with watercolor textures and floral decorations! Here's everything you need to know.

## 🎨 Color Palette Reference

### How to Use Colors in Your Code

Instead of hardcoded hex colors, use CSS variables for consistency:

```tsx
// ❌ Old way (hardcoded)
<div className="text-[#3D3630]">

// ✅ New way (CSS variables)
<div className="text-foreground">
```

### Available Color Classes

| Purpose | Tailwind Class | CSS Variable | Color |
|---------|---------------|--------------|-------|
| Main text | `text-foreground` | `--foreground` | Warm dark brown |
| Background | `bg-background` | `--background` | Warm cream |
| Muted text | `text-muted-foreground` | `--muted-foreground` | Medium brown |
| Accent/highlights | `text-accent` or `bg-accent` | `--accent` | Warm peachy |
| Primary buttons | `bg-primary` | `--primary` | Soft terracotta |
| Secondary elements | `bg-secondary` | `--secondary` | Peachy beige |
| Borders | `border-border` | `--border` | Soft peachy border |

### Custom Wedding Colors

You can also use these custom colors directly:

```css
/* In your CSS */
background: var(--wedding-peach);    /* #E8B4A0 */
background: var(--wedding-coral);    /* #D4A89A */
background: var(--wedding-cream);    /* #F5EDE6 */
background: var(--wedding-beige);    /* #F0E8E0 */
background: var(--wedding-sage);     /* Sage green */
background: var(--wedding-olive);    /* Olive green */
```

## 🌺 Using the WeddingBackground Component

### Basic Usage

```tsx
import { WeddingBackground } from "@/components/wedding-background"

<WeddingBackground>
  <YourContent />
</WeddingBackground>
```

### With Floral Corners

Perfect for hero sections or important content:

```tsx
<WeddingBackground variant="gradient" showFloralCorners={true}>
  <Hero />
</WeddingBackground>
```

### Background Variants

Choose from 4 different background styles:

```tsx
// 1. Default - Standard background color
<WeddingBackground variant="default">
  <Content />
</WeddingBackground>

// 2. Peach - Peachy gradient background
<WeddingBackground variant="peach">
  <Content />
</WeddingBackground>

// 3. Cream - Soft cream background
<WeddingBackground variant="cream">
  <Content />
</WeddingBackground>

// 4. Gradient - Wedding gradient background
<WeddingBackground variant="gradient">
  <Content />
</WeddingBackground>
```

### Controlling Texture Intensity

Adjust the watercolor texture opacity (0 to 1):

```tsx
// Light texture (40%)
<WeddingBackground textureOpacity={0.4}>
  <Content />
</WeddingBackground>

// Medium texture (60%) - Default
<WeddingBackground textureOpacity={0.6}>
  <Content />
</WeddingBackground>

// Strong texture (100%)
<WeddingBackground textureOpacity={1}>
  <Content />
</WeddingBackground>
```

### Complete Example

```tsx
<WeddingBackground 
  variant="peach" 
  showFloralCorners={true}
  textureOpacity={0.5}
  className="min-h-screen"
>
  <YourContent />
</WeddingBackground>
```

## 🌸 Using the FloralDivider Component

### Basic Usage

Add beautiful floral dividers between sections:

```tsx
import { FloralDivider } from "@/components/wedding-background"

<Section1 />
<FloralDivider />
<Section2 />
```

### With Custom Spacing

```tsx
<FloralDivider className="my-16" />  // More spacing
<FloralDivider className="my-8" />   // Less spacing
```

## 💧 Using the WatercolorSection Component

For adding watercolor textures to specific areas without full background control:

```tsx
import { WatercolorSection } from "@/components/wedding-background"

// Light intensity
<WatercolorSection intensity="light">
  <Content />
</WatercolorSection>

// Medium intensity (default)
<WatercolorSection intensity="medium">
  <Content />
</WatercolorSection>

// Strong intensity
<WatercolorSection intensity="strong">
  <Content />
</WatercolorSection>
```

## 🎯 Recommended Section Patterns

### Hero Section
```tsx
<WeddingBackground variant="gradient" showFloralCorners={true}>
  <Hero />
</WeddingBackground>
```

### Story/Content Section
```tsx
<WeddingBackground variant="cream" textureOpacity={0.6}>
  <OurStory />
</WeddingBackground>
```

### Photo Gallery
```tsx
<WeddingBackground variant="default" textureOpacity={0.4}>
  <PhotoSection />
</WeddingBackground>
```

### Important Information (Schedule, Location)
```tsx
<WeddingBackground variant="peach" textureOpacity={0.5}>
  <Schedule />
</WeddingBackground>
```

### Footer/Contact Section
```tsx
<WeddingBackground variant="peach" showFloralCorners={true} textureOpacity={0.6}>
  <LocationSection />
</WeddingBackground>
```

## 🎨 Typography Best Practices

### Headings

```tsx
// Main page title
<h1 
  className="font-serif text-6xl sm:text-7xl md:text-8xl text-foreground"
  style={{ fontFamily: "Playfair Display, serif" }}
>
  Your Title
</h1>

// Section heading
<h2 
  className="font-serif text-4xl sm:text-5xl text-foreground text-center mb-4"
  style={{ fontFamily: "Playfair Display, serif" }}
>
  Section Title
</h2>

// Add decorative divider under headings
<div className="w-24 h-px bg-accent mx-auto mb-12" />
```

### Body Text

```tsx
// Regular paragraph
<p className="text-lg text-muted-foreground font-serif">
  Your content here
</p>

// Emphasized text
<p className="text-xl text-foreground font-serif italic">
  Important message
</p>
```

## 🖼️ Image Styling

### Photos with Soft Borders

```tsx
<div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg border-8 border-white/50">
  <Image
    src="/your-image.jpg"
    alt="Description"
    fill
    className="object-cover"
  />
</div>
```

### Map or Embedded Content

```tsx
<div className="w-full h-[400px] bg-secondary rounded-lg overflow-hidden shadow-lg border-4 border-white/30">
  {/* Your content */}
</div>
```

## 🎭 Interactive Elements

### Buttons

```tsx
// Primary button
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-serif">
  Click Me
</button>

// Secondary button
<button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors font-serif">
  Learn More
</button>
```

### Cards

```tsx
<div className="bg-card rounded-lg shadow-sm border border-border p-6">
  <h3 className="text-foreground font-serif text-xl mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>
```

### Accordion/Expandable Items

```tsx
<div className="bg-card rounded-lg shadow-sm overflow-hidden border border-border">
  <button className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors">
    <span className="font-serif text-lg text-foreground">Question</span>
    <ChevronDown className="text-accent" />
  </button>
  <div className="px-6 pb-4 text-muted-foreground">
    Answer content
  </div>
</div>
```

## 📐 Layout Patterns

### Full Page Layout

```tsx
<main className="min-h-screen bg-background">
  <Navigation />
  
  <WeddingBackground variant="gradient" showFloralCorners={true}>
    <Hero />
  </WeddingBackground>

  <FloralDivider />

  <WeddingBackground variant="cream" textureOpacity={0.6}>
    <Section1 />
  </WeddingBackground>

  <FloralDivider />

  <WeddingBackground variant="peach" textureOpacity={0.5}>
    <Section2 />
  </WeddingBackground>
</main>
```

### Section with Max Width Container

```tsx
<WeddingBackground variant="cream">
  <section className="py-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
      {/* Your content */}
    </div>
  </section>
</WeddingBackground>
```

## 🎨 Custom Styling Tips

### Adding Watercolor Effect to Custom Elements

```tsx
<div className="watercolor-texture">
  {/* Your content will have watercolor overlay */}
</div>
```

### Using Gradient Backgrounds

```tsx
<div className="bg-wedding-gradient">
  {/* Soft gradient background */}
</div>

<div className="bg-wedding-peach-gradient">
  {/* Peachy gradient background */}
</div>
```

## 🔧 Troubleshooting

### Colors Not Showing?
Make sure you're using the CSS variable classes (`text-foreground`, `bg-accent`, etc.) instead of hardcoded colors.

### Floral Corners Not Visible?
Check that `showFloralCorners={true}` is set and the section has enough height.

### Texture Too Strong/Weak?
Adjust the `textureOpacity` prop (0.0 to 1.0).

### Divider Not Centered?
FloralDivider automatically centers - make sure parent container allows it.

## 📱 Responsive Considerations

All components are fully responsive:
- Floral corners scale: 48px (mobile) → 64px (tablet) → 80px (desktop)
- Text sizes use responsive classes: `text-4xl sm:text-5xl md:text-6xl`
- Spacing uses responsive utilities: `py-16 md:py-20 lg:py-24`

## ✨ Pro Tips

1. **Alternate backgrounds** - Use different variants for adjacent sections for visual interest
2. **Vary texture opacity** - Lighter for text-heavy sections, stronger for visual sections
3. **Use floral corners sparingly** - Reserve for hero and footer sections
4. **Add dividers between major sections** - Creates natural breaks
5. **Maintain consistent spacing** - Use `py-20` for most sections
6. **Use the color system** - Stick to CSS variables for easy theme updates

## 🎉 You're All Set!

Your wedding website now has a beautiful, cohesive aesthetic. Enjoy customizing it to make it uniquely yours!

