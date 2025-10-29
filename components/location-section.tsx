export function LocationSection() {
  return (
    <section id="travel" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-serif text-4xl sm:text-5xl text-[#3D3630] text-center mb-12"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Location & Travel
        </h2>

        <div className="space-y-8">
          <div className="text-center font-serif text-[#5C5347] space-y-4">
            <h3 className="text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
              Ceremony & Reception
            </h3>
            <p className="text-lg">Kwalata Game Lodge</p>
            <p>Dinokeng Game Reserve</p>
            <p>Hammanskraal, South Africa</p>
          </div>

          {/* Map */}
          <div className="w-full h-[400px] bg-[#E8E3DB] rounded-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.8!2d28.3!3d-25.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956b0b0b0b0b0b%3A0x0!2sKwalata%20Game%20Lodge!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kwalata Game Lodge Location"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-8">
            <div className="text-center font-serif text-[#5C5347] space-y-3">
              <h3 className="text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                Accommodations
              </h3>
              <p className="text-sm leading-relaxed">
                Kwalata Game Lodge offers on-site accommodation. Additional lodging options are available in nearby
                Pretoria. Please contact us for recommendations and booking assistance.
              </p>
            </div>

            <div className="text-center font-serif text-[#5C5347] space-y-3">
              <h3 className="text-xl" style={{ fontFamily: "Playfair Display, serif" }}>
                Getting There
              </h3>
              <p className="text-sm leading-relaxed">
                O.R. Tambo International Airport (JNB) in Johannesburg is approximately 90 minutes from the venue. We
                recommend renting a car or arranging shuttle services for the journey to Dinokeng Game Reserve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
