'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { weddingConfig } from '@/lib/config'

const galleryImages = [
  { id: 1, src: '/images/gallery/1.webp', alt: 'Foto Prewedding 1' },
  { id: 2, src: '/images/gallery/2.webp', alt: 'Foto Prewedding 2' },
  { id: 3, src: '/images/gallery/3.webp', alt: 'Foto Prewedding 3' },
  { id: 4, src: '/images/gallery/4.webp', alt: 'Foto Prewedding 4' },
  { id: 5, src: '/images/gallery/5.webp', alt: 'Foto Prewedding 5' },
  { id: 6, src: '/images/gallery/6.webp', alt: 'Foto Prewedding 6' },
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
          {galleryImages.map((img, i) => (
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
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-3 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="relative max-h-[90vh] max-w-[90vw] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt}
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
