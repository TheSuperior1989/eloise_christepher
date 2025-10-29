# Eloise & Christepher's Wedding Website 💍

A beautiful, modern wedding website built with Next.js 16, featuring elegant typography, smooth animations, and a responsive design.

## 🎉 Event Details

**Date**: June 21, 2025  
**Location**: Charleston, South Carolina

## ✨ Features

- 🎨 **Elegant Design**: Beautiful typography with Playfair Display and Crimson Text fonts
- 📱 **Fully Responsive**: Optimized for all devices and screen sizes
- ⚡ **Performance Optimized**: Built with Next.js 16 and Turbopack for blazing-fast performance
- 🖼️ **Image Optimization**: Automatic AVIF/WebP conversion and responsive images
- 🔍 **SEO Ready**: Complete metadata, Open Graph tags, and sitemap
- 📊 **Analytics**: Integrated Vercel Analytics for visitor tracking
- ♿ **Accessible**: Built with accessibility best practices using Radix UI primitives
- 🎭 **Smooth Animations**: Elegant transitions and animations throughout

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Sections

1. **Hero** - Welcome section with couple's names and wedding date
2. **Our Story** - Timeline of the couple's journey together
3. **Photos** - Gallery of memorable moments
4. **Schedule** - Wedding day timeline and events
5. **Wedding Party** - Meet the bridesmaids and groomsmen
6. **Registry** - Gift registry information
7. **Q&A** - Frequently asked questions
8. **Location** - Venue details and directions

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eloise_and_christepher
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your configuration.

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📦 Project Structure

```
eloise_and_christepher/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── our-story.tsx     # Story timeline
│   ├── photo-section.tsx # Photo gallery
│   └── ...               # Other sections
├── lib/                   # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── eslint.config.mjs     # ESLint configuration
```

## 🎨 Customization

### Updating Content

1. **Wedding Details**: Edit `app/page.tsx` and individual component files
2. **Colors**: Modify CSS variables in `app/globals.css`
3. **Fonts**: Update font imports in `app/layout.tsx`
4. **Images**: Replace images in the `public/` folder

### Adding New Sections

1. Create a new component in `components/`
2. Import and add to `app/page.tsx`
3. Update navigation in `components/navigation.tsx`

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

This site is built with accessibility in mind:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast

## 📄 License

This project is private and intended for personal use.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Support

For questions or issues, please contact the site administrator.

---

Made with ❤️ for Eloise & Christepher's special day

