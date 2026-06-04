'use client'

import { motion } from 'framer-motion'
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
      <div className="absolute inset-0 bg-linear-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />

      <div className="relative z-10 text-center text-cream px-5 sm:px-6 max-w-4xl mx-auto py-20">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.5em] text-blush mb-5 sm:mb-8"
        >
          — The Wedding of —
        </motion.p>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="font-script text-5xl sm:text-7xl md:text-[10rem] leading-none text-cream">
            {weddingConfig.groom.name}
          </h1>
          <div className="divider-ornament my-3 sm:my-4">
            <span className="font-display text-2xl sm:text-3xl text-champagne">&</span>
          </div>
          <h1 className="font-script text-5xl sm:text-7xl md:text-[10rem] leading-none text-cream">
            {weddingConfig.bride.name}
          </h1>
        </motion.div>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-blush mt-6 sm:mt-10 uppercase"
        >
          3 — 4 Juli 2026
        </motion.p>

        {/* Address */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="font-display text-[11px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] text-cream/50 mt-2 uppercase"
        >
          Desa Gandung Baru
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-[11px] sm:text-xs text-cream/40 mt-5 sm:mt-6 max-w-sm sm:max-w-md mx-auto italic leading-relaxed"
        >
          &ldquo;{weddingConfig.quote}&rdquo;
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-8 sm:h-12 bg-linear-to-b from-transparent to-blush" />
        <p className="font-body text-[10px] text-blush/60 uppercase tracking-widest">Scroll</p>
      </motion.div>
    </section>
  )
}
