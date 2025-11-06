import { Gift, Heart, Plane } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RegistrySection() {
  return (
    <section id="registry" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Gift size={48} className="text-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Registry</h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8" />
          <p className="text-lg text-muted-foreground leading-relaxed font-serif max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all! However, if you wish to honor us with a gift,
            we would be grateful for a contribution to our honeymoon fund.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Traditional Registry */}
          <Card className="border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-6 h-6 text-accent" />
                <CardTitle className="font-serif text-2xl text-foreground">Traditional Registry</CardTitle>
              </div>
              <CardDescription className="font-serif">
                For those who prefer traditional gifts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-serif text-sm leading-relaxed">
                Your presence is enough of a present to us! But for those of you who are stubborn, we've put together a
                wish-list to help you out.
              </p>
            </CardContent>
          </Card>

          {/* Honeymoon Fund */}
          <Card className="border-accent/20 hover:border-accent/40 transition-colors bg-gradient-to-br from-background to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Plane className="w-6 h-6 text-accent" />
                <CardTitle className="font-serif text-2xl text-foreground">Honeymoon Fund</CardTitle>
              </div>
              <CardDescription className="font-serif">
                Help us create unforgettable memories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-serif text-sm leading-relaxed">
                As we've already built our home together, we would be honored if you'd consider contributing to our honeymoon adventure.
                Your gift will help us create beautiful memories as we begin this new chapter of our lives.
              </p>

              <div className="bg-white/50 p-4 rounded-lg border border-accent/20">
                <h4 className="font-serif font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  Banking Details
                </h4>
                <div className="space-y-2 text-sm font-serif text-muted-foreground">
                  <p><span className="font-semibold text-foreground">Bank:</span> [Bank Name - To Be Added]</p>
                  <p><span className="font-semibold text-foreground">Account Name:</span> [Account Name - To Be Added]</p>
                  <p><span className="font-semibold text-foreground">Account Number:</span> [Account Number - To Be Added]</p>
                  <p><span className="font-semibold text-foreground">Branch Code:</span> [Branch Code - To Be Added]</p>
                  <p className="text-xs italic mt-3">Please use your name as reference</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
