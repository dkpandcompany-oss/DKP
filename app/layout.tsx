import type React from "react"
import type { Metadata } from "next"
import { Figtree, Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { LayoutContent } from "@/components/LayoutContent"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "DPK & company",
  description: "Strategic solutions for operational clarity, financial strength, and business growth.",
  icons: {
    icon: "/images/logo.jpeg",
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${figtree.variable} ${geistMono.variable} antialiased`}>
        <div className="pb-10">
          <LayoutContent>{children}</LayoutContent>
        <Analytics />
        </div>
      </body>
    </html>
  )
}
