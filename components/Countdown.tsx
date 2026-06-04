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
