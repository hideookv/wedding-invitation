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
                      className={`flex-1 py-3 text-sm font-body transition-all duration-200 border cursor-pointer ${
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
                className="w-full py-4 bg-champagne text-white font-body text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-charcoal transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
