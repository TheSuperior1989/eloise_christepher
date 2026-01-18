"use client"

import { Guest } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Heart, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InvitationViewProps {
  guest: Guest
}

export function InvitationView({ guest }: InvitationViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#F5F2ED] to-[#EDE8E0] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-[#C4A57B]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[#C4A57B]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Hero Image Section */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/assets/guest_registration_new.jpg"
              alt="Eloise & Christepher"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    bottom: -20, 
                    left: `${Math.random() * 100}%`,
                    opacity: 0 
                  }}
                  animate={{
                    bottom: "110%",
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear",
                  }}
                >
                  <Heart className="w-6 h-6 text-white/40 fill-white/40" />
                </motion.div>
              ))}
            </div>

            {/* Title Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-8 left-0 right-0 text-center px-4"
            >
              <h1 className="font-serif text-5xl md:text-7xl text-white mb-2 drop-shadow-lg" style={{ fontFamily: "Playfair Display, serif" }}>
                Eloise & Christepher
              </h1>
              <div className="flex items-center justify-center gap-3 text-white/90">
                <div className="h-px w-12 bg-white/50" />
                <p className="text-xl md:text-2xl font-serif italic">are getting married</p>
                <div className="h-px w-12 bg-white/50" />
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Personal Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-2xl md:text-3xl font-serif text-[#3D3630] mb-4">
                Dear {guest.firstName} {guest.lastName},
              </p>
              <p className="text-lg text-[#7A6F5D] leading-relaxed max-w-2xl mx-auto">
                We joyfully invite you to celebrate our wedding day with us. Your presence would mean the world to us as we begin this beautiful journey together.
              </p>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center justify-center my-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C4A57B]/30 to-transparent" />
              <Heart className="w-5 h-5 text-[#C4A57B] mx-4 fill-[#C4A57B]" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C4A57B]/30 to-transparent" />
            </div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5F2ED] p-6 rounded-xl border border-[#C4A57B]/20">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-[#C4A57B] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg text-[#3D3630] mb-1">Date</h3>
                    <p className="text-[#7A6F5D]">Saturday, April 4, 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#FAF8F5] to-[#F5F2ED] p-6 rounded-xl border border-[#C4A57B]/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#C4A57B] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-serif text-lg text-[#3D3630] mb-1">Time</h3>
                    <p className="text-[#7A6F5D]">4:00 PM</p>
                    <p className="text-sm text-[#7A6F5D] mt-1">Please arrive by 3:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-gradient-to-br from-[#FAF8F5] to-[#F5F2ED] p-6 rounded-xl border border-[#C4A57B]/20">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#C4A57B] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-[#3D3630] mb-1">Venue</h3>
                    <p className="text-[#7A6F5D] mb-2">Kwalata Game Lodge</p>
                    <p className="text-sm text-[#7A6F5D]">Dinokeng Game Reserve, Hammanskraal, South Africa</p>
                    <div className="mt-3 p-3 bg-[#C4A57B]/10 rounded-lg">
                      <p className="text-sm text-[#3D3630] font-semibold mb-1">Accommodation: R1,135 per guest per night</p>
                      <p className="text-xs text-[#7A6F5D] mb-1">(Breakfast included)</p>
                      <p className="text-xs text-[#7A6F5D] italic">
                        Stay Friday & Saturday = 2 nights | Saturday only = 1 night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RSVP Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-center mb-8"
            >
              <Link href={`/rsvp/${guest.invitationToken}`}>
                <Button
                  size="lg"
                  className="bg-[#C4A57B] hover:bg-[#B39568] text-white px-12 py-6 text-lg font-serif rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  RSVP Now
                </Button>
              </Link>
              <p className="text-sm text-[#7A6F5D] mt-3">Please respond by March 1, 2026</p>
            </motion.div>

            {/* Website Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="text-center pt-6 border-t border-[#C4A57B]/20"
            >
              <p className="text-sm text-[#7A6F5D] mb-3">For more information about our wedding:</p>
              <Link
                href="https://eloise-christepher.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C4A57B] hover:text-[#B39568] font-serif transition-colors"
              >
                Visit Our Wedding Website
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Footer Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-[#7A6F5D] font-serif italic mb-2">
                We can't wait to celebrate with you!
              </p>
              <p className="text-[#3D3630] font-serif">
                With love,
                <br />
                <span className="text-lg">Eloise & Christepher</span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

