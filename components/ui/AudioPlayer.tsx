'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { weddingConfig } from '@/lib/config'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current && weddingConfig.music.enabled) {
      audioRef.current.play().then(() => {
        setPlaying(true)
      }).catch(() => {
        setPlaying(false)
      })
    }
  }, [])

  if (!weddingConfig.music.enabled) return null

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} loop src={weddingConfig.music.src} />
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={toggle}
        aria-label={playing ? 'Matikan musik' : 'Putar musik'}
        title={playing ? 'Matikan musik' : 'Putar musik'}
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-30 w-11 h-11 sm:w-14 sm:h-14 bg-champagne text-white rounded-full shadow-lg flex items-center justify-center hover:bg-charcoal transition-colors duration-300 cursor-pointer"
      >
        {playing ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
      </motion.button>
    </>
  )
}
