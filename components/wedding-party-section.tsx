import Image from "next/image"

export function WeddingPartySection() {
  const bridalParty = [
    { name: "Cherize Van Stade", role: "Maid of Honor", image: "/assets/wedding-party/cherize-van-stade.jpeg" },
    { name: "Anieke Kelly", role: "Bridesmaid", image: "/assets/wedding-party/anieke-kelly.jpeg" },
    { name: "Bianca", role: "Bridesmaid", image: "/assets/wedding-party/bianca.jpeg" },
  ]

  const groomsParty = [
    { name: "Brian Le Roux", role: "Best Man", image: "/assets/wedding-party/brian-le-roux.jpeg" },
    { name: "Jeandré Du Plessis", role: "Best Man", image: "/assets/wedding-party/jeandre-du-plessis.jpeg" },
    { name: "Pieter Myburge", role: "Groomsman", image: "/assets/wedding-party/pieter-myburge.jpeg" },
    { name: "André Bisset", role: "Groomsman", image: "/assets/wedding-party/andre-bisset.jpeg" },
  ]

  return (
    <section id="party" className="py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-[#3D3630] text-center mb-4">Wedding Party</h2>
        <div className="w-24 h-px bg-[#C4A57B] mx-auto mb-8" />

        {/* Placeholder for description text */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-[#7A6F5D] font-serif leading-relaxed italic">
            [Description text to be added - space reserved for bridal party introduction]
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Bridal Party */}
          <div>
            <h3 className="font-serif text-2xl text-[#3D3630] text-center mb-8">Bridal Party</h3>
            <div className="space-y-6">
              {bridalParty.map((person, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl text-[#3D3630] mb-1">{person.name}</h4>
                  <p className="text-[#7A6F5D] text-sm font-serif italic">{person.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Groom's Party */}
          <div>
            <h3 className="font-serif text-2xl text-[#3D3630] text-center mb-8">Groom's Party</h3>
            <div className="space-y-6">
              {groomsParty.map((person, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                  <div className="mb-4 flex justify-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="font-serif text-xl text-[#3D3630] mb-1">{person.name}</h4>
                  <p className="text-[#7A6F5D] text-sm font-serif italic">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
