# PRD: Website Undangan Pernikahan Modern
> **Format**: AI Agent Execution Plan  
> **Stack**: Next.js 14 (App Router) + Tailwind CSS + Framer Motion  
> **Deploy Target**: Vercel  
> **Bahasa**: TypeScript  

---

## 🎯 Ringkasan Proyek

Bangun website undangan pernikahan digital yang elegan dan modern, berbasis **Next.js 14 dengan App Router**, dapat dideploy langsung ke Vercel tanpa konfigurasi tambahan. Website ini berfungsi sebagai pengganti undangan fisik dengan fitur RSVP, countdown timer, dan galeri foto yang interaktif.

---

## 📁 Struktur Direktori yang Harus Dibuat

```
wedding-invitation/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── rsvp/
│           └── route.ts
├── components/
│   ├── Hero.tsx
│   ├── Countdown.tsx
│   ├── CoupleStory.tsx
│   ├── EventDetails.tsx
│   ├── Gallery.tsx
│   ├── RSVPForm.tsx
│   ├── GiftRegistry.tsx
│   ├── Footer.tsx
│   └── ui/
│       ├── AudioPlayer.tsx
│       └── FloralDecor.tsx
├── lib/
│   └── config.ts
├── public/
│   ├── images/
│   │   └── placeholder/
│   └── music/
├── package.json
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── vercel.json
```

---

## ⚙️ Langkah 1: Inisialisasi Proyek

```bash
npx create-next-app@latest wedding-invitation \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd wedding-invitation

npm install framer-motion lucide-react @radix-ui/react-dialog date-fns
npm install react-intersection-observer react-hot-toast
npm install -D @types/node
```

---

## ⚙️ Langkah 2: Konfigurasi File

### `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
```

### `vercel.json`
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### `tailwind.config.ts`
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF5EF',
        blush: '#E8C4B0',
        sage: '#A8B5A0',
        champagne: '#C9A96E',
        charcoal: '#2C2C2C',
        ivory: '#FFFFF0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-jost)', 'sans-serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        float: 'float 6s ease-in-out infinite',
        petal: 'petalFall 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## ⚙️ Langkah 3: Konfigurasi Data Pernikahan

### `lib/config.ts`
```ts
export const weddingConfig = {
  groom: {
    name: "Dones",
    fullName: "Dones Deska Purwanto",
    parentFather: "Bpk. Nasannudin",
    parentMother: "Ibu Sutrismi",
    photo: "/images/groom.jpg",
    instagram: "@donesdeska",
    childOrder: "Anak ke 2 dari 3 bersaudara",
  },
  bride: {
    name: "Wanda",
    fullName: "Wanda Putri Cantika, S.Pd",
    parentFather: "Bpk. Rohman (Alm.)",
    parentMother: "Ibu Suswati",
    photo: "/images/bride.jpg",
    instagram: "@wandaputri",
    childOrder: "Anak ke 4 dari 5 bersaudara",
  },
  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      date: "2025-03-15",
      time: "08:00 WIB",
      endTime: "10:00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 12, Bandar Lampung",
      mapsUrl: "https://maps.google.com/?q=-5.3971,105.2668",
      dresscode: "Putih & Sage",
    },
    {
      id: "resepsi",
      name: "Resepsi Pernikahan",
      date: "2025-03-15",
      time: "11:00 WIB",
      endTime: "14:00 WIB",
      venue: "Ballroom Grand Sahid Hotel",
      address: "Jl. Ahmad Yani No. 45, Bandar Lampung",
      mapsUrl: "https://maps.google.com/?q=-5.4100,105.2700",
      dresscode: "Sage & Gold",
    },
  ],
  weddingDate: "2025-03-15T08:00:00",
  story: [
    {
      year: "2019",
      title: "Pertemuan Pertama",
      description: "Kami pertama kali bertemu di sebuah seminar teknologi di Bandung. Satu senyuman yang mengubah segalanya.",
      emoji: "🌸",
    },
    {
      year: "2020",
      title: "Jatuh Cinta",
      description: "Pandemi membuat kami lebih sering berbicara lewat layar, dan dari sanalah cinta tumbuh perlahan namun pasti.",
      emoji: "💕",
    },
    {
      year: "2022",
      title: "Hubungan Resmi",
      description: "Dengan restu keluarga, kami resmi menjalani hubungan yang serius dan membangun mimpi bersama.",
      emoji: "💍",
    },
    {
      year: "2024",
      title: "Lamaran",
      description: "Di tepi pantai saat matahari terbenam, Dones berlutut dan bertanya pertanyaan yang paling indah.",
      emoji: "🌅",
    },
  ],
  gallery: [
    "/images/gallery/1.jpg",
    "/images/gallery/2.jpg",
    "/images/gallery/3.jpg",
    "/images/gallery/4.jpg",
    "/images/gallery/5.jpg",
    "/images/gallery/6.jpg",
  ],
  gifts: {
    enabled: true,
    bankAccounts: [
      { bank: "BRI", accountNumber: "562301041715534", accountName: "Wanda Putri Cantika" },
    ],
    address: "Jl. Melati No. 8, Rajabasa, Bandar Lampung 35144",
  },
  music: {
    enabled: true,
    src: "/music/wedding-song.mp3",
    title: "A Thousand Years",
    artist: "Christina Perri",
  },
  hashtag: "#DonesWanda2026",
  quote: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya. (QS. Ar-Rum: 21)",
}
```

---

## ⚙️ Langkah 4: Root Layout dengan Google Fonts

### `app/layout.tsx`
```tsx
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
      <body className="bg-cream text-charcoal overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
