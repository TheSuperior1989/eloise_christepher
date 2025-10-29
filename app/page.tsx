import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { OurStory } from "@/components/our-story"
import { PhotoSection } from "@/components/photo-section"
import { ScheduleSection } from "@/components/schedule-section"
import { WeddingPartySection } from "@/components/wedding-party-section"
import { RegistrySection } from "@/components/registry-section"
import { QASection } from "@/components/qa-section"
import { LocationSection } from "@/components/location-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />
      <Hero />
      <OurStory />
      <PhotoSection />
      <ScheduleSection />
      <WeddingPartySection />
      <RegistrySection />
      <QASection />
      <LocationSection />
    </main>
  )
}
