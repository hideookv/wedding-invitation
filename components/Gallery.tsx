'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { weddingConfig } from '@/lib/config'

const placeholderImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80&fit=crop', alt: 'Foto Prewedding 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&fit=crop', alt: 'Foto Prewedding 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80&fit=crop', alt: 'Foto Prewedding 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80&fit=crop', alt: 'Foto Prewedding 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80&fit=crop', alt: 'Foto Prewedding 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80&fit=crop', alt: 'Foto Prewedding 6' },
]

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
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors cursor-pointer"
            onClick={() => setSelected(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={placeholderImages[selected].src}
              alt={placeholderImages[selected].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
