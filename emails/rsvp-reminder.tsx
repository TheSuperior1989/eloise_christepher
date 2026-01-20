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

interface RsvpReminderEmailProps {
  guestName: string
  rsvpUrl: string
  invitationUrl?: string
}

export default function RsvpReminderEmail({
  guestName = "Guest",
  rsvpUrl = "https://example.com/rsvp/token",
  invitationUrl,
}: RsvpReminderEmailProps) {
  const viewInvitationUrl = invitationUrl || rsvpUrl
  return (
    <Html>
      <Head />
      <Preview>Friendly Reminder: Please RSVP for Eloise & Christepher's Wedding</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Reminder Card */}
          <Section style={reminderCard}>
            {/* Decorative Border */}
            <div style={decorativeBorder}>
              {/* Header */}
              <Section style={header}>
                <Text style={reminderBadge}>⏰ Friendly Reminder</Text>
                <Heading style={coupleNames}>
                  Eloise & Christepher
                </Heading>
                <Text style={weddingDate}>
                  April 4, 2026 • Kwalata Game Lodge
                </Text>
              </Section>

              {/* Divider */}
              <div style={divider}></div>

              {/* Personal Message */}
              <Section style={messageSection}>
                <Text style={personalMessage}>
                  Dear {guestName},
                </Text>
                <Text style={messageText}>
                  We hope this message finds you well! We wanted to send a friendly reminder that we haven't received your RSVP yet for our wedding celebration.
                </Text>
                <Text style={messageText}>
                  Your presence would mean the world to us, and we'd love to know if you'll be able to join us on our special day.
                </Text>
                <Text style={urgentText}>
                  <strong>Please respond by March 1, 2026</strong> so we can finalize our arrangements with the venue and caterers.
                </Text>
              </Section>

              {/* RSVP Button */}
              <Section style={rsvpSection}>
                <Link href={rsvpUrl} style={rsvpButton}>
                  RSVP Now
                </Link>
                <Text style={rsvpSubtext}>
                  It only takes a minute!
                </Text>
              </Section>

              {/* Divider */}
              <div style={divider}></div>

              {/* View Invitation Link */}
              <Section style={linkSection}>
                <Text style={linkText}>
                  Need to review the invitation details?
                </Text>
                <Link href={viewInvitationUrl} style={linkButton}>
                  View Full Invitation
                </Link>
              </Section>

              {/* Footer */}
              <Section style={footer}>
                <Text style={footerText}>
                  Thank you for taking the time to respond!
                </Text>
                <Text style={footerSignature}>
                  With love,
                  <br />
                  Eloise & Christepher
                </Text>
              </Section>
            </div>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#FAF8F5",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: "40px 20px",
}

const container = {
  maxWidth: "600px",
  margin: "0 auto",
}

const reminderCard = {
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
}

const decorativeBorder = {
  border: "8px solid #C4A57B",
  padding: "40px 30px",
}

const header = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const reminderBadge = {
  display: "inline-block",
  backgroundColor: "#FFF3E0",
  color: "#C4A57B",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "20px",
}

const coupleNames = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "36px",
  fontWeight: "700",
  color: "#3D3630",
  margin: "10px 0",
  lineHeight: "1.2",
}

const weddingDate = {
  fontSize: "16px",
  color: "#7A6F5D",
  margin: "10px 0 0 0",
}

const divider = {
  height: "1px",
  backgroundColor: "#E8E3DB",
  margin: "30px 0",
}

const messageSection = {
  marginBottom: "30px",
}

const personalMessage = {
  fontSize: "18px",
  color: "#3D3630",
  fontWeight: "600",
  margin: "0 0 20px 0",
}

const messageText = {
  fontSize: "16px",
  color: "#5C5347",
  lineHeight: "1.6",
  margin: "0 0 15px 0",
}

const urgentText = {
  fontSize: "16px",
  color: "#C4A57B",
  lineHeight: "1.6",
  margin: "20px 0 0 0",
  padding: "15px",
  backgroundColor: "#FFF3E0",
  borderRadius: "8px",
  textAlign: "center" as const,
}

const rsvpSection = {
  textAlign: "center" as const,
  margin: "30px 0",
}

const rsvpButton = {
  display: "inline-block",
  backgroundColor: "#C4A57B",
  color: "#FFFFFF",
  padding: "16px 40px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "600",
  boxShadow: "0 2px 4px rgba(196, 165, 123, 0.3)",
}

const rsvpSubtext = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "10px 0 0 0",
}

const linkSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const linkText = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "0 0 10px 0",
}

const linkButton = {
  display: "inline-block",
  color: "#C4A57B",
  textDecoration: "underline",
  fontSize: "14px",
}

const footer = {
  textAlign: "center" as const,
  marginTop: "30px",
}

const footerText = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "0 0 15px 0",
}

const footerSignature = {
  fontFamily: '"Playfair Display", Georgia, serif',
  fontSize: "18px",
  color: "#3D3630",
  fontStyle: "italic",
  margin: "0",
}

