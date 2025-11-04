import { Gift } from "lucide-react"

export function RegistrySection() {
  return (
    <section id="registry" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Gift size={48} className="text-accent" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Registry</h2>
        <div className="w-24 h-px bg-accent mx-auto mb-8" />
        <p className="text-lg text-muted-foreground leading-relaxed font-serif">
          Your presence is enough of a present to us! But for those of you who are stubborn, we've put together a
          wish-list to help you out.
        </p>
      </div>
    </section>
  )
}
