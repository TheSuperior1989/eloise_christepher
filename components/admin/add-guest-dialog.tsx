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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createGuest } from "@/app/admin/actions"
import { toast } from "sonner"

interface AddGuestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGuestAdded: (guest: Guest) => void
}

export function AddGuestDialog({ open, onOpenChange, onGuestAdded }: AddGuestDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relationToBride: "",
    relationToGroom: "",
    plusOne: false,
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const guest = await createGuest({
        ...formData,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        relationToBride: formData.relationToBride || undefined,
        relationToGroom: formData.relationToGroom || undefined,
        notes: formData.notes || undefined,
      })

      onGuestAdded(guest)
      toast.success("Guest added successfully")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationToBride: "",
        relationToGroom: "",
        plusOne: false,
        notes: "",
      })
    } catch (error) {
      toast.error("Failed to add guest")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-[#3D3630]">
            Add New Guest
          </DialogTitle>
          <DialogDescription>
            Add a new guest to your wedding invitation list
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
                placeholder="e.g., Friend, Cousin"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationToGroom">Relation to Groom</Label>
              <Input
                id="relationToGroom"
                value={formData.relationToGroom}
                onChange={(e) => setFormData({ ...formData, relationToGroom: e.target.value })}
                placeholder="e.g., Colleague, Brother"
                disabled={loading}
              />
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

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about this guest..."
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
              {loading ? "Adding..." : "Add Guest"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

