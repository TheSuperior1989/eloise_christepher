"use client"

import { useState } from "react"
import { Guest } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, LogOut, Search, Mail, RefreshCw } from "lucide-react"
import { signOut } from "next-auth/react"
import { GuestTable } from "./guest-table"
import { AddGuestDialog } from "./add-guest-dialog"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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

  const handleRefresh = () => {
    setIsRefreshing(true)
    router.refresh()
    toast.success("Guest list refreshed")
    setTimeout(() => setIsRefreshing(false), 1000)
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

  const filteredGuests = guests.filter((guest) => {
    const query = searchQuery.toLowerCase()
    return (
      guest.firstName.toLowerCase().includes(query) ||
      guest.lastName.toLowerCase().includes(query) ||
      guest.email?.toLowerCase().includes(query) ||
      guest.phone?.toLowerCase().includes(query)
    )
  })

  const stats = {
    total: guests.length,
    sent: guests.filter((g) => g.invitationStatus === "SENT").length,
    attending: guests.filter((g) => g.rsvpStatus === "ATTENDING").length,
    notAttending: guests.filter((g) => g.rsvpStatus === "NOT_ATTENDING").length,
    pending: guests.filter((g) => g.rsvpStatus === "PENDING").length,
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7A6F5D]" />
          <Input
            placeholder="Search guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedGuests.length > 0 && (
          <Button
            onClick={handleBulkSendInvitations}
            className="bg-[#C4A57B] hover:bg-[#B39568] text-white gap-2"
            disabled={isSendingBulk}
          >
            <Mail className="h-4 w-4" />
            {isSendingBulk ? "Sending..." : `Send Invitations (${selectedGuests.length})`}
          </Button>
        )}
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
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#C4A57B] hover:bg-[#B39568] text-white gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Guest
        </Button>
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

