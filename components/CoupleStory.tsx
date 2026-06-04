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
        <div className="grid md:grid-cols-2 gap-12">
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
                <div className="w-full h-full rounded-full bg-linear-to-br from-sage/30 to-blush/30 border-2 border-champagne/30 flex items-center justify-center">
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
                <p className="mb-2 italic text-champagne/80">{item.person.childOrder}</p>
                <p>Putra/i dari</p>
                <p className="text-cream/80">{item.person.parentFather}</p>
                <p className="text-cream/80">& {item.person.parentMother}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
