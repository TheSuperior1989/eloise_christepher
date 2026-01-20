"use client"

import { useState } from "react"
import { Guest } from "@prisma/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Moon, Sun, Mail, Phone, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface AttendanceBreakdownDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guests: Guest[]
}

export function AttendanceBreakdownDialog({
  open,
  onOpenChange,
  guests,
}: AttendanceBreakdownDialogProps) {
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)

  // Filter guests by attendance day
  const fridayGuests = guests.filter(
    (g) => g.rsvpStatus === "ATTENDING" && (g.attendanceDay === "FRIDAY" || g.attendanceDay === "BOTH")
  )
  const saturdayGuests = guests.filter(
    (g) => g.rsvpStatus === "ATTENDING" && (g.attendanceDay === "SATURDAY" || g.attendanceDay === "BOTH")
  )
  const notSleepingOverGuests = guests.filter(
    (g) => g.rsvpStatus === "ATTENDING" && g.attendanceDay === "NOT_SLEEPING_OVER"
  )

  const downloadPDF = () => {
    const doc = new jsPDF()

    // Title
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("Attendance Breakdown", 14, 20)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28)

    let yPosition = 40

    // Helper function to add a section
    const addSection = (title: string, guestList: Guest[], icon: string) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(`${icon} ${title} (${guestList.length} guests)`, 14, yPosition)
      yPosition += 8

      if (guestList.length === 0) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        doc.text("No guests", 14, yPosition)
        yPosition += 10
      } else {
        const tableData = guestList.map((guest) => [
          `${guest.firstName} ${guest.lastName}`,
          guest.email || "N/A",
          guest.phone || "N/A",
          guest.plusOne ? "Yes" : "No",
          guest.dietaryRestrictions || "None",
        ])

        autoTable(doc, {
          startY: yPosition,
          head: [["Name", "Email", "Phone", "Plus One", "Dietary"]],
          body: tableData,
          theme: "striped",
          headStyles: { fillColor: [196, 165, 123] },
          margin: { left: 14 },
          styles: { fontSize: 9 },
        })

        yPosition = (doc as any).lastAutoTable.finalY + 15
      }
    }

    // Add sections
    addSection("Friday Night", fridayGuests, "🌙")
    addSection("Saturday Night", saturdayGuests, "🌙")
    addSection("Not Sleeping Over (Ceremony Only)", notSleepingOverGuests, "☀️")

    // Save
    doc.save(`attendance-breakdown-${new Date().toISOString().split("T")[0]}.pdf`)
  }

  const GuestCard = ({ guest }: { guest: Guest }) => (
    <button
      onClick={() => setSelectedGuest(guest)}
      className="w-full p-3 bg-white rounded-lg border border-[#E8E3DB] hover:border-[#C4A57B] hover:bg-[#FAF8F5] transition-all text-left"
    >
      <p className="font-medium text-[#3D3630]">
        {guest.firstName} {guest.lastName}
      </p>
    </button>
  )

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[95vw] w-full max-h-[95vh] h-[95vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-3xl font-serif text-[#3D3630]">
                  Attendance Breakdown
                </DialogTitle>
                <DialogDescription className="text-base">
                  Click on any guest name to view their full details
                </DialogDescription>
              </div>
              <Button
                onClick={downloadPDF}
                variant="outline"
                className="gap-2 border-[#C4A57B] text-[#C4A57B] hover:bg-[#C4A57B] hover:text-white"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 flex-1 min-h-0 overflow-hidden">
            {/* Friday Night */}
            <div className="flex flex-col h-full min-h-0">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-[#C4A57B] flex-shrink-0">
                <Moon className="w-6 h-6 text-[#C4A57B]" />
                <div>
                  <h3 className="font-serif font-semibold text-[#3D3630] text-xl">
                    Friday Night
                  </h3>
                  <p className="text-sm text-[#7A6F5D]">
                    {fridayGuests.length} guest{fridayGuests.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex-1 mt-4 min-h-0 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                <div className="space-y-2">
                  {fridayGuests.length === 0 ? (
                    <p className="text-sm text-[#7A6F5D] italic text-center py-12">
                      No guests sleeping over Friday
                    </p>
                  ) : (
                    fridayGuests.map((guest) => (
                      <GuestCard key={guest.id} guest={guest} />
                    ))
                  )}
                </div>
                </ScrollArea>
              </div>
            </div>

            {/* Saturday Night */}
            <div className="flex flex-col h-full min-h-0">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-[#C4A57B] flex-shrink-0">
                <Moon className="w-6 h-6 text-[#C4A57B]" />
                <div>
                  <h3 className="font-serif font-semibold text-[#3D3630] text-xl">
                    Saturday Night
                  </h3>
                  <p className="text-sm text-[#7A6F5D]">
                    {saturdayGuests.length} guest{saturdayGuests.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex-1 mt-4 min-h-0 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                <div className="space-y-2">
                  {saturdayGuests.length === 0 ? (
                    <p className="text-sm text-[#7A6F5D] italic text-center py-12">
                      No guests sleeping over Saturday
                    </p>
                  ) : (
                    saturdayGuests.map((guest) => (
                      <GuestCard key={guest.id} guest={guest} />
                    ))
                  )}
                </div>
                </ScrollArea>
              </div>
            </div>

            {/* Not Sleeping Over */}
            <div className="flex flex-col h-full min-h-0">
              <div className="flex items-center gap-3 pb-4 border-b-2 border-[#C4A57B] flex-shrink-0">
                <Sun className="w-6 h-6 text-[#C4A57B]" />
                <div>
                  <h3 className="font-serif font-semibold text-[#3D3630] text-xl">
                    Not Sleeping Over
                  </h3>
                  <p className="text-sm text-[#7A6F5D]">
                    {notSleepingOverGuests.length} guest{notSleepingOverGuests.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="flex-1 mt-4 min-h-0 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                <div className="space-y-2">
                  {notSleepingOverGuests.length === 0 ? (
                    <p className="text-sm text-[#7A6F5D] italic text-center py-12">
                      No ceremony-only guests
                    </p>
                  ) : (
                    notSleepingOverGuests.map((guest) => (
                      <GuestCard key={guest.id} guest={guest} />
                    ))
                  )}
                </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Guest Details Overlay Dialog */}
      <AlertDialog open={!!selectedGuest} onOpenChange={() => setSelectedGuest(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-serif text-[#3D3630]">
              Guest Details
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Detailed information about the selected guest
            </AlertDialogDescription>
          </AlertDialogHeader>

          {selectedGuest && (
            <div className="space-y-4 py-4">
              {/* Name */}
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#C4A57B] mt-0.5" />
                <div>
                  <p className="text-sm text-[#7A6F5D] font-medium">Full Name</p>
                  <p className="text-base text-[#3D3630] font-semibold">
                    {selectedGuest.firstName} {selectedGuest.lastName}
                  </p>
                </div>
              </div>

              {/* Email */}
              {selectedGuest.email && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C4A57B] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#7A6F5D] font-medium">Email</p>
                    <p className="text-base text-[#3D3630]">{selectedGuest.email}</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {selectedGuest.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C4A57B] mt-0.5" />
                  <div>
                    <p className="text-sm text-[#7A6F5D] font-medium">Phone</p>
                    <p className="text-base text-[#3D3630]">{selectedGuest.phone}</p>
                  </div>
                </div>
              )}

              {/* Attendance Day */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#C4A57B] mt-0.5" />
                <div>
                  <p className="text-sm text-[#7A6F5D] font-medium">Attendance</p>
                  <p className="text-base text-[#3D3630]">
                    {selectedGuest.attendanceDay === "FRIDAY" && "Friday Night"}
                    {selectedGuest.attendanceDay === "SATURDAY" && "Saturday Night"}
                    {selectedGuest.attendanceDay === "BOTH" && "Both Friday & Saturday"}
                    {selectedGuest.attendanceDay === "NOT_SLEEPING_OVER" && "Not Sleeping Over (Ceremony Only)"}
                  </p>
                </div>
              </div>

              {/* Plus One */}
              {selectedGuest.plusOne && (
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#C4A57B]/30">
                  <p className="text-sm text-[#C4A57B] font-semibold">+ Plus One Allowed</p>
                </div>
              )}

              {/* Dietary Restrictions */}
              {selectedGuest.dietaryRestrictions && (
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <span className="text-[#C4A57B]">🍽️</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A6F5D] font-medium">Dietary Restrictions</p>
                    <p className="text-base text-[#3D3630]">{selectedGuest.dietaryRestrictions}</p>
                  </div>
                </div>
              )}

              {/* Relation */}
              {(selectedGuest.relationToBride || selectedGuest.relationToGroom) && (
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <span className="text-[#C4A57B]">💑</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#7A6F5D] font-medium">Relation</p>
                    {selectedGuest.relationToBride && (
                      <p className="text-base text-[#3D3630]">
                        <span className="font-medium">To Bride:</span> {selectedGuest.relationToBride}
                      </p>
                    )}
                    {selectedGuest.relationToGroom && (
                      <p className="text-base text-[#3D3630]">
                        <span className="font-medium">To Groom:</span> {selectedGuest.relationToGroom}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              onClick={() => setSelectedGuest(null)}
              className="bg-[#3D3630] hover:bg-[#2D2620]"
            >
              Close
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

