import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Great_Vibes } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
})

export const metadata: Metadata = {
  title: 'The Wedding of Dones & Wanda',
  description: 'Kami mengundang Anda untuk merayakan hari bahagia bersama kami.',
  openGraph: {
    title: 'The Wedding of Dones & Wanda',
    description: '3 — 4 Juli 2026 | Desa Gandung Baru',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jost.variable} ${greatVibes.variable}`}>
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
