"use client"

import { useState } from "react"
import { Guest } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Edit, Trash2, MoreHorizontal, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteGuest, sendInvitation, sendRsvpReminder } from "@/app/admin/actions"
import { EditGuestDialog } from "./edit-guest-dialog"
import { toast } from "sonner"

interface GuestTableProps {
  guests: Guest[]
  onGuestsChange: (guests: Guest[]) => void
  selectedGuests: string[]
  onSelectionChange: (selected: string[]) => void
}

export function GuestTable({ guests, onGuestsChange, selectedGuests, onSelectionChange }: GuestTableProps) {
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null)
  const [sendingInvitation, setSendingInvitation] = useState<string | null>(null)
  const [sendingReminder, setSendingReminder] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guest?")) return

    try {
      await deleteGuest(id)
      onGuestsChange(guests.filter((g) => g.id !== id))
      toast.success("Guest deleted successfully")
    } catch (error) {
      toast.error("Failed to delete guest")
    }
  }

  const handleSendInvitation = async (guest: Guest) => {
    if (!guest.email) {
      toast.error("Guest has no email address")
      return
    }

    setSendingInvitation(guest.id)
    try {
      await sendInvitation(guest.id)
      const updatedGuests = guests.map((g) =>
        g.id === guest.id
          ? { ...g, invitationStatus: "SENT" as const, invitationSentAt: new Date() }
          : g
      )
      onGuestsChange(updatedGuests)
      toast.success(`Invitation sent to ${guest.firstName} ${guest.lastName}`)
    } catch (error) {
      toast.error("Failed to send invitation")
    } finally {
      setSendingInvitation(null)
    }
  }

  const handleSendReminder = async (guest: Guest) => {
    if (!guest.email) {
      toast.error("Guest has no email address")
      return
    }

    if (guest.invitationStatus !== "SENT") {
      toast.error("Cannot send reminder - invitation has not been sent yet")
      return
    }

    if (guest.rsvpStatus !== "PENDING") {
      toast.error("Cannot send reminder - guest has already responded")
      return
    }

    setSendingReminder(guest.id)
    try {
      await sendRsvpReminder(guest.id)
      toast.success(`Reminder sent to ${guest.firstName} ${guest.lastName}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reminder")
    } finally {
      setSendingReminder(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      NOT_SENT: { variant: "outline", label: "Not Sent" },
      SENT: { variant: "default", label: "Sent" },
      DELIVERED: { variant: "secondary", label: "Delivered" },
      OPENED: { variant: "secondary", label: "Opened" },
      FAILED: { variant: "destructive", label: "Failed" },
    }
    const config = variants[status] || variants.NOT_SENT
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getRsvpBadge = (status: string) => {
    const variants: Record<string, { className: string; label: string }> = {
      PENDING: { className: "bg-orange-100 text-orange-800", label: "Pending" },
      ATTENDING: { className: "bg-green-100 text-green-800", label: "Attending" },
      NOT_ATTENDING: { className: "bg-red-100 text-red-800", label: "Not Attending" },
      MAYBE: { className: "bg-yellow-100 text-yellow-800", label: "Maybe" },
    }
    const config = variants[status] || variants.PENDING
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const guestsWithEmail = guests.filter(g => g.email).map(g => g.id)
      onSelectionChange(guestsWithEmail)
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectGuest = (guestId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedGuests, guestId])
    } else {
      onSelectionChange(selectedGuests.filter(id => id !== guestId))
    }
  }

  const allSelected = guests.filter(g => g.email).length > 0 &&
    guests.filter(g => g.email).every(g => selectedGuests.includes(g.id))

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-[#E8E3DB] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all guests"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Relation</TableHead>
              <TableHead>Invitation</TableHead>
              <TableHead>RSVP</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-[#7A6F5D]">
                  No guests found. Add your first guest to get started!
                </TableCell>
              </TableRow>
            ) : (
              guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedGuests.includes(guest.id)}
                      onCheckedChange={(checked) => handleSelectGuest(guest.id, checked as boolean)}
                      disabled={!guest.email}
                      aria-label={`Select ${guest.firstName} ${guest.lastName}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {guest.firstName} {guest.lastName}
                    {guest.plusOne && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        +1
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{guest.email || "-"}</TableCell>
                  <TableCell>{guest.phone || "-"}</TableCell>
                  <TableCell className="text-sm">
                    {guest.relationToBride && <div>Bride: {guest.relationToBride}</div>}
                    {guest.relationToGroom && <div>Groom: {guest.relationToGroom}</div>}
                    {!guest.relationToBride && !guest.relationToGroom && "-"}
                  </TableCell>
                  <TableCell>{getStatusBadge(guest.invitationStatus)}</TableCell>
                  <TableCell>{getRsvpBadge(guest.rsvpStatus)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingGuest(guest)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSendInvitation(guest)}
                          disabled={!guest.email || sendingInvitation === guest.id}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          {sendingInvitation === guest.id ? "Sending..." : "Send Invitation"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleSendReminder(guest)}
                          disabled={
                            !guest.email ||
                            sendingReminder === guest.id ||
                            guest.invitationStatus !== "SENT" ||
                            guest.rsvpStatus !== "PENDING"
                          }
                        >
                          <Bell className="h-4 w-4 mr-2" />
                          {sendingReminder === guest.id ? "Sending..." : "Send RSVP Reminder"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(guest.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingGuest && (
        <EditGuestDialog
          guest={editingGuest}
          open={!!editingGuest}
          onOpenChange={(open) => !open && setEditingGuest(null)}
          onGuestUpdated={(updatedGuest) => {
            onGuestsChange(guests.map((g) => (g.id === updatedGuest.id ? updatedGuest : g)))
            setEditingGuest(null)
          }}
        />
      )}
    </>
  )
}

