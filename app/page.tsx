'use client'

import { useState } from 'react'
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
  const [guestName] = useState(() => {
    if (typeof window === 'undefined') return ''
    const params = new URLSearchParams(window.location.search)
    const name = params.get('to') || params.get('name') || ''
    return decodeURIComponent(name)
  })

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

              <h1 className="font-script text-5xl sm:text-6xl md:text-8xl text-charcoal mb-2 leading-none">
                {weddingConfig.groom.name}
              </h1>
              <p className="font-display text-xl sm:text-2xl text-sage mb-2">&</p>
              <h1 className="font-script text-5xl sm:text-6xl md:text-8xl text-charcoal mb-6 sm:mb-8 leading-none">
                {weddingConfig.bride.name}
              </h1>

              <p className="font-body text-xs sm:text-sm text-charcoal/50 tracking-[0.15em] sm:tracking-widest uppercase">
                3 — 4 Juli 2026
              </p>
              <p className="font-body text-[11px] sm:text-xs text-charcoal/35 tracking-[0.1em] sm:tracking-[0.15em] uppercase mt-1 mb-8 sm:mb-10">
                Desa Gandung Baru
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="group relative px-10 py-4 bg-champagne text-white font-body text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 cursor-pointer"
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
