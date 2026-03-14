import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ScheduleUpdateEmailProps {
  guestName: string
  websiteUrl?: string
  daysUntilWedding?: number
}

export default function ScheduleUpdateEmail({
  guestName = "Guest",
  websiteUrl = "https://eloiseandchriste.pher",
  daysUntilWedding,
}: ScheduleUpdateEmailProps) {
  const weddingDate = new Date("2026-04-04T15:30:00")
  const now = new Date()
  const msLeft = weddingDate.getTime() - now.getTime()
  const days = daysUntilWedding ?? Math.max(0, Math.floor(msLeft / (1000 * 60 * 60 * 24)))

  return (
    <Html>
      <Head />
      <Preview>📅 Important Schedule Update — Eloise & Christepher's Wedding</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <div style={decorativeBorder}>

              {/* Header */}
              <Section style={header}>
                <Text style={badge}>📅 Schedule Update</Text>
                <Heading style={coupleNames}>Eloise & Christepher</Heading>
                <Text style={weddingDateText}>Saturday, April 4, 2026</Text>
                <Text style={venueLine}>Kwalata Game Lodge • Dinokeng Game Reserve</Text>
              </Section>

              <div style={divider} />

              {/* Hype / Countdown */}
              <Section style={hyeSection}>
                <Text style={hyeHeading}>
                  {days > 0
                    ? `Only ${days} day${days === 1 ? "" : "s"} to go! 🎉`
                    : "The big day is here! 🎉"}
                </Text>
                <Text style={bodyText}>
                  Dear {guestName},
                </Text>
                <Text style={bodyText}>
                  We are absolutely overflowing with excitement as our wedding day draws closer{days > 0 ? ` — just <strong>${days} days</strong> away` : ""}! We cannot wait to celebrate this incredible milestone with the people we love most, and that means <em>you</em>.
                </Text>
                <Text style={bodyText}>
                  We want to make sure everything runs perfectly on the day, so we are reaching out with one small but important update to the arrival schedule.
                </Text>
              </Section>

              <div style={divider} />

              {/* Schedule Change */}
              <Section style={updateSection}>
                <Text style={updateHeading}>⏰ Updated Arrival Time</Text>

                <div style={changeBox}>
                  <Text style={changeLabel}>UPDATED</Text>
                  <Text style={changeMain}>
                    Please arrive at the lodge by{" "}
                    <span style={highlight}>14:30 (2:30 PM)</span>
                  </Text>
                  <Text style={changeDetail}>
                    Shuttles to the ceremony area will be departing at{" "}
                    <strong>15:00 (3:00 PM)</strong> sharp — we would hate for anyone to miss the ride!
                  </Text>
                </div>

                <Text style={bodyText}>
                  Arriving by <strong>2:30 PM</strong> will give you plenty of time to freshen up, find your bearings, and be ready when the shuttles leave at <strong>3:00 PM</strong>. The ceremony will begin shortly after — and trust us, you do not want to miss a single moment.
                </Text>
              </Section>

              <div style={divider} />

              {/* CTA */}
              <Section style={ctaSection}>
                <Text style={ctaText}>
                  View the full updated schedule on our wedding website:
                </Text>
                <Link href={`${websiteUrl}/#schedule`} style={ctaButton}>
                  View Full Schedule
                </Link>
              </Section>

              <div style={divider} />

              {/* Footer */}
              <Section style={footer}>
                <Text style={footerText}>
                  We are counting down the days and cannot wait to see your beautiful faces. April 4th is going to be a day none of us will ever forget. 💛
                </Text>
                <Text style={signature}>
                  With all our love,
                  <br />
                  <em>Eloise & Christepher</em>
                </Text>
                <Text style={footerMeta}>
                  Kwalata Game Lodge, Dinokeng Game Reserve, South Africa
                </Text>
              </Section>

            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const main = {
  backgroundColor: "#FAF8F5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: "40px 20px",
}

const container = {
  maxWidth: "600px",
  margin: "0 auto",
}

const card = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  overflow: "hidden",
}

const decorativeBorder = {
  border: "8px solid #C4A57B",
  padding: "40px 32px",
}

const header = {
  textAlign: "center" as const,
  marginBottom: "8px",
}

const badge = {
  display: "inline-block",
  backgroundColor: "#FFF3E0",
  color: "#C4A57B",
  padding: "8px 18px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "600" as const,
  marginBottom: "16px",
  letterSpacing: "0.5px",
}

const coupleNames = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "38px",
  fontWeight: "700" as const,
  color: "#3D3630",
  margin: "8px 0",
  lineHeight: "1.2",
}

const weddingDateText = {
  fontSize: "16px",
  color: "#C4A57B",
  fontWeight: "600" as const,
  margin: "6px 0 2px",
}

const venueLine = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "0 0 8px",
}

const divider = {
  height: "1px",
  backgroundColor: "#E8E3DB",
  margin: "28px 0",
}

const hyeSection = {
  marginBottom: "4px",
}

const hyeHeading = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "26px",
  fontWeight: "700" as const,
  color: "#C4A57B",
  textAlign: "center" as const,
  margin: "0 0 20px",
}

const bodyText = {
  fontSize: "16px",
  color: "#5C5347",
  lineHeight: "1.7",
  margin: "0 0 14px",
}

const updateSection = {
  marginBottom: "4px",
}

const updateHeading = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "20px",
  fontWeight: "700" as const,
  color: "#3D3630",
  margin: "0 0 16px",
}

const changeBox = {
  backgroundColor: "#FFF8F0",
  border: "1px solid #C4A57B",
  borderLeft: "4px solid #C4A57B",
  borderRadius: "8px",
  padding: "20px 24px",
  marginBottom: "20px",
}

const changeLabel = {
  fontSize: "11px",
  fontWeight: "700" as const,
  color: "#C4A57B",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  margin: "0 0 8px",
}

const changeMain = {
  fontSize: "18px",
  fontWeight: "600" as const,
  color: "#3D3630",
  margin: "0 0 10px",
}

const highlight = {
  color: "#C4A57B",
  fontWeight: "700" as const,
}

const changeDetail = {
  fontSize: "15px",
  color: "#5C5347",
  lineHeight: "1.6",
  margin: "0",
}

const ctaSection = {
  textAlign: "center" as const,
  margin: "8px 0",
}

const ctaText = {
  fontSize: "15px",
  color: "#7A6F5D",
  margin: "0 0 16px",
}

const ctaButton = {
  display: "inline-block",
  backgroundColor: "#C4A57B",
  color: "#FFFFFF",
  padding: "14px 36px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600" as const,
  boxShadow: "0 2px 6px rgba(196,165,123,0.35)",
}

const footer = {
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "15px",
  color: "#5C5347",
  lineHeight: "1.7",
  margin: "0 0 20px",
}

const signature = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "20px",
  color: "#3D3630",
  margin: "0 0 20px",
  lineHeight: "1.6",
}

const footerMeta = {
  fontSize: "12px",
  color: "#A89880",
  margin: "0",
  letterSpacing: "0.3px",
}
