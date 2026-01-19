import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface WeddingInvitationEmailProps {
  guestName: string
  rsvpUrl: string
  invitationUrl?: string
}

export default function WeddingInvitationEmail({
  guestName = "Guest",
  rsvpUrl = "https://example.com/rsvp/token",
  invitationUrl,
}: WeddingInvitationEmailProps) {
  const viewInvitationUrl = invitationUrl || rsvpUrl
  return (
    <Html>
      <Head />
      <Preview>You're Invited to Eloise & Christepher's Wedding</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Envelope Animation */}
          <Section style={envelopeSection}>
            <div style={envelope}>
              <div style={envelopeFlap}></div>
              <div style={envelopeBody}></div>
            </div>
          </Section>

          {/* Invitation Card */}
          <Section style={invitationCard}>
            {/* Decorative Border */}
            <div style={decorativeBorder}>
              {/* Header */}
              <Section style={header}>
                <Text style={togetherWith}>Together with their families</Text>
                <Heading style={coupleNames}>
                  Eloise & Christepher
                </Heading>
                <Text style={inviteText}>
                  request the pleasure of your company
                </Text>
                <Text style={inviteText}>at the celebration of their marriage</Text>
              </Section>

              {/* Divider */}
              <div style={divider}></div>

              {/* Event Details */}
              <Section style={details}>
                <Text style={detailLabel}>Date</Text>
                <Text style={detailValue}>Saturday, April 4, 2026</Text>

                <Text style={detailLabel}>Time</Text>
                <Text style={detailValue}>4:00 PM</Text>

                <Text style={detailLabel}>Venue</Text>
                <Text style={detailValue}>Kwalata Game Lodge</Text>
                <Text style={detailSubValue}>Dinokeng Game Reserve</Text>
                <Text style={detailSubValue}>South Africa</Text>
              </Section>

              {/* Divider */}
              <div style={divider}></div>

              {/* Personal Message */}
              <Section style={messageSection}>
                <Text style={personalMessage}>
                  Dear {guestName},
                </Text>
                <Text style={messageText}>
                  We would be honored to have you join us on our special day as we begin our journey together as husband and wife.
                </Text>
                <Text style={messageText}>
                  Your presence would mean the world to us as we celebrate this joyous occasion surrounded by our loved ones.
                </Text>
              </Section>

              {/* View Invitation Button */}
              <Section style={rsvpSection}>
                <Link href={viewInvitationUrl} style={rsvpButton}>
                  View Your Invitation & RSVP
                </Link>
                <Text style={rsvpDeadline}>
                  Please respond by March 1, 2026
                </Text>
              </Section>

              {/* Divider */}
              <div style={divider}></div>

              {/* Wedding Website Section - Prominent */}
              <Section style={websiteSection}>
                <Text style={websiteHeading}>
                  📱 Visit Our Wedding Website
                </Text>
                <Text style={websiteDescription}>
                  Find all the details about our special day including venue information, schedule, accommodation, and more!
                </Text>
                <Link href="https://eloise-christepher.vercel.app" style={websiteButton}>
                  Visit Wedding Website
                </Link>
              </Section>

              {/* Footer */}
              <Section style={footer}>
                <Text style={footerText}>
                  We can't wait to celebrate with you!
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
  fontFamily: "'Georgia', 'Times New Roman', serif",
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
}

const envelopeSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const envelope = {
  position: "relative" as const,
  width: "200px",
  height: "120px",
  margin: "0 auto",
}

const envelopeFlap = {
  position: "absolute" as const,
  top: "0",
  left: "0",
  width: "0",
  height: "0",
  borderLeft: "100px solid transparent",
  borderRight: "100px solid transparent",
  borderTop: "60px solid #C4A57B",
  transformOrigin: "top",
}

const envelopeBody = {
  position: "absolute" as const,
  bottom: "0",
  left: "0",
  width: "200px",
  height: "80px",
  backgroundColor: "#E8E3DB",
  borderRadius: "0 0 4px 4px",
}

const invitationCard = {
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
}

const decorativeBorder = {
  border: "2px solid #C4A57B",
  borderRadius: "6px",
  margin: "20px",
  padding: "40px 30px",
}

const header = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const togetherWith = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "0 0 10px 0",
  fontStyle: "italic",
}

const coupleNames = {
  fontSize: "36px",
  fontWeight: "400",
  color: "#3D3630",
  margin: "10px 0",
  fontFamily: "'Playfair Display', Georgia, serif",
}

const inviteText = {
  fontSize: "16px",
  color: "#7A6F5D",
  margin: "5px 0",
}

const divider = {
  height: "1px",
  backgroundColor: "#E8E3DB",
  margin: "30px 0",
}

const details = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const detailLabel = {
  fontSize: "12px",
  color: "#C4A57B",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "20px 0 5px 0",
  fontWeight: "600",
}

const detailValue = {
  fontSize: "18px",
  color: "#3D3630",
  margin: "5px 0",
  fontWeight: "500",
}

const detailSubValue = {
  fontSize: "16px",
  color: "#7A6F5D",
  margin: "2px 0",
}

const messageSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const personalMessage = {
  fontSize: "18px",
  color: "#3D3630",
  margin: "0 0 15px 0",
  fontWeight: "500",
}

const messageText = {
  fontSize: "16px",
  color: "#7A6F5D",
  lineHeight: "1.6",
  margin: "10px 0",
}

const rsvpSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
}

const rsvpButton = {
  display: "inline-block",
  backgroundColor: "#C4A57B",
  color: "#FFFFFF",
  padding: "14px 40px",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
}

const rsvpDeadline = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "15px 0 0 0",
  fontStyle: "italic",
}

const footer = {
  textAlign: "center" as const,
}

const footerText = {
  fontSize: "16px",
  color: "#7A6F5D",
  margin: "10px 0",
}

const footerSignature = {
  fontSize: "18px",
  color: "#3D3630",
  margin: "15px 0 0 0",
  fontStyle: "italic",
  fontFamily: "'Brush Script MT', cursive",
}

const websiteSection = {
  textAlign: "center" as const,
  padding: "25px 20px",
  backgroundColor: "#F5F2ED",
  borderRadius: "8px",
  margin: "20px 0",
}

const websiteHeading = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#3D3630",
  margin: "0 0 10px 0",
}

const websiteDescription = {
  fontSize: "15px",
  color: "#7A6F5D",
  margin: "0 0 20px 0",
  lineHeight: "1.5",
}

const websiteButton = {
  display: "inline-block",
  backgroundColor: "#3D3630",
  color: "#FFFFFF",
  padding: "14px 40px",
  borderRadius: "4px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
}

const additionalInfo = {
  textAlign: "center" as const,
  marginTop: "30px",
}

const infoText = {
  fontSize: "14px",
  color: "#7A6F5D",
  margin: "5px 0",
}

const websiteLink = {
  fontSize: "14px",
  color: "#C4A57B",
  textDecoration: "none",
  fontWeight: "500",
}

