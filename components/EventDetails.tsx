'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
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
                  <Calendar className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Tanggal</p>
                    <p className="font-display text-sm text-charcoal">
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Waktu</p>
                    <p className="font-display text-sm text-charcoal">{event.time} – {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-champagne mt-0.5 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-charcoal/40 uppercase tracking-wider">Lokasi</p>
                    <p className="font-display text-sm text-charcoal">{event.venue}</p>
                    <p className="font-body text-xs text-charcoal/50 mt-0.5">{event.address}</p>
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
