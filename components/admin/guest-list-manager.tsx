"use client"

import { useState } from "react"
import { Guest, InvitationStatus, RsvpStatus, AttendanceDay } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, LogOut, Search, Mail, RefreshCw, Filter, Download, X } from "lucide-react"
import { signOut } from "next-auth/react"
import { GuestTable } from "./guest-table"
import { AddGuestDialog } from "./add-guest-dialog"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GuestListManagerProps {
  initialGuests: Guest[]
  session: Session
}

export function GuestListManager({ initialGuests, session }: GuestListManagerProps) {
  const router = useRouter()
  const [guests, setGuests] = useState(initialGuests)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])
  const [isSendingBulk, setIsSendingBulk] = useState(false)
  const [invitationFilter, setInvitationFilter] = useState<InvitationStatus | "ALL">("ALL")
  const [rsvpFilter, setRsvpFilter] = useState<RsvpStatus | "ALL">("ALL")
  const [attendanceDayFilter, setAttendanceDayFilter] = useState<AttendanceDay | "ALL" | "NONE">("ALL")
  const [isResettingRsvp, setIsResettingRsvp] = useState(false)
  const [isResettingAll, setIsResettingAll] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    toast.success("Guest list refreshed")
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleExportPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf")
      const autoTable = (await import("jspdf-autotable")).default

      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.text("Wedding Guest List", 14, 20)

      // Add subtitle with date
      doc.setFontSize(10)
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28)

      // Add stats
      doc.setFontSize(12)
      doc.text(`Total Guests: ${stats.total} | Attending: ${stats.attending} | Not Attending: ${stats.notAttending} | Pending: ${stats.pending}`, 14, 36)

      // Add active filters info
      const activeFilters = []
      if (invitationFilter !== "ALL") activeFilters.push(`Invitation: ${invitationFilter.replace("_", " ")}`)
      if (rsvpFilter !== "ALL") activeFilters.push(`RSVP: ${rsvpFilter.replace("_", " ")}`)
      if (attendanceDayFilter !== "ALL") {
        const dayLabel = attendanceDayFilter === "NONE" ? "None Selected" :
                        attendanceDayFilter === "FRIDAY" ? "Friday" :
                        attendanceDayFilter === "SATURDAY" ? "Saturday" :
                        attendanceDayFilter === "BOTH" ? "Both Days" :
                        "Not Sleeping Over"
        activeFilters.push(`Day: ${dayLabel}`)
      }
      if (searchQuery) activeFilters.push(`Search: "${searchQuery}"`)

      let startY = 42
      if (activeFilters.length > 0) {
        doc.setFontSize(10)
        doc.text(`Active Filters: ${activeFilters.join(" | ")}`, 14, 42)
        startY = 48
      }

      // Prepare table data
      const tableData = filteredGuests.map(guest => {
        let attendanceDay = "-"
        if (guest.attendanceDay) {
          attendanceDay = guest.attendanceDay === "FRIDAY" ? "Friday" :
                         guest.attendanceDay === "SATURDAY" ? "Saturday" :
                         guest.attendanceDay === "BOTH" ? "Both Days" :
                         "Not Sleeping"
        }

        return [
          `${guest.firstName} ${guest.lastName}${guest.plusOne ? " (+1)" : ""}`,
          guest.email || "-",
          guest.phone || "-",
          [guest.relationToBride, guest.relationToGroom].filter(Boolean).join(", ") || "-",
          guest.invitationStatus.replace("_", " "),
          guest.rsvpStatus.replace("_", " "),
          attendanceDay,
          guest.dietaryRestrictions || "-",
          guest.notes || "-"
        ]
      })

      // Add table
      autoTable(doc, {
        head: [["Name", "Email", "Phone", "Relation", "Invitation", "RSVP", "Day", "Dietary", "Notes"]],
        body: tableData,
        startY: startY,
        styles: { fontSize: 7, cellPadding: 2 },
        headStyles: { fillColor: [196, 165, 123], textColor: 255 },
        alternateRowStyles: { fillColor: [250, 248, 245] },
        columnStyles: {
          0: { cellWidth: 28 },
          1: { cellWidth: 32 },
          2: { cellWidth: 22 },
          3: { cellWidth: 22 },
          4: { cellWidth: 18 },
          5: { cellWidth: 18 },
          6: { cellWidth: 18 },
          7: { cellWidth: 20 },
          8: { cellWidth: 22 }
        }
      })

      // Save the PDF
      doc.save(`wedding-guest-list-${new Date().toISOString().split('T')[0]}.pdf`)
      toast.success("Guest list exported successfully")
    } catch (error) {
      console.error("Failed to export PDF:", error)
      toast.error("Failed to export guest list")
    }
  }

  const handleBulkSendInvitations = async () => {
    if (selectedGuests.length === 0) {
      toast.error("Please select at least one guest")
      return
    }

    const confirmed = confirm(
      `Are you sure you want to send invitations to ${selectedGuests.length} guest(s)?`
    )
    if (!confirmed) return

    setIsSendingBulk(true)
    let successCount = 0
    let failCount = 0

    for (const guestId of selectedGuests) {
      try {
        const { sendInvitation } = await import("@/app/admin/actions")
        await sendInvitation(guestId)
        successCount++

        // Update guest status in local state
        setGuests(prev => prev.map(g =>
          g.id === guestId
            ? { ...g, invitationStatus: "SENT" as const, invitationSentAt: new Date() }
            : g
        ))
      } catch (error) {
        failCount++
        console.error(`Failed to send invitation to guest ${guestId}:`, error)
      }
    }

    setIsSendingBulk(false)
    setSelectedGuests([])

    if (successCount > 0) {
      toast.success(`Successfully sent ${successCount} invitation(s)`)
    }
    if (failCount > 0) {
      toast.error(`Failed to send ${failCount} invitation(s)`)
    }
  }

  const handleBulkResetRsvp = async () => {
    if (selectedGuests.length === 0) {
      toast.error("Please select at least one guest")
      return
    }

    const confirmed = confirm(
      `Are you sure you want to reset RSVP status for ${selectedGuests.length} guest(s)? This will clear their RSVP status, attendance day, and dietary restrictions.`
    )
    if (!confirmed) return

    setIsResettingRsvp(true)
    try {
      const { bulkResetRsvp } = await import("@/app/admin/actions")
      await bulkResetRsvp(selectedGuests)

      // Update local state
      setGuests(guests.map(guest => {
        if (selectedGuests.includes(guest.id)) {
          return {
            ...guest,
            rsvpStatus: "PENDING" as RsvpStatus,
            attendanceDay: null,
            dietaryRestrictions: null,
            rsvpSubmittedAt: null,
          }
        }
        return guest
      }))

      setSelectedGuests([])
      toast.success(`Successfully reset RSVP status for ${selectedGuests.length} guest(s)`)
    } catch (error) {
      console.error("Failed to reset RSVP:", error)
      toast.error("Failed to reset RSVP status")
    } finally {
      setIsResettingRsvp(false)
    }
  }

  const handleResetAllGuests = async () => {
    const confirmed = confirm(
      `⚠️ WARNING: This will reset ALL ${guests.length} guests to a fresh state!\n\n` +
      `This will:\n` +
      `• Set all invitation statuses to "NOT SENT"\n` +
      `• Clear all invitation sent dates\n` +
      `• Reset all RSVP statuses to "PENDING"\n` +
      `• Clear all attendance day selections\n` +
      `• Clear all dietary restrictions\n` +
      `• Clear all RSVP submission dates\n\n` +
      `You will be able to send fresh invitations to everyone.\n\n` +
      `Are you absolutely sure you want to proceed?`
    )
    if (!confirmed) return

    // Double confirmation for safety
    const doubleConfirm = confirm(
      `This action cannot be undone!\n\n` +
      `Type "RESET" in the next prompt to confirm.`
    )
    if (!doubleConfirm) return

    const finalConfirm = prompt('Type "RESET" to confirm:')
    if (finalConfirm !== "RESET") {
      toast.error("Reset cancelled - confirmation text did not match")
      return
    }

    setIsResettingAll(true)
    try {
      const { resetAllGuestsToFresh } = await import("@/app/admin/actions")
      const result = await resetAllGuestsToFresh()

      // Update local state
      setGuests(guests.map(guest => ({
        ...guest,
        invitationStatus: "NOT_SENT" as InvitationStatus,
        invitationSentAt: null,
        rsvpStatus: "PENDING" as RsvpStatus,
        attendanceDay: null,
        dietaryRestrictions: null,
        rsvpSubmittedAt: null,
      })))

      setSelectedGuests([])
      toast.success(`Successfully reset all ${result.count} guests to fresh state!`)
    } catch (error) {
      console.error("Failed to reset all guests:", error)
      toast.error("Failed to reset all guests")
    } finally {
      setIsResettingAll(false)
    }
  }

  const filteredGuests = guests.filter((guest) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = (
      guest.firstName.toLowerCase().includes(query) ||
      guest.lastName.toLowerCase().includes(query) ||
      guest.email?.toLowerCase().includes(query) ||
      guest.phone?.toLowerCase().includes(query)
    )

    const matchesInvitation = invitationFilter === "ALL" || guest.invitationStatus === invitationFilter
    const matchesRsvp = rsvpFilter === "ALL" || guest.rsvpStatus === rsvpFilter
    const matchesAttendanceDay =
      attendanceDayFilter === "ALL" ||
      (attendanceDayFilter === "NONE" && !guest.attendanceDay) ||
      guest.attendanceDay === attendanceDayFilter

    return matchesSearch && matchesInvitation && matchesRsvp && matchesAttendanceDay
  })

  const stats = {
    total: guests.length,
    sent: guests.filter((g) => g.invitationStatus === "SENT").length,
    attending: guests.filter((g) => g.rsvpStatus === "ATTENDING").length,
    notAttending: guests.filter((g) => g.rsvpStatus === "NOT_ATTENDING").length,
    pending: guests.filter((g) => g.rsvpStatus === "PENDING").length,
    attendingFriday: guests.filter((g) => g.rsvpStatus === "ATTENDING" && (g.attendanceDay === "FRIDAY" || g.attendanceDay === "BOTH")).length,
    attendingSaturday: guests.filter((g) => g.rsvpStatus === "ATTENDING" && (g.attendanceDay === "SATURDAY" || g.attendanceDay === "BOTH")).length,
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-[#3D3630] mb-2">
            Wedding Guest Manager
          </h1>
          <p className="text-[#7A6F5D]">
            Welcome back, {session.user?.name}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-[#3D3630]">{stats.total}</div>
          <div className="text-sm text-[#7A6F5D]">Total Guests</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-[#C4A57B]">{stats.sent}</div>
          <div className="text-sm text-[#7A6F5D]">Invitations Sent</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-green-600">{stats.attending}</div>
          <div className="text-sm text-[#7A6F5D]">Attending</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-red-600">{stats.notAttending}</div>
          <div className="text-sm text-[#7A6F5D]">Not Attending</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-sm text-[#7A6F5D]">Pending RSVP</div>
        </div>
      </div>

      {/* Attendance Day Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-[#C4A57B]">{stats.attendingFriday}</div>
          <div className="text-sm text-[#7A6F5D]">Attending Friday (for catering)</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E8E3DB]">
          <div className="text-2xl font-bold text-[#C4A57B]">{stats.attendingSaturday}</div>
          <div className="text-sm text-[#7A6F5D]">Attending Saturday</div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Search and Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A6F5D]" />
            <Input
              placeholder="Search guests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7A6F5D] hover:text-[#3D3630] transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <Select value={invitationFilter} onValueChange={(value) => setInvitationFilter(value as InvitationStatus | "ALL")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Invitation Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Invitations</SelectItem>
              <SelectItem value="NOT_SENT">Not Sent</SelectItem>
              <SelectItem value="SENT">Sent</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="OPENED">Opened</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={rsvpFilter} onValueChange={(value) => setRsvpFilter(value as RsvpStatus | "ALL")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="RSVP Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All RSVPs</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="ATTENDING">Attending</SelectItem>
              <SelectItem value="NOT_ATTENDING">Not Attending</SelectItem>
              <SelectItem value="MAYBE">Maybe</SelectItem>
            </SelectContent>
          </Select>

          <Select value={attendanceDayFilter} onValueChange={(value) => setAttendanceDayFilter(value as AttendanceDay | "ALL" | "NONE")}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Attendance Day" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Days</SelectItem>
              <SelectItem value="NONE">None Selected</SelectItem>
              <SelectItem value="FRIDAY">Friday</SelectItem>
              <SelectItem value="SATURDAY">Saturday</SelectItem>
              <SelectItem value="BOTH">Both Days</SelectItem>
              <SelectItem value="NOT_SLEEPING_OVER">Not Sleeping Over</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {(searchQuery || invitationFilter !== "ALL" || rsvpFilter !== "ALL" || attendanceDayFilter !== "ALL") && (
            <Button
              onClick={() => {
                setSearchQuery("")
                setInvitationFilter("ALL")
                setRsvpFilter("ALL")
                setAttendanceDayFilter("ALL")
                toast.success("Filters cleared")
              }}
              variant="outline"
              className="gap-2 whitespace-nowrap"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {selectedGuests.length > 0 && (
            <>
              <Button
                onClick={handleBulkSendInvitations}
                className="bg-[#C4A57B] hover:bg-[#B39568] text-white gap-2"
                disabled={isSendingBulk}
              >
                <Mail className="h-4 w-4" />
                {isSendingBulk ? "Sending..." : `Send Invitations (${selectedGuests.length})`}
              </Button>
              <Button
                onClick={handleBulkResetRsvp}
                variant="destructive"
                className="gap-2"
                disabled={isResettingRsvp}
              >
                <RefreshCw className="h-4 w-4" />
                {isResettingRsvp ? "Resetting..." : `Reset RSVP (${selectedGuests.length})`}
              </Button>
            </>
          )}
          <Button
            onClick={handleExportPDF}
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={handleResetAllGuests}
            variant="destructive"
            className="gap-2 bg-red-600 hover:bg-red-700"
            disabled={isResettingAll}
          >
            <RefreshCw className={`h-4 w-4 ${isResettingAll ? 'animate-spin' : ''}`} />
            {isResettingAll ? "Resetting All..." : "Reset All Guests"}
          </Button>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#C4A57B] hover:bg-[#B39568] text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Guest
          </Button>
        </div>
      </div>

      {/* Guest Table */}
      <GuestTable
        guests={filteredGuests}
        onGuestsChange={setGuests}
        selectedGuests={selectedGuests}
        onSelectionChange={setSelectedGuests}
      />

      {/* Add Guest Dialog */}
      <AddGuestDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onGuestAdded={(newGuest) => {
          setGuests([newGuest, ...guests])
          setIsAddDialogOpen(false)
        }}
      />
    </div>
  )
}

