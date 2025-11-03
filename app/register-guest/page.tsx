"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Plus, Trash2 } from "lucide-react"

interface GuestFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  relationToBride: string
  relationToGroom: string
  dietaryRestrictions: string
}

export default function RegisterGuestPage(): JSX.Element {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [guests, setGuests] = useState<GuestFormData[]>([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      relationToBride: "",
      relationToGroom: "",
      dietaryRestrictions: "",
    },
  ])

  const addGuest = (): void => {
    setGuests([
      ...guests,
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        relationToBride: "",
        relationToGroom: "",
        dietaryRestrictions: "",
      },
    ])
  }

  const removeGuest = (index: number): void => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index))
    }
  }

  const updateGuest = (index: number, field: keyof GuestFormData, value: string): void => {
    const newGuests = [...guests]
    newGuests[index][field] = value
    setGuests(newGuests)
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate that at least the first guest has required fields
      if (!guests[0].firstName || !guests[0].lastName) {
        toast.error("Please fill in at least first and last name for the primary guest")
        setLoading(false)
        return
      }

      const response = await fetch("/api/register-guest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ guests }),
      })

      if (!response.ok) {
        throw new Error("Failed to register guests")
      }

      const data = await response.json()
      
      // Redirect to thank you page
      router.push(`/register-guest/thank-you?count=${data.count}`)
    } catch (error) {
      toast.error("Failed to register. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-[#C4A57B]" fill="#C4A57B" />
          </div>
          <h1 className="text-4xl font-serif text-[#3D3630] mb-2">
            Eloise & Christepher
          </h1>
          <p className="text-lg text-[#6B6560]">
            We&apos;d love to have you at our wedding!
          </p>
        </div>

        <Card className="border-[#C4A57B]/20">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-[#3D3630]">
              Guest Registration
            </CardTitle>
            <CardDescription>
              Please fill in your details below. You can add multiple guests if you&apos;re bringing a +1 or family members.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {guests.map((guest, index) => (
                <div
                  key={index}
                  className="p-6 border border-[#C4A57B]/20 rounded-lg bg-white space-y-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-[#3D3630]">
                      {index === 0 ? "Primary Guest" : `Guest ${index + 1}`}
                    </h3>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuest(index)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`firstName-${index}`}>
                        First Name {index === 0 && "*"}
                      </Label>
                      <Input
                        id={`firstName-${index}`}
                        value={guest.firstName}
                        onChange={(e) => updateGuest(index, "firstName", e.target.value)}
                        required={index === 0}
                        disabled={loading}
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`lastName-${index}`}>
                        Last Name {index === 0 && "*"}
                      </Label>
                      <Input
                        id={`lastName-${index}`}
                        value={guest.lastName}
                        onChange={(e) => updateGuest(index, "lastName", e.target.value)}
                        required={index === 0}
                        disabled={loading}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        value={guest.email}
                        onChange={(e) => updateGuest(index, "email", e.target.value)}
                        disabled={loading}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${index}`}>Phone</Label>
                      <Input
                        id={`phone-${index}`}
                        type="tel"
                        value={guest.phone}
                        onChange={(e) => updateGuest(index, "phone", e.target.value)}
                        disabled={loading}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`relationToBride-${index}`}>Relation to Bride</Label>
                      <Input
                        id={`relationToBride-${index}`}
                        value={guest.relationToBride}
                        onChange={(e) => updateGuest(index, "relationToBride", e.target.value)}
                        disabled={loading}
                        placeholder="e.g., Friend, Cousin"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`relationToGroom-${index}`}>Relation to Groom</Label>
                      <Input
                        id={`relationToGroom-${index}`}
                        value={guest.relationToGroom}
                        onChange={(e) => updateGuest(index, "relationToGroom", e.target.value)}
                        disabled={loading}
                        placeholder="e.g., Colleague, Brother"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dietaryRestrictions-${index}`}>Dietary Restrictions</Label>
                    <Input
                      id={`dietaryRestrictions-${index}`}
                      value={guest.dietaryRestrictions}
                      onChange={(e) => updateGuest(index, "dietaryRestrictions", e.target.value)}
                      disabled={loading}
                      placeholder="e.g., Vegetarian, Gluten-free, None"
                    />
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addGuest}
                disabled={loading}
                className="w-full border-[#C4A57B] text-[#C4A57B] hover:bg-[#C4A57B]/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Guest (+1)
              </Button>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#C4A57B] hover:bg-[#B39568] text-white"
                  disabled={loading}
                >
                  {loading ? "Registering..." : `Register ${guests.length} Guest${guests.length > 1 ? "s" : ""}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

