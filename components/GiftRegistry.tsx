'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, MapPin, Wifi } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

// ATM card gradient themes per bank
const cardThemes: Record<string, { gradient: string; accent: string; logo: string }> = {
  BCA: {
    gradient: 'from-[#003d79] via-[#005baa] to-[#1a7fd4]',
    accent: 'text-blue-200',
    logo: 'BCA',
  },
  Mandiri: {
    gradient: 'from-[#003868] via-[#00508f] to-[#0071bc]',
    accent: 'text-yellow-300',
    logo: 'mandiri',
  },
  BNI: {
    gradient: 'from-[#e65100] via-[#f57c00] to-[#ff9800]',
    accent: 'text-orange-200',
    logo: 'BNI',
  },
  BRI: {
    gradient: 'from-[#002f6c] via-[#00509e] to-[#0073e6]',
    accent: 'text-blue-200',
    logo: 'BRI',
  },
}

const defaultTheme = {
  gradient: 'from-[#2d2d2d] via-[#3d3d3d] to-[#4d4d4d]',
  accent: 'text-neutral-300',
  logo: 'BANK',
}

export default function GiftRegistry() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!weddingConfig.gifts.enabled) return null

  return (
    <section className="py-20 px-4 sm:px-6 bg-sage/10">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle mb-3"
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
          <p className="font-body text-sm text-charcoal/50 mt-3 max-w-xs mx-auto leading-relaxed">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan tanda kasih, berikut informasinya:
          </p>
        </div>

        <div className="space-y-5">
          {weddingConfig.gifts.bankAccounts.map((account, i) => {
            const theme = cardThemes[account.bank] || defaultTheme
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                className="group"
              >
                {/* ATM Card */}
                <div
                  className={`relative bg-linear-to-br ${theme.gradient} rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform duration-300 active:scale-[0.98] hover:scale-[1.02] hover:shadow-2xl`}
                  onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                >
                  {/* Card inner with proper padding */}
                  <div className="relative p-5 sm:p-7" style={{ aspectRatio: '1.586/1' }}>
                    {/* Card pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.07]" style={{
                      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,1) 35px, rgba(255,255,255,1) 36px)`
                    }} />

                    {/* Holographic shine effect */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top row: Bank name + Contactless icon */}
                    <div className="relative z-10 flex items-start justify-between">
                      <p className="font-display text-lg sm:text-xl font-bold text-white tracking-wider">
                        {theme.logo}
                      </p>
                      <Wifi className={`w-5 h-5 sm:w-6 sm:h-6 ${theme.accent} rotate-90 opacity-60`} />
                    </div>

                    {/* Chip */}
                    <div className="relative z-10 mt-4 sm:mt-6">
                      <div className="w-11 h-8 sm:w-14 sm:h-10 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-linear-to-br from-yellow-300 via-yellow-200 to-yellow-400 grid grid-cols-3 grid-rows-3 gap-px p-px">
                          {Array.from({ length: 9 }).map((_, j) => (
                            <div key={j} className={`rounded-[1px] ${
                              [0,2,3,5,6,8].includes(j) ? 'bg-yellow-500/50' : 'bg-yellow-600/30'
                            }`} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Account number */}
                    <div className="relative z-10 mt-3 sm:mt-5">
                      <p className="font-mono text-lg sm:text-2xl text-white tracking-[0.2em] sm:tracking-[0.25em] font-medium">
                        {account.accountNumber.replace(/(.{4})/g, '$1 ').trim()}
                      </p>
                    </div>

                    {/* Bottom: Account name + Copy */}
                    <div className="relative z-10 mt-2 sm:mt-4 flex items-end justify-between">
                      <div className="min-w-0 flex-1 mr-3">
                        <p className={`font-body text-[9px] sm:text-[10px] ${theme.accent} uppercase tracking-widest opacity-60 mb-0.5`}>
                          Account Holder
                        </p>
                        <p className="font-display text-xs sm:text-base text-white uppercase tracking-wider truncate">
                          {account.accountName}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(account.accountNumber, account.bank)
                        }}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        {copied === account.bank ? (
                          <>
                            <Check className="w-4 h-4 text-green-300" />
                            <span className="text-[10px] text-green-300 font-body uppercase tracking-wider">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-white/70" />
                            <span className="text-[10px] text-white/70 font-body uppercase tracking-wider">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card brand circle decorations */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.06]" />
                    <div className="absolute -bottom-10 -right-2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.04]" />
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Physical gift address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-5 shadow-md"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-champagne mt-0.5 flex-shrink-0" />
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
