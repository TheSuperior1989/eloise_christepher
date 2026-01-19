"use client"

import { Calendar, MapPin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface Event {
  time: string
  title: string
  description: string
  attire: string
  location: string
}

interface DaySchedule {
  date: string
  day: string
  events: Event[]
}

export function ScheduleSection() {
  const schedule: DaySchedule[] = [
    {
      date: "April 3, 2026",
      day: "Friday",
      events: [
        {
          time: "2:00 PM",
          title: "Guest Arrival",
          description: "Guests joining us for the pre wedding dinner can start checking in.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "5:00 PM",
          title: "Ice Breakers",
          description: "Getting to know other people before the wedding and relaxing.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "7:00 PM",
          title: "Friday Dinner",
          description: "Let's kick off the wedding celebrations with some good food.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "8:00 PM",
          title: "Mingling",
          description: "Relaxing and socializing after dinner.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
      ],
    },
    {
      date: "April 4, 2026",
      day: "Saturday",
      events: [
        {
          time: "8:00 AM - 10:00 AM",
          title: "Saturday Breakfast",
          description: "Breakfast for all the guests that joined the Friday evening",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "10:00 AM",
          title: "Guest Arrival",
          description: "The rest of the guests joining us can check in and get ready.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "3:30 PM - 3:45 PM",
          title: "Travel to Ceremony Area",
          description: "Game drivers will be transporting guests from the venue to the ceremony area.",
          attire: "Semi Formal",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "4:00 PM - 4:30 PM",
          title: "Ceremony",
          description: 'We say our "I do\'s" in an unplugged ceremony',
          attire: "Semi Formal",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "4:45 PM",
          title: "Travel to Cocktail Hour",
          description: "Guests are transported back to the main lodge.",
          attire: "Semi Formal",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "5:00 PM - 6:00 PM",
          title: "Cocktail Hour",
          description: "Guest enjoy snacks and drinks.",
          attire: "Semi Formal",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "6:10 PM",
          title: "Reception",
          description: "Where we eat, drink and dance the night away",
          attire: "Cocktail Attire",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
      ],
    },
    {
      date: "April 5, 2026",
      day: "Sunday",
      events: [
        {
          time: "8:00 AM - 10:00 AM",
          title: "Mr & Mrs Breakfast",
          description: "We would love for all our guests to have our first breakfast with us as Mr & Mrs.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
        {
          time: "10:00 AM",
          title: "Check Out",
          description:
            "Guests check out of rooms. We are welcome to spend the day at Kwalata swimming, hiking and going on game drives.",
          attire: "Casual",
          location: "Kwalata Game Lodge in Dinokeng Game Reserve, South Africa",
        },
      ],
    },
  ]

  const handleDownloadPDF = () => {
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("Wedding Schedule", 105, 20, { align: "center" })

    doc.setFontSize(14)
    doc.setFont("helvetica", "normal")
    doc.text("Eloise & Christepher", 105, 30, { align: "center" })

    let yPosition = 45

    schedule.forEach((day, dayIndex) => {
      // Add day header
      if (dayIndex > 0) {
        yPosition += 10
      }

      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(196, 165, 123) // Gold color
      doc.text(`${day.day} - ${day.date}`, 20, yPosition)
      yPosition += 8

      // Create table data for this day
      const tableData = day.events.map(event => [
        event.time,
        event.title,
        event.description,
        event.attire,
      ])

      // Add table
      autoTable(doc, {
        startY: yPosition,
        head: [["Time", "Event", "Description", "Attire"]],
        body: tableData,
        theme: "striped",
        headStyles: {
          fillColor: [196, 165, 123], // Gold color
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          fontSize: 9,
          cellPadding: 3,
        },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 40 },
          2: { cellWidth: 80 },
          3: { cellWidth: 30 },
        },
        margin: { left: 20, right: 20 },
      })

      yPosition = (doc as any).lastAutoTable.finalY + 5

      // Add page break if needed
      if (yPosition > 250 && dayIndex < schedule.length - 1) {
        doc.addPage()
        yPosition = 20
      }
    })

    // Add footer
    const pageCount = (doc as any).internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(122, 111, 93)
      doc.text(
        "Kwalata Game Lodge, Dinokeng Game Reserve, South Africa",
        105,
        285,
        { align: "center" }
      )
    }

    doc.save("Wedding-Schedule-Eloise-Christepher.pdf")
  }

  return (
    <section id="schedule" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-4">
          <h2 className="font-serif text-4xl md:text-5xl text-foreground text-center mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Weekend Schedule</h2>
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="gap-2 border-[#C4A57B] text-[#C4A57B] hover:bg-[#C4A57B] hover:text-white"
          >
            <Download className="h-4 w-4" />
            Download Schedule PDF
          </Button>
        </div>
        <div className="w-24 h-px bg-accent mx-auto mb-16" />

        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div className="text-center mb-8">
                <h3 className="font-serif text-3xl text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{day.day}</h3>
                <p className="text-muted-foreground font-serif">{day.date}</p>
              </div>

              <div className="space-y-8">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="border-l-2 border-accent pl-6 py-2 relative">
                    <div className="absolute -left-2 top-4 w-3 h-3 bg-accent rounded-full" />
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="md:w-48 flex-shrink-0">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <Calendar size={16} />
                          <span className="font-serif text-sm">{event.time}</span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-serif rounded-full">
                          {event.attire}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-xl text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>{event.title}</h4>
                        <p className="text-[#5C5347] leading-relaxed mb-2">{event.description}</p>
                        <div className="flex items-start gap-2 text-sm text-[#7A6F5D]">
                          <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                          <span className="font-serif">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
