import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guest Registration",
  description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
  metadataBase: new URL('https://eloise-christepher.vercel.app'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eloise-christepher.vercel.app/register-guest",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
    siteName: "Eloise & Christepher's Wedding",
    images: [
      {
        url: "/assets/eloise_christepher.jpg",
        width: 1200,
        height: 630,
        alt: "Eloise & Christepher - Wedding Registration",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, South Africa for our wedding celebration",
    images: ["/assets/eloise_christepher.jpg"],
  },
}

export default function RegisterGuestLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <>{children}</>
}

