import { Gift } from "lucide-react"

export function RegistrySection() {
  return (
    <section id="registry" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Gift size={48} className="text-[#C4A57B]" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[#3D3630] mb-4">Registry</h2>
        <div className="w-24 h-px bg-[#C4A57B] mx-auto mb-8" />
        <p className="text-lg text-[#5C5347] leading-relaxed font-serif">
          Your presence is enough of a present to us! But for those of you who are stubborn, we've put together a
          wish-list to help you out.
        </p>
      </div>
    </section>
  )
}
