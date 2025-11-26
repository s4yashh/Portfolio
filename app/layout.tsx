import type React from "react"
import type { Metadata } from "next"
import { Inter, Roboto_Mono, Playfair_Display, Dancing_Script, Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PreloaderWrapper from "@/components/preloader-wrapper"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono", weight: ["400", "700"] })
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700"] })
const dancingScript = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing-script", weight: ["700"] })
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", weight: ["300", "400", "600", "700"] })

export const metadata: Metadata = {
  title: "Suyash Singh - Developer",
  description:
    "Portfolio of Suyash Singh, a developer specializing in web technologies. Explore my projects, skills, and experience.",
  icons: {
    icon: "/LOGO.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${robotoMono.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${nunito.variable}`}>
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <PreloaderWrapper>
            <SmoothScroll>
              <div className="page-content">
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
