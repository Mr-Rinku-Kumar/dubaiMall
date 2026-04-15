import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import ClientWrapper from '@/components/ClientWrapper'
import type { Metadata, Viewport } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Dubai Mall | The World\'s Most Visited Destination',
  description: 'Interactive sales deck for Dubai Mall - 100M+ annual visitors',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`} suppressHydrationWarning>
        <Navbar />
        <main className="relative min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
        <ClientWrapper />
      </body>
    </html>
  )
}