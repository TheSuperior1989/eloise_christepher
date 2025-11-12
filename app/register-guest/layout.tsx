import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Guest Registration",
  description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eloise-christepher.vercel.app/register-guest",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
    siteName: "Eloise & Christepher's Wedding",
    images: [
      {
        url: "https://eloise-christepher.vercel.app/assets/eloise_christepher.jpg",
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
    images: ["https://eloise-christepher.vercel.app/assets/eloise_christepher.jpg"],
  },
  other: {
    "fb:app_id": "1234567890", // Optional: You can create a Facebook App ID if needed
  },
}

export default function RegisterGuestLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return <>{children}</>
}