```

### `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-cream: #FAF5EF;
    --color-blush: #E8C4B0;
    --color-sage: #A8B5A0;
    --color-champagne: #C9A96E;
    --color-charcoal: #2C2C2C;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body antialiased;
    background-color: var(--color-cream);
  }

  ::selection {
    background-color: var(--color-blush);
    color: var(--color-charcoal);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-cream);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-blush);
    border-radius: 3px;
  }
}

@layer components {
  .section-title {
    @apply font-script text-5xl md:text-7xl text-champagne;
  }

  .section-subtitle {
    @apply font-display text-sm uppercase tracking-[0.3em] text-sage;
  }

  .divider-ornament {
    @apply flex items-center gap-4 my-6;
  }

  .divider-ornament::before,
  .divider-ornament::after {
    content: '';
    @apply flex-1 h-px bg-blush/60;
  }

  .glass-card {
    @apply bg-white/60 backdrop-blur-sm border border-blush/30 rounded-2xl;
  }
}
```

---

## ⚙️ Langkah 5: Halaman Utama

### `app/page.tsx`
```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import CoupleStory from '@/components/CoupleStory'
import EventDetails from '@/components/EventDetails'
import Gallery from '@/components/Gallery'
import RSVPForm from '@/components/RSVPForm'
import GiftRegistry from '@/components/GiftRegistry'
import Footer from '@/components/Footer'
import AudioPlayer from '@/components/ui/AudioPlayer'
import { weddingConfig } from '@/lib/config'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [guestName, setGuestName] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to') || params.get('name') || ''
    setGuestName(decodeURIComponent(name))
  }, [])

  return (
    <>
      {/* Cover / Landing Screen */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 50%, rgba(168,181,160,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 20%, rgba(232,196,176,0.2) 0%, transparent 60%)
              `
            }}
          >
            {/* Decorative corners */}
            <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-champagne/40" />
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-champagne/40" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-champagne/40" />
            <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-champagne/40" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center px-8 max-w-lg"
            >
              <p className="section-subtitle mb-6">Undangan Pernikahan</p>
              
              {guestName && (
                <p className="font-body text-sm text-charcoal/60 mb-2">
                  Kepada Yth. <span className="text-champagne font-medium">{guestName}</span>
                </p>
              )}

              <h1 className="font-script text-6xl md:text-8xl text-charcoal mb-2 leading-none">
                {weddingConfig.groom.name}
              </h1>
              <p className="font-display text-2xl text-sage mb-2">&</p>
              <h1 className="font-script text-6xl md:text-8xl text-charcoal mb-8 leading-none">
                {weddingConfig.bride.name}
              </h1>

              <p className="font-body text-sm text-charcoal/50 mb-10 tracking-widest uppercase">
                15 Maret 2025 · Bandar Lampung
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="group relative px-10 py-4 bg-champagne text-white font-body text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10">Buka Undangan</span>
                <div className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Hero />
            <Countdown />
            <CoupleStory />
            <EventDetails />
            <Gallery />
            <RSVPForm guestName={guestName} />
            <GiftRegistry />
            <Footer />
            <AudioPlayer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## ⚙️ Langkah 6: Komponen-Komponen

### `components/Hero.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { weddingConfig } from '@/lib/config'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20S-10 18.954-10 30s8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />

      <div className="relative z-10 text-center text-cream px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-xs uppercase tracking-[0.5em] text-blush mb-8"
        >
          — The Wedding of —
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-script text-7xl md:text-[10rem] leading-none text-cream">
            {weddingConfig.groom.name}
          </h1>
          <div className="divider-ornament my-4">
            <span className="font-display text-3xl text-champagne">&</span>
          </div>
          <h1 className="font-script text-7xl md:text-[10rem] leading-none text-cream">
            {weddingConfig.bride.name}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-sm tracking-[0.3em] text-blush mt-10 uppercase"
        >
          Sabtu, 15 Maret 2025 · Bandar Lampung
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-xs text-cream/40 mt-6 max-w-md mx-auto italic leading-relaxed"
        >
          "{weddingConfig.quote}"
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-blush" />
        <p className="font-body text-[10px] text-blush/60 uppercase tracking-widest">Scroll</p>
      </motion.div>
    </section>
  )
}
```

### `components/Countdown.tsx`
```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { weddingConfig } from '@/lib/config'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isPast, setIsPast] = useState(false)

  useEffect(() => {
    const calculate = () => {
      const target = new Date(weddingConfig.weddingDate).getTime()
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setIsPast(true)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ]

  return (
    <section className="py-24 px-6 bg-cream relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-script text-[20rem] text-blush/10 select-none whitespace-nowrap">
          countdown
        </span>
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-subtitle mb-4"
        >
          Menuju Hari Bahagia
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title mb-16"
        >
          {isPast ? 'Hari Bahagia Telah Tiba ✨' : 'Hitung Mundur'}
        </motion.h2>

        {!isPast && (
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="glass-card p-6 md:p-8 shadow-lg">
                  <span className="font-display text-4xl md:text-6xl font-light text-charcoal block">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="font-body text-xs text-sage uppercase tracking-widest mt-2 block">
                    {unit.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

### `components/CoupleStory.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import { weddingConfig } from '@/lib/config'

export default function CoupleStory() {
  return (
    <section className="py-24 px-6 bg-charcoal text-cream">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-xs uppercase tracking-[0.4em] text-sage mb-4"
          >
            — Mempelai —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-script text-5xl md:text-7xl text-champagne"
          >
            Pasangan Bahagia
          </motion.h2>
        </div>

        {/* Couple Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {[
            { person: weddingConfig.groom, label: 'Mempelai Pria' },
            { person: weddingConfig.bride, label: 'Mempelai Wanita' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              {/* Photo placeholder */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-sage/30 to-blush/30 border-2 border-champagne/30 flex items-center justify-center">
                  <span className="font-script text-5xl text-champagne/50">
                    {item.person.name[0]}
                  </span>
                </div>
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-full border border-champagne/20" />
              </div>

              <p className="font-body text-xs text-sage uppercase tracking-widest mb-2">{item.label}</p>
              <h3 className="font-script text-4xl text-cream mb-3">{item.person.name}</h3>
              <p className="font-display text-sm text-cream/60 mb-4">{item.person.fullName}</p>
              
              <div className="text-sm text-cream/50 space-y-1">
                <p>Putra/i dari</p>
                <p className="text-cream/80">{item.person.parentFather}</p>
                <p className="text-cream/80">& {item.person.parentMother}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Love Story Timeline */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle text-sage mb-4"
          >
            Perjalanan Cinta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-script text-5xl md:text-7xl text-champagne mb-16"
          >
            Kisah Kami
          </motion.h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-champagne/20 hidden md:block" />

          <div className="space-y-12">
            {weddingConfig.story.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass-card bg-white/5 border-white/10 p-6">
                    <span className="font-body text-xs text-champagne uppercase tracking-widest">{item.year}</span>
                    <h3 className="font-display text-xl text-cream mt-1 mb-2">{item.title}</h3>
                    <p className="font-body text-sm text-cream/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-12 h-12 bg-champagne/20 rounded-full items-center justify-center flex-shrink-0 border border-champagne/30 text-xl z-10">
                  {item.emoji}
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

### `components/EventDetails.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Shirt } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

export default function EventDetails() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Rangkaian Acara
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Detail Acara
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {weddingConfig.events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <span className="font-body text-xs text-sage uppercase tracking-widest">Acara {i + 1}</span>
                <h3 className="font-script text-3xl text-champagne mt-1">{event.name}</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Tanggal</p>
                    <p className="font-display text-sm text-charcoal">Sabtu, 15 Maret 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Waktu</p>
                    <p className="font-display text-sm text-charcoal">{event.time} – {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Lokasi</p>
                    <p className="font-display text-sm text-charcoal">{event.venue}</p>
                    <p className="font-body text-xs text-charcoal/50 mt-0.5">{event.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shirt className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Dresscode</p>
                    <p className="font-display text-sm text-charcoal">{event.dresscode}</p>
                  </div>
                </div>
              </div>

              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 border border-champagne text-champagne font-body text-xs uppercase tracking-widest hover:bg-champagne hover:text-white transition-all duration-300"
              >
                <MapPin className="w-3 h-3" />
                Lihat di Maps
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `components/Gallery.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'

const placeholderImages = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `https://images.unsplash.com/photo-${['1519741497674-4f28f7f2add1','1524824267900-2b823be4d0a7','1510915361894-db8b60106cb1','1511285560929-80b5a7e126ea','1520854221256-17451cc331bf','1522673607200-164d1b6ce486'][i]}?w=800&q=80&fit=crop`,
  alt: `Foto Prewedding ${i + 1}`,
}))

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 bg-charcoal text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs uppercase tracking-[0.4em] text-sage mb-4"
          >
            Galeri Foto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-script text-5xl md:text-7xl text-champagne"
          >
            Momen Kami
          </motion.h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholderImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative cursor-pointer overflow-hidden group ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '4/3' : '1' }}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-6 font-body text-xs text-cream/30 tracking-widest uppercase">
          {weddingConfig.hashtag}
        </p>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setSelected(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={placeholderImages[selected].src}
            alt={placeholderImages[selected].alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  )
}
```

### `components/RSVPForm.tsx`
```tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'

interface RSVPFormProps {
  guestName?: string
}

export default function RSVPForm({ guestName }: RSVPFormProps) {
  const [form, setForm] = useState({
    name: guestName || '',
    attendance: 'hadir',
    guests: '1',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSubmitted(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Konfirmasi Kehadiran
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            RSVP
          </motion.h2>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center shadow-lg"
          >
            <CheckCircle className="w-16 h-16 text-sage mx-auto mb-4" />
            <h3 className="font-script text-3xl text-champagne mb-2">Terima Kasih!</h3>
            <p className="font-body text-sm text-charcoal/60">
              Konfirmasi kehadiran Anda telah kami terima. Kami sangat menantikan kehadiran Anda.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 shadow-lg"
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="font-body text-xs text-charcoal/40 uppercase tracking-widest block mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full border-b border-blush bg-transparent py-3 font-display text-charcoal focus:outline-none focus:border-champagne transition-colors placeholder:text-charcoal/20"
                />
              </div>

              {/* Attendance */}
              <div>
                <label className="font-body text-xs text-charcoal/40 uppercase tracking-widest block mb-3">
                  Konfirmasi Kehadiran
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'hadir', label: 'Hadir 🎉' },
                    { value: 'tidak', label: 'Tidak Hadir 🙏' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, attendance: opt.value })}
                      className={`flex-1 py-3 text-sm font-body transition-all duration-200 border ${
                        form.attendance === opt.value
                          ? 'bg-champagne text-white border-champagne'
                          : 'border-blush text-charcoal/60 hover:border-champagne'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of guests */}
              {form.attendance === 'hadir' && (
                <div>
                  <label className="font-body text-xs text-charcoal/40 uppercase tracking-widest block mb-2">
                    Jumlah Tamu
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    className="w-full border-b border-blush bg-transparent py-3 font-display text-charcoal focus:outline-none focus:border-champagne transition-colors"
                  >
                    {['1', '2', '3', '4', '5+'].map((n) => (
                      <option key={n} value={n}>{n} orang</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="font-body text-xs text-charcoal/40 uppercase tracking-widest block mb-2">
                  Ucapan & Doa
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tulis ucapan dan doa terbaik Anda..."
                  rows={4}
                  className="w-full border-b border-blush bg-transparent py-3 font-display text-charcoal focus:outline-none focus:border-champagne transition-colors placeholder:text-charcoal/20 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading || !form.name}
                className="w-full py-4 bg-champagne text-white font-body text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charcoal transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
```

### `components/GiftRegistry.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, Gift, MapPin } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

export default function GiftRegistry() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!weddingConfig.gifts.enabled) return null

  return (
    <section className="py-24 px-6 bg-sage/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle mb-4"
          >
            Tanda Kasih
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Hadiah
          </motion.h2>
          <p className="font-body text-sm text-charcoal/50 mt-4 max-w-sm mx-auto">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, berikut informasinya:
          </p>
        </div>

        <div className="space-y-4">
          {weddingConfig.gifts.bankAccounts.map((account, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-body text-xs text-sage uppercase tracking-widest mb-1">
                    Bank {account.bank}
                  </p>
                  <p className="font-display text-2xl text-charcoal tracking-wider">{account.accountNumber}</p>
                  <p className="font-body text-sm text-charcoal/50 mt-1">a.n. {account.accountName}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                  className="p-3 border border-blush hover:border-champagne hover:text-champagne transition-colors"
                >
                  {copied === account.bank ? (
                    <Check className="w-5 h-5 text-sage" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}

          {/* Physical gift address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 shadow-md"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-champagne mt-0.5" />
              <div>
                <p className="font-body text-xs text-sage uppercase tracking-widest mb-1">Kirim ke Alamat</p>
                <p className="font-display text-sm text-charcoal">{weddingConfig.gifts.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### `components/Footer.tsx`
```tsx
'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-charcoal text-cream text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-script text-6xl md:text-8xl text-champagne mb-4">
          {weddingConfig.groom.name} & {weddingConfig.bride.name}
        </p>
        <p className="font-body text-xs text-cream/30 uppercase tracking-[0.4em] mb-8">
          15 · 03 · 2025
        </p>

        <div className="flex items-center justify-center gap-2 text-cream/20">
          <div className="h-px w-16 bg-current" />
          <Heart className="w-4 h-4 fill-current" />
          <div className="h-px w-16 bg-current" />
        </div>

        <p className="font-body text-xs text-cream/20 mt-8">
          Made with love · {weddingConfig.hashtag}
        </p>
      </motion.div>
    </footer>
  )
}
```

### `components/ui/AudioPlayer.tsx`
```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  if (!weddingConfig.music.enabled) return null

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} loop src={weddingConfig.music.src} />
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={toggle}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-champagne text-white rounded-full shadow-lg flex items-center justify-center hover:bg-charcoal transition-colors duration-300"
        title={playing ? 'Matikan musik' : 'Putar musik'}
      >
        {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </motion.button>
    </>
  )
}
```

---

## ⚙️ Langkah 7: API Route RSVP

### `app/api/rsvp/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server'

// Catatan: Untuk produksi, ganti dengan database (Supabase/PlanetScale/Prisma)
// Saat ini menggunakan in-memory storage sebagai placeholder

const rsvpData: any[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, attendance, guests, message } = body

    if (!name) {
      return NextResponse.json({ error: 'Nama diperlukan' }, { status: 400 })
    }

    const entry = {
      id: Date.now().toString(),
      name,
      attendance,
      guests: parseInt(guests) || 1,
      message: message || '',
      createdAt: new Date().toISOString(),
    }

    rsvpData.push(entry)
    console.log('[RSVP] New entry:', entry)

    return NextResponse.json({ success: true, data: entry }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ data: rsvpData, total: rsvpData.length })
}
```

---

## ⚙️ Langkah 8: Package.json

### `package.json` (pastikan field ini ada)
```json
{
  "name": "wedding-invitation",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## ⚙️ Langkah 9: Deploy ke Vercel

### Cara Deploy (3 opsi)

**Opsi A — Via Vercel CLI (Rekomendasi)**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy dari folder proyek
cd wedding-invitation
vercel

# Untuk production
vercel --prod
```

**Opsi B — Via GitHub + Vercel Dashboard**
1. Push kode ke GitHub repo baru
2. Buka [vercel.com](https://vercel.com) → Import Project
3. Pilih repo → klik Deploy
4. Vercel otomatis mendeteksi Next.js

**Opsi C — Drag & Drop**
```bash
npm run build
# Upload folder .next ke vercel.com/new
```

### Environment Variables (opsional, untuk produksi)
Tambahkan di Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_COUPLE_NAME=Dones & Wanda
NEXT_PUBLIC_WEDDING_DATE=2026-07-03
DATABASE_URL=postgresql://...  # jika pakai Supabase/PlanetScale
```

---

## 📋 Fitur yang Dibangun

| Fitur | Status | Komponen |
|-------|--------|----------|
| Cover page dengan animasi buka undangan | ✅ | `page.tsx` |
| Hero section fullscreen | ✅ | `Hero.tsx` |
| Countdown timer realtime | ✅ | `Countdown.tsx` |
| Profil mempelai + love story timeline | ✅ | `CoupleStory.tsx` |
| Detail acara (akad & resepsi) | ✅ | `EventDetails.tsx` |
| Galeri foto + lightbox | ✅ | `Gallery.tsx` |
| Form RSVP dengan API | ✅ | `RSVPForm.tsx` + `api/rsvp/route.ts` |
| Hadiah digital (rekening bank) | ✅ | `GiftRegistry.tsx` |
| Background music player | ✅ | `AudioPlayer.tsx` |
| URL personalisasi (`?to=NamaTamu`) | ✅ | `page.tsx` |
| SEO & Open Graph | ✅ | `layout.tsx` |
| Fully responsive mobile | ✅ | Tailwind CSS |
| Ready deploy Vercel | ✅ | `vercel.json` + `next.config.js` |

---

## 🎨 Design System

| Elemen | Value |
|--------|-------|
| Warna Primer | `#C9A96E` (Champagne Gold) |
| Warna Sekunder | `#A8B5A0` (Sage Green) |
| Warna Aksen | `#E8C4B0` (Blush) |
| Background | `#FAF5EF` (Warm Cream) |
| Text Gelap | `#2C2C2C` (Charcoal) |
| Font Display | Cormorant Garamond (serif elegan) |
| Font Body | Jost (sans-serif modern) |
| Font Script | Great Vibes (cursive romantis) |
| Gaya | Luxury Minimal · Modern Romantic |

---

## 🔧 Customisasi Mudah

Semua data pernikahan ada di **`lib/config.ts`**:
- Ganti nama, tanggal, lokasi acara
- Tambah/kurangi item galeri
- Ubah rekening bank
- Toggle fitur musik on/off
- Ubah URL Maps ke koordinat lokasi asli

Untuk personalisasi per tamu, gunakan URL:
```
https://wedding.vercel.app/?to=Budi+Santoso
```

---

## ⚠️ Catatan Penting untuk AI Agent

1. **Buat semua file sesuai struktur direktori** yang disebutkan di atas
2. **Jalankan `npm install`** setelah semua file dibuat
3. **Test lokal** dengan `npm run dev` sebelum deploy
4. **Ganti foto placeholder** di `public/images/` dengan foto asli
5. **Untuk produksi**, integrasikan RSVP API dengan database (Supabase direkomendasikan — gratis, mudah setup, kompatibel Vercel)
6. **Build harus sukses** (`npm run build`) sebelum deploy ke Vercel
7. Node.js minimal versi 18

---

*PRD ini dibuat untuk dieksekusi oleh AI Agent. Setiap section "Langkah" harus dieksekusi secara berurutan.*
