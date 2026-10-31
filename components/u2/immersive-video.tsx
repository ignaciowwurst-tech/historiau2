'use client'

import { useEffect, useRef, useState } from 'react'
import { useSound } from './sound'

type ImmersiveVideoProps = {
  src: string
  poster: string
  label: string
  priority?: boolean
}

export function ImmersiveVideo({ src, poster, label, priority = false }: ImmersiveVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { soundOn } = useSound()
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.intersectionRatio >= 0.5),
      { threshold: [0, 0.5, 1] },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !(soundOn && visible)
    const shouldPlay = visible && (!reducedMotion || soundOn)
    if (!shouldPlay) {
      video.pause()
      return
    }
    video.play().catch(() => {
      video.muted = true
      video.play().catch(() => {})
    })
  }, [visible, soundOn, reducedMotion])

  return (
    <video
      ref={videoRef}
      className="u2-video"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      aria-label={label}
    />
  )
}
