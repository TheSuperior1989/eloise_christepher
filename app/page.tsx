import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { PhotoSection } from "@/components/photo-section"
import { ImageSlideshow } from "@/components/image-slideshow"
import { ScheduleSection } from "@/components/schedule-section"
import { WeddingPartySection } from "@/components/wedding-party-section"
import { RegistrySection } from "@/components/registry-section"
import { QASection } from "@/components/qa-section"
import { LocationSection } from "@/components/location-section"
import { WeddingBackground } from "@/components/wedding-background"
import { CountdownTimer } from "@/components/countdown-timer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Hero with floral corners - bottom-left and top-right only */}
      <WeddingBackground
        variant="gradient"
        showFloralCorners={{ bottomLeft: true, topRight: true }}
      >
        <Hero />
      </WeddingBackground>

      {/* Our Story with watercolor texture - bottom-left and bottom-right */}
      <WeddingBackground
        variant="cream"
        textureOpacity={0.6}
        showFloralCorners={{ bottomLeft: true, bottomRight: true }}
      >
        <OurStory />
      </WeddingBackground>

      {/* Photo Section */}
      <WeddingBackground variant="default" textureOpacity={0.4}>
        <PhotoSection />
      </WeddingBackground>

      {/* Image Slideshow Gallery */}
      <WeddingBackground variant="cream" textureOpacity={0.5}>
        <ImageSlideshow />
      </WeddingBackground>

      {/* Schedule with peach gradient */}
      <WeddingBackground variant="peach" textureOpacity={0.5}>
        <ScheduleSection />
      </WeddingBackground>

      {/* Wedding Party */}
      <WeddingBackground variant="cream" textureOpacity={0.6}>
        <WeddingPartySection />
      </WeddingBackground>

      {/* Registry */}
      <WeddingBackground variant="gradient" textureOpacity={0.5}>
        <RegistrySection />
      </WeddingBackground>

      {/* Q&A */}
      <WeddingBackground variant="default" textureOpacity={0.4}>
        <QASection />
      </WeddingBackground>

      {/* Location with floral corners */}
      <WeddingBackground variant="peach" showFloralCorners={true} textureOpacity={0.6}>
        <LocationSection />
      </WeddingBackground>
    </main>
  )
}
