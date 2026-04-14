import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import ClientWrapper from '@/components/ClientWrapper'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Better font loading
  preload: true,
  variable: '--font-inter', // CSS variable for custom styling
})

export const metadata = {
  title: 'Dubai Mall | The World\'s Most Visited Destination',
  description: 'Interactive sales deck for Dubai Mall - 100M+ annual visitors, 1,200+ stores, global retail destination',
  keywords: 'Dubai Mall, retail leasing, sponsorship, events, luxury shopping, entertainment',
  authors: [{ name: 'Dubai Mall Sales Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#000000',
  colorScheme: 'dark',
  openGraph: {
    title: 'Dubai Mall | The World\'s Most Visited Destination',
    description: 'Interactive sales deck for Dubai Mall - 100M+ annual visitors',
    type: 'website',
    siteName: 'Dubai Mall Sales Deck',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Dubai Mall',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Mall | The World\'s Most Visited Destination',
    description: 'Interactive sales deck for Dubai Mall',
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`} suppressHydrationWarning>
        <Navbar />
        <main className="relative min-h-screen">
          {children}
        </main>
        
        {/* Client-side only components */}
        <ClientWrapper />
      </body>
    </html>
  )
}