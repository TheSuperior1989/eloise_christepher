import type React from "react"
import type { Metadata } from "next"
import { Crimson_Text, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: {
    default: "Eloise & Christepher - April 4, 2026",
    template: "%s | Eloise & Christepher",
  },
  description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for the wedding celebration of Eloise and Christepher on April 4, 2026",
  keywords: ["wedding", "Kwalata Game Lodge", "Dinokeng", "South Africa", "April 2026", "Eloise", "Christepher"],
  authors: [{ name: "Eloise & Christepher" }],
  creator: "Eloise & Christepher",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eloise-and-christopher.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, Dinokeng Game Reserve, South Africa for our wedding celebration on April 4, 2026",
    siteName: "Eloise & Christepher's Wedding",
    images: [
      {
        url: "/assets/our_engagement.jpg",
        width: 1200,
        height: 630,
        alt: "Eloise & Christepher",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eloise & Christepher - April 4, 2026",
    description: "Join us at Kwalata Game Lodge, South Africa for our wedding celebration",
    images: ["/assets/our_engagement.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${crimsonText.variable} ${playfairDisplay.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
