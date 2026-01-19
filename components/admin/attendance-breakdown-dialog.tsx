"use client"

import { Guest } from "@prisma/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar, Moon, Sun } from "lucide-react"

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

  const GuestCard = ({ guest }: { guest: Guest }) => (
    <div className="p-3 bg-white rounded-lg border border-[#E8E3DB] hover:border-[#C4A57B] transition-colors">
      <p className="font-medium text-[#3D3630]">
        {guest.firstName} {guest.lastName}
      </p>
      {guest.email && (
        <p className="text-xs text-[#7A6F5D] mt-1">{guest.email}</p>
      )}
      {guest.plusOne && (
        <p className="text-xs text-[#C4A57B] mt-1">+ Plus One</p>
      )}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#3D3630]">
            Attendance Breakdown
          </DialogTitle>
          <DialogDescription>
            Detailed view of guests by their attendance schedule
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Friday Night */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#C4A57B]">
              <Moon className="w-5 h-5 text-[#C4A57B]" />
              <div>
                <h3 className="font-serif font-semibold text-[#3D3630]">
                  Friday Night
                </h3>
                <p className="text-sm text-[#7A6F5D]">
                  {fridayGuests.length} guest{fridayGuests.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {fridayGuests.length === 0 ? (
                  <p className="text-sm text-[#7A6F5D] italic text-center py-8">
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

          {/* Saturday Night */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#C4A57B]">
              <Moon className="w-5 h-5 text-[#C4A57B]" />
              <div>
                <h3 className="font-serif font-semibold text-[#3D3630]">
                  Saturday Night
                </h3>
                <p className="text-sm text-[#7A6F5D]">
                  {saturdayGuests.length} guest{saturdayGuests.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {saturdayGuests.length === 0 ? (
                  <p className="text-sm text-[#7A6F5D] italic text-center py-8">
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

          {/* Not Sleeping Over */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b-2 border-[#C4A57B]">
              <Sun className="w-5 h-5 text-[#C4A57B]" />
              <div>
                <h3 className="font-serif font-semibold text-[#3D3630]">
                  Not Sleeping Over
                </h3>
                <p className="text-sm text-[#7A6F5D]">
                  {notSleepingOverGuests.length} guest{notSleepingOverGuests.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {notSleepingOverGuests.length === 0 ? (
                  <p className="text-sm text-[#7A6F5D] italic text-center py-8">
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
      </DialogContent>
    </Dialog>
  )
}

