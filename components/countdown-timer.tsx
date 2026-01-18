"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const weddingDate = new Date("2026-04-04T16:00:00") // April 4th, 2026 at 4:00 PM
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [mounted, setMounted] = useState(false)

  function calculateTimeLeft(): TimeLeft {
    const difference = weddingDate.getTime() - new Date().getTime()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="bg-gradient-to-r from-wedding-peach/20 via-wedding-cream to-wedding-peach/20 py-8 px-4 border-y border-wedding-peach/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-wedding-peach" fill="currentColor" />
              <h3 className="font-serif text-2xl text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                Counting Down to Forever
              </h3>
              <Heart className="w-5 h-5 text-wedding-peach" fill="currentColor" />
            </div>
            <div className="flex justify-center gap-4 md:gap-8">
              {[0, 0, 0, 0].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-wedding-peach/20 p-4 md:p-6 min-w-[70px] md:min-w-[90px]">
                    <div className="text-3xl md:text-4xl font-bold text-wedding-coral" style={{ fontFamily: "Playfair Display, serif" }}>
                      --
                    </div>
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2 font-serif">
                    {["Days", "Hours", "Minutes", "Seconds"][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <div className="bg-gradient-to-r from-wedding-peach/20 via-wedding-cream to-wedding-peach/20 py-8 px-4 border-y border-wedding-peach/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4">
          {/* Header with hearts */}
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-wedding-peach" fill="currentColor" />
            <h3 className="font-serif text-2xl text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
              Counting Down to Forever
            </h3>
            <Heart className="w-5 h-5 text-wedding-peach" fill="currentColor" />
          </div>

          {/* Countdown boxes */}
          <div className="flex justify-center gap-4 md:gap-8">
            {timeUnits.map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-wedding-peach/20 p-4 md:p-6 min-w-[70px] md:min-w-[90px] transition-all hover:shadow-lg hover:scale-105">
                  <div 
                    className="text-3xl md:text-4xl font-bold text-wedding-coral tabular-nums" 
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-sm md:text-base text-muted-foreground mt-2 font-serif">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="w-16 h-px bg-wedding-peach/40" />
            <Heart className="w-3 h-3 text-wedding-peach/60" fill="currentColor" />
            <div className="w-16 h-px bg-wedding-peach/40" />
          </div>
        </div>
      </div>
    </div>
  )
}

