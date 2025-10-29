"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface QA {
  question: string
  answer: string
}

export function QASection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const qaItems: QA[] = [
    {
      question: "Can I bring a date?",
      answer: "Please check your invite for your +1 indications.",
    },
    {
      question: "Are kids welcome?",
      answer:
        "We love your little ones dearly, but we've chosen to make our wedding a child-free celebration. We hope you take this opportunity to relax, unwind, and enjoy the weekend with us, you deserve it!",
    },
    {
      question: "When is the RSVP deadline?",
      answer: "Please RSVP before or on March 11th 2026, so we can have an accurate headcount.",
    },
    {
      question: "Where should I park?",
      answer: "There is plenty of free parking at the lodge.",
    },
    {
      question: "What should I wear?",
      answer: "Please see our Schedule for the dress codes.",
    },
    {
      question: "Is the wedding indoors or outdoors?",
      answer: "Our wedding ceremony and reception is outdoors.",
    },
    {
      question: "What kind of shoes should/shouldn't I wear?",
      answer:
        "A little style tip from us to you. Stilettos and grass don't mix! There'll be some grassy and uneven spots, so we recommend block heels, wedges, or stylish flats to keep you comfortable (and upright 😉).",
    },
    {
      question: "Is it okay to take pictures with our phones and cameras during the wedding?",
      answer:
        "We kindly ask for no photos during the ceremony. We'd love for you to be fully present with us in this special moment (plus, we paid good money for the professionals to capture it 😉). Afterwards, go wild. Take photos, selfies, and videos during the cocktail hour, reception, and afterparty!",
    },
    {
      question: "Whom should I call with questions?",
      answer: "Please call Eloise or Christepher.",
    },
    {
      question: "What's the weather like?",
      answer:
        "Our wedding will take place in early April, which usually brings warm days and cooler evenings. We recommend bringing a light jacket or wrap to stay cozy once the sun sets.",
    },
    {
      question: "Is there accommodation available nearby?",
      answer:
        "Yes! The entire venue has been booked for our guests until two months before the wedding. Please contact Phuthi (the coordinator) directly to reserve your room and mention our wedding when booking. Breakfast is included!",
    },
    {
      question: "What time should I arrive?",
      answer:
        'Please arrive at least 20 minutes before the ceremony begins to give yourself time to travel, find your seat, and settle in before we say "I do."',
    },
  ]

  return (
    <section id="qa" className="py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-[#3D3630] text-center mb-4">Q & A</h2>
        <div className="w-24 h-px bg-[#C4A57B] mx-auto mb-4" />
        <p className="text-center text-[#5C5347] font-serif mb-12">
          For all our friends and family who have lots of questions, please check out our Q & A first!
        </p>

        <div className="space-y-4">
          {qaItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif text-lg text-[#3D3630] pr-4">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-[#C4A57B] flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && <div className="px-6 pb-4 text-[#5C5347] leading-relaxed">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
