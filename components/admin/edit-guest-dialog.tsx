"use client"

import { useState } from "react"
import { Guest, InvitationStatus, RsvpStatus } from "@prisma/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateGuest } from "@/app/admin/actions"
import { toast } from "sonner"

interface EditGuestDialogProps {
  guest: Guest
  open: boolean
  onOpenChange: (open: boolean) => void
  onGuestUpdated: (guest: Guest) => void
}

export function EditGuestDialog({
  guest,
  open,
  onOpenChange,
  onGuestUpdated,
}: EditGuestDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: guest.firstName,
    lastName: guest.lastName,
    email: guest.email || "",
    phone: guest.phone || "",
    relationToBride: guest.relationToBride || "",
    relationToGroom: guest.relationToGroom || "",
    plusOne: guest.plusOne,
    plusOneName: guest.plusOneName || "",
    dietaryRestrictions: guest.dietaryRestrictions || "",
    notes: guest.notes || "",
    invitationStatus: guest.invitationStatus,
    rsvpStatus: guest.rsvpStatus,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedGuest = await updateGuest(guest.id, {
        ...formData,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        relationToBride: formData.relationToBride || undefined,
        relationToGroom: formData.relationToGroom || undefined,
        plusOneName: formData.plusOneName || undefined,
        dietaryRestrictions: formData.dietaryRestrictions || undefined,
        notes: formData.notes || undefined,
      })

      onGuestUpdated(updatedGuest)
      toast.success("Guest updated successfully")
    } catch (error) {
      console.error("Error updating guest:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to update guest"
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#3D3630]">
            Edit Guest
          </DialogTitle>
          <DialogDescription>
            Update guest information and status
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="relationToBride">Relation to Bride</Label>
              <Input
                id="relationToBride"
                value={formData.relationToBride}
                onChange={(e) => setFormData({ ...formData, relationToBride: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationToGroom">Relation to Groom</Label>
              <Input
                id="relationToGroom"
                value={formData.relationToGroom}
                onChange={(e) => setFormData({ ...formData, relationToGroom: e.target.value })}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invitationStatus">Invitation Status</Label>
              <Select
                value={formData.invitationStatus}
                onValueChange={(value) =>
                  setFormData({ ...formData, invitationStatus: value as InvitationStatus })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NOT_SENT">Not Sent</SelectItem>
                  <SelectItem value="SENT">Sent</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="OPENED">Opened</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rsvpStatus">RSVP Status</Label>
              <Select
                value={formData.rsvpStatus}
                onValueChange={(value) =>
                  setFormData({ ...formData, rsvpStatus: value as RsvpStatus })
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="ATTENDING">Attending</SelectItem>
                  <SelectItem value="NOT_ATTENDING">Not Attending</SelectItem>
                  <SelectItem value="MAYBE">Maybe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="plusOne"
              checked={formData.plusOne}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, plusOne: checked as boolean })
              }
              disabled={loading}
            />
            <Label htmlFor="plusOne" className="cursor-pointer">
              Allow Plus One
            </Label>
          </div>

          {formData.plusOne && (
            <div className="space-y-2">
              <Label htmlFor="plusOneName">Plus One Name</Label>
              <Input
                id="plusOneName"
                value={formData.plusOneName}
                onChange={(e) => setFormData({ ...formData, plusOneName: e.target.value })}
                placeholder="Name of plus one guest"
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
            <Input
              id="dietaryRestrictions"
              value={formData.dietaryRestrictions}
              onChange={(e) =>
                setFormData({ ...formData, dietaryRestrictions: e.target.value })
              }
              placeholder="e.g., Vegetarian, Gluten-free"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#C4A57B] hover:bg-[#B39568] text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

