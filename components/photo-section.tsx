export function PhotoSection() {
  return (
    <section id="photos" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <a
              href="https://www.kwalata.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-90 transition-opacity"
            >
              <img
                src="/assets/kwalata.jpg"
                alt="Wedding venue - Click to visit Kwalata Game Lodge website"
                className="w-full h-[400px] object-cover rounded-sm cursor-pointer"
              />
            </a>
            <div className="text-center font-serif text-[#5C5347]">
              <h3 className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                The Venue
              </h3>
              <p className="text-sm mb-4">Kwalata Game Lodge, Dinokeng Game Reserve</p>
              <div className="text-xs text-[#7A6F5D] leading-relaxed max-w-md mx-auto space-y-3">
                <div className="bg-[#C4A57B]/10 p-3 rounded-lg border border-[#C4A57B]/20">
                  <p className="font-semibold text-[#3D3630] mb-1">⏰ Important Information</p>
                  <p className="mb-1">All guests must arrive at the lodge by <span className="font-semibold text-[#C4A57B]">15:00 (3:00 PM)</span></p>
                  <p>Cost: <span className="font-semibold text-[#C4A57B]">R1,135 per person</span> (breakfast included)</p>
                </div>
                <p className="mb-2">
                  Guests should book their own accommodation for Friday and Saturday through Phuthi (Wedding Coordinator).
                </p>
                <p className="mb-1">📞 067 417 2141</p>
                <p>📧 <a href="mailto:coordinator@kwalata.co.za" className="text-[#C4A57B] hover:underline">coordinator@kwalata.co.za</a></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <img
              src="/assets/our_engagement.jpg"
              alt="Engagement photo"
              className="w-full h-[400px] object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
