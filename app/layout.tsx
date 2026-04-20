import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SecurityGuard } from "@/components/security-guard"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayoutElements } from "@/components/dashboard-layout-elements"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
    startupImage: [
      { url: "/logobase-dark.jpg" }
    ],
  },
  icons: {
    icon: [
      { media: "(prefers-color-scheme: light)", url: "/fav.ico", href: "/fav.ico" },
      { media: "(prefers-color-scheme: dark)", url: "/fav-dark.ico", href: "/fav-dark.ico" },
    ],
    shortcut: "/fav.ico",
    apple: "/logobase-dark.jpg",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "max-h-auto bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <SecurityGuard />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1 w-full justify-center items-center pt-16">
                {children}
              </div>
            </div>
            
            <DashboardLayoutElements />
            
            <SiteFooter className=" fixed border-t bottom-0 inset-x-0 sm:static" />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}

