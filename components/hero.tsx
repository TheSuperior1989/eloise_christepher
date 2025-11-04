export function Hero() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 min-h-[70vh] flex items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h1
          className="font-serif text-6xl sm:text-7xl md:text-8xl text-foreground mb-8 tracking-tight"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Eloise & Christepher
        </h1>
        <div className="space-y-3 text-muted-foreground font-serif">
          <p className="text-xl sm:text-2xl italic" style={{ fontFamily: "Playfair Display, serif" }}>
            are getting married
          </p>
          <div className="w-24 h-px bg-accent mx-auto my-6" />
          <p className="text-lg sm:text-xl">Saturday, 4th of April 2026</p>
          <p className="text-lg sm:text-xl">Kwalata Game Lodge, South Africa</p>
        </div>
      </div>
    </section>
  )
}
