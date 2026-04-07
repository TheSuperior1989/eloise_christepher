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

interface ReviewRequestEmailProps {
  guestName: string
  reviewUrl: string
}

export default function ReviewRequestEmail({
  guestName = "Guest",
  reviewUrl = "#",
}: ReviewRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Share your memories — Eloise & Christepher's Wedding Review</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={card}>
            <div style={decorativeBorder}>

              {/* Header */}
              <Section style={header}>
                <Text style={badge}>⭐ We'd love your feedback</Text>
                <Heading style={coupleNames}>Eloise & Christepher</Heading>
                <Text style={weddingDateText}>Saturday, April 4, 2026</Text>
                <Text style={venueLine}>Kwalata Game Lodge • Dinokeng Game Reserve</Text>
              </Section>

              <div style={divider} />

              {/* Body */}
              <Section style={bodySection}>
                <Text style={bodyText}>Dear {guestName},</Text>
                <Text style={bodyText}>
                  What an incredible day it was — we are still pinching ourselves! Thank you so much for sharing our wedding day with us. Having you there meant absolutely everything.
                </Text>
                <Text style={bodyText}>
                  As we settle into married life, we'd love to hear about your experience. Your honest feedback helps us cherish the memories and also helps other couples planning similar celebrations.
                </Text>
                <Text style={bodyText}>
                  It only takes a few minutes and means the world to us. 💛
                </Text>
              </Section>

              <div style={divider} />

              {/* CTA */}
              <Section style={ctaSection}>
                <Text style={ctaHeading}>Share your experience</Text>
                <Text style={ctaSubtext}>
                  Click the button below to leave your review. This link is personal to you and can only be used once.
                </Text>
                <Link href={reviewUrl} style={ctaButton}>
                  Leave Your Review
                </Link>
                <Text style={linkFallback}>
                  Or copy this link into your browser:{" "}
                  <Link href={reviewUrl} style={linkText}>
                    {reviewUrl}
                  </Link>
                </Text>
              </Section>

              <div style={divider} />

              {/* Footer */}
              <Section style={footer}>
                <Text style={footerText}>
                  From the bottom of our hearts — thank you for being part of our story. 💛
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
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: "40px 20px",
}

const container = { maxWidth: "600px", margin: "0 auto" }

const card = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  overflow: "hidden",
}

const decorativeBorder = { border: "8px solid #C4A57B", padding: "40px 32px" }

const header = { textAlign: "center" as const, marginBottom: "8px" }

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

const venueLine = { fontSize: "14px", color: "#7A6F5D", margin: "0 0 8px" }

const divider = { height: "1px", backgroundColor: "#E8E3DB", margin: "28px 0" }

const bodySection = { marginBottom: "4px" }

const bodyText = { fontSize: "16px", color: "#5C5347", lineHeight: "1.7", margin: "0 0 14px" }

const ctaSection = { textAlign: "center" as const, margin: "8px 0" }

const ctaHeading = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "22px",
  fontWeight: "700" as const,
  color: "#3D3630",
  margin: "0 0 12px",
}

const ctaSubtext = { fontSize: "15px", color: "#7A6F5D", margin: "0 0 20px" }

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

const linkFallback = { fontSize: "12px", color: "#A89880", margin: "16px 0 0" }

const linkText = { color: "#C4A57B", textDecoration: "underline" }

const footer = { textAlign: "center" as const }

const footerText = { fontSize: "15px", color: "#5C5347", lineHeight: "1.7", margin: "0 0 20px" }

const signature = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "20px",
  color: "#3D3630",
  margin: "0 0 20px",
  lineHeight: "1.6",
}

const footerMeta = { fontSize: "12px", color: "#A89880", margin: "0", letterSpacing: "0.3px" }
