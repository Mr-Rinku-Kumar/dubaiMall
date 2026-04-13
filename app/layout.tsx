import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/nav/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dubai Mall Sales Deck',
  description: 'Interactive sales deck for Dubai Mall',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}