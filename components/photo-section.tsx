export function PhotoSection() {
  return (
    <section id="photos" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <img
              src="/assets/kwalata.jpg"
              alt="Wedding venue"
              className="w-full h-[400px] object-cover rounded-sm"
            />
            <div className="text-center font-serif text-[#5C5347]">
              <h3 className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                The Venue
              </h3>
              <p className="text-sm">Kwalata Game Lodge, Dinokeng Game Reserve</p>
            </div>
          </div>

          <div className="space-y-6">
            <img
              src="/assets/our_engagement.jpg"
              alt="Engagement photo"
              className="w-full h-[400px] object-cover rounded-sm"
            />
            <div className="text-center font-serif text-[#5C5347]">
              <h3 className="text-2xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                Our Engagement
              </h3>
              <p className="text-sm">Pretoria, South Africa - June 13, 2021</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
