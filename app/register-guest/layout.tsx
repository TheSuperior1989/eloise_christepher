import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guest Registration",
  description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/register-guest",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
    siteName: "Eloise & Christepher's Wedding",
    images: [
      {
        url: "/assets/guest-registration-boho.jpg",
        width: 1200,
        height: 630,
        alt: "Eloise & Christepher - Wedding Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, South Africa for our wedding celebration",
    images: ["/assets/guest-registration-boho.jpg"],
  },
}

export default function RegisterGuestLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <>{children}</>
}

