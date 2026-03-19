"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const ALBUMS = [
  {
    id: "slideshow",
    label: "Our Photos",
    images: [
      "/assets/SlideShow/IMG_2696.jpg",
      "/assets/SlideShow/WhatsApp Image 2025-10-27 at 4.02.17 PM (1).jpg",
      "/assets/SlideShow/WhatsApp Image 2025-10-27 at 4.02.17 PM.jpg",
      "/assets/SlideShow/WhatsApp Image 2025-10-27 at 4.04.14 PM.jpg",
      "/assets/SlideShow/WhatsApp Image 2025-10-27 at 4.04.47 PM.jpg",
      "/assets/SlideShow/_MG_0260.jpg",
      "/assets/SlideShow/_MG_0263.jpg",
      "/assets/SlideShow/_MG_0267.jpg",
      "/assets/SlideShow/_MG_0269.jpg",
      "/assets/SlideShow/_MG_0275.jpg",
      "/assets/SlideShow/_MG_0297.jpg",
      "/assets/SlideShow/_MG_0298.jpg",
      "/assets/SlideShow/_MG_0299.jpg",
      "/assets/SlideShow/_MG_0329.jpg",
      "/assets/SlideShow/_MG_0331.jpg",
      "/assets/SlideShow/_MG_0342.jpg",
      "/assets/SlideShow/_MG_0352.jpg",
      "/assets/SlideShow/_MG_0359.jpg",
      "/assets/SlideShow/_MG_0367.jpg",
    ],
  },
  {
    id: "engagement",
    label: "Engagement Shoot",
    images: [
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2985.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2991.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2992.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2993.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2996.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_2998.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3001.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3005.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3006.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3013.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3016.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3020.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3023.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3026.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3027.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3031.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3038.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3040.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3041.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3043.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3046.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3054.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3058.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3060.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3066.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3067.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3068.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3073.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3075.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3080.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3085.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3086.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3090.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3091.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3093.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3094.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3095.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3098.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3105.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3106.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3113.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3122.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3127.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3142.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3148.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3153.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3157.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3162.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3165.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3172.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3180.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3181.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3184.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3185.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3189.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3199.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3203.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3204.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3212.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3219.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3223.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3225.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3231.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3234.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3235.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3240.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3250.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3253.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3257.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3264.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3272.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3280.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3286.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3306.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3314.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3315.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3337.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3342.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3343.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3345.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3349.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3353.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3368.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3369.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3373.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3374.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3377.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3378.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3379.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3384.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3385.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3386.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3390.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3391.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3392.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3397.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3399.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3404.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3406.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3412.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3414.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3415.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3418.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3420.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3426.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3428.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3434.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3440.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3452.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3464.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3466.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3487.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3500.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3502.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3507.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3512.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3518.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3523.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3524.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3528.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3530.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3531.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3536.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3537.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3539.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3540.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3551.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3554.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3556.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3560.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3561.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3572.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3574.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3575.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3576.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3583.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3585.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3586.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3589.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3601.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3616.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3617.jpg",
      "/assets/EngagementShoot/Final_Edits_-_Color/IMG_3618.jpg",
    ],
  },
  {
    id: "newshoot",
    label: "New Shoot",
    images: [
      "/assets/NewShoot/E&C version2.0/IMG_1728.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1732.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1733.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1735.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1736.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1745.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1746.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1757.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1759.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1761.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1768.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1789.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1790.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1793.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1798.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1800.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1803.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1804.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1805.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1806.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1807.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1808.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1819.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1820.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1823.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1824.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1829.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1831.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1832.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1842.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1846.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1847.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1848.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1849.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1852.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1854.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1855.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1858.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1859.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1860.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1862.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1863.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1864.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1865.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1866.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1867.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1868.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1879.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1880.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1881.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1882.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1887.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1890.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1891.JPG",
      "/assets/NewShoot/E&C version2.0/IMG_1892.JPG",
    ],
  },
]

export function ImageSlideshow() {
  const [mounted, setMounted] = useState(false)
  const [activeAlbum, setActiveAlbum] = useState(0)
  const [api, setApi] = useState<CarouselApi>()
  const autoplayRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [lightbox, setLightbox] = useState<{ src: string; index: number } | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [lightbox])

  // Reset carousel when album changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0)
    }
  }, [activeAlbum, api])

  // Auto-advance carousel
  useEffect(() => {
    if (!api) return

    const stopAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }

    autoplayRef.current = setInterval(() => {
      api.scrollNext()
    }, 4000)

    api.on("pointerDown", stopAutoplay)

    return () => {
      stopAutoplay()
    }
  }, [api, activeAlbum])

  const currentImages = ALBUMS[activeAlbum].images

  const openLightbox = useCallback((src: string, index: number) => {
    setLightbox({ src, index })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  const lightboxPrev = useCallback(() => {
    if (!lightbox) return
    const prev = (lightbox.index - 1 + currentImages.length) % currentImages.length
    setLightbox({ src: currentImages[prev], index: prev })
  }, [lightbox, currentImages])

  const lightboxNext = useCallback(() => {
    if (!lightbox) return
    const next = (lightbox.index + 1) % currentImages.length
    setLightbox({ src: currentImages[next], index: next })
  }, [lightbox, currentImages])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") lightboxPrev()
      if (e.key === "ArrowRight") lightboxNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightbox, closeLightbox, lightboxPrev, lightboxNext])

  if (!mounted) return null

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-serif text-4xl md:text-5xl text-foreground text-center mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Gallery
        </h2>
        <div className="w-24 h-px bg-accent mx-auto mb-10" />

        {/* Album tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {ALBUMS.map((album, i) => (
            <button
              key={album.id}
              onClick={() => setActiveAlbum(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeAlbum === i
                  ? "bg-[#C4A57B] text-white border-[#C4A57B] shadow-md"
                  : "bg-white text-[#7A6F5D] border-[#C4A57B]/40 hover:border-[#C4A57B] hover:text-[#C4A57B]"
              }`}
            >
              {album.label}
              <span className="ml-2 opacity-70 text-xs">({album.images.length})</span>
            </button>
          ))}
        </div>

        <Carousel
          key={activeAlbum}
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {currentImages.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg border-4 border-white/50 cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <Image
                    src={image}
                    alt={`${ALBUMS[activeAlbum].label} photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-[#C4A57B] text-white hover:bg-[#B39568] border-none" />
          <CarouselNext className="hidden md:flex -right-12 bg-[#C4A57B] text-white hover:bg-[#B39568] border-none" />
        </Carousel>

        <p className="text-center text-[#7A6F5D] font-serif mt-8 text-sm">
          Swipe or use arrows to view more photos • Click any photo to enlarge
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[110] w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl hover:bg-[#FAF8F5] transition-colors"
            aria-label="Close photo"
          >
            <X className="h-6 w-6 text-[#3D3630]" strokeWidth={2.5} />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
            className="fixed left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:bg-white transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6 text-[#3D3630]" strokeWidth={2.5} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:bg-white transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6 text-[#3D3630]" strokeWidth={2.5} />
          </button>

          {/* Image */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt="Enlarged photo"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Counter */}
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[110] bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
            {lightbox.index + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
