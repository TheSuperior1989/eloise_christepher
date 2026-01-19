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
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ImageSlideshow() {
  const [mounted, setMounted] = useState(false)
  const [api, setApi] = useState<CarouselApi>()
  const autoplayRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [lightboxImage])

  // Auto-advance carousel
  useEffect(() => {
    if (!api) return

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        api.scrollNext()
      }, 4000)
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }

    startAutoplay()

    // Stop autoplay on user interaction
    api.on("pointerDown", stopAutoplay)

    return () => {
      stopAutoplay()
    }
  }, [api])

  // All images from the SlideShow directory
  const images = [
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
  ]

  if (!mounted) {
    return null
  }

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-serif text-4xl md:text-5xl text-foreground text-center mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Our Gallery
        </h2>
        <div className="w-24 h-px bg-accent mx-auto mb-12" />

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg border-4 border-white/50 cursor-pointer"
                  onClick={() => setLightboxImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Wedding photo ${index + 1}`}
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
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button - Top Right */}
          <Button
            variant="outline"
            size="lg"
            className="absolute top-4 right-4 bg-white text-[#3D3630] hover:bg-[#FAF8F5] hover:text-[#C4A57B] border-2 border-[#C4A57B] z-10 gap-2 font-medium shadow-lg"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-5 w-5" />
            Close
          </Button>

          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Enlarged wedding photo"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  )
}

