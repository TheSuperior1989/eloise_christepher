import Image from "next/image"

export function WeddingPartySection() {
  const bridalParty = [
    {
      name: "Cherise",
      role: "Maid of Honor",
      image: "/assets/wedding-party/cherize-van-stade.jpeg",
      description: "The human version of 'we'll figure it out.' She didn't just witness our love story; she helped build it, laughed through it, and stood by us every step of the way."
    },
    {
      name: "Annieke",
      role: "Bridesmaid",
      image: "/assets/wedding-party/anieke-kelly.jpeg",
      description: "The friend who can turn a stressful moment into a full-on dance party and the reason Instagram notifications is permanently muted."
    },
    {
      name: "Bianca",
      role: "Bridesmaid",
      image: "/assets/wedding-party/bianca.jpeg",
      description: "The friend who knows all the tea, all our secrets, and still shows up with love, loyalty, and zero judgement. We wouldn't have it any other way."
    },
  ]

  const groomsParty = [
    {
      name: "Brian",
      role: "Best Man",
      image: "/assets/wedding-party/brian-le-roux.jpeg",
      description: "Meet Brian the protector, strength, and constant. He's guided us through life with love and support, and having him by our side means more than words can say."
    },
    {
      name: "Jannie",
      role: "Best Man",
      image: "/assets/wedding-party/jeandre-du-plessis.jpeg",
      description: "If loyalty, a snack addiction, and completely unmatched vibes had a child, it would be this person."
    },
    {
      name: "Piet",
      role: "Groomsman",
      image: "/assets/wedding-party/pieter-myburge.jpeg",
      description: "The human version of confetti: fun, loud, and absolutely impossible to ignore."
    },
    {
      name: "André",
      role: "Groomsman",
      image: "/assets/wedding-party/andre-bisset.jpeg",
      description: "Someone who knows all our secrets and still chooses to love us anyway. We couldn't imagine saying 'I do' without him by our side."
    },
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
                  <p className="text-[#7A6F5D] text-sm font-serif italic mb-3">{person.role}</p>
                  <p className="text-[#6B6560] text-sm font-serif leading-relaxed">{person.description}</p>
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
                  <p className="text-[#7A6F5D] text-sm font-serif italic mb-3">{person.role}</p>
                  <p className="text-[#6B6560] text-sm font-serif leading-relaxed">{person.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
