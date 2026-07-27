import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Dancing_Script, Space_Grotesk, VT323 } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PreloaderWrapper from "@/components/preloader-wrapper"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })
const vt323 = VT323({ subsets: ["latin"], variable: "--font-vt323" })

export const metadata: Metadata = {
  title: "Suyash Singh - Developer",
  description:
    "Portfolio of Suyash Singh, a developer specializing in web technologies. Explore my projects, skills, and experience.",
  icons: {
    icon: "/LOGO.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${spaceGrotesk.variable} ${vt323.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PreloaderWrapper>
            <SmoothScroll>
              <div className="page-content min-h-screen">
                {children}
              </div>
            </SmoothScroll>
            {/* Header placed outside SmoothScroll to ensure fixed positioning works */}
            <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999, pointerEvents: 'none' }}>
              {/* Header will be rendered from page.tsx and injected here via portal */}
            </div>
          </PreloaderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
