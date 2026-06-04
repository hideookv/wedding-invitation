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
          03 · 07 · 2026
        </p>

        <div className="flex items-center justify-center gap-2 text-cream/20">
          <div className="h-px w-16 bg-current" />
          <Heart className="w-4 h-4 fill-current" />
          <div className="h-px w-16 bg-current" />
        </div>

        <p className="font-body text-xs text-cream/20 mt-8">
          Made with NextJS · {weddingConfig.hashtag}
        </p>
      </motion.div>
    </footer>
  )
}
