'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { createContext, useContext, useState, type ReactNode } from 'react'

type SoundState = { soundOn: boolean; setSoundOn: (value: boolean) => void }

const SoundContext = createContext<SoundState>({ soundOn: false, setSoundOn: () => {} })

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOn] = useState(false)
  return <SoundContext.Provider value={{ soundOn, setSoundOn }}>{children}</SoundContext.Provider>
}

export function useSound() {
  return useContext(SoundContext)
}

export function SoundToggle() {
  const { soundOn, setSoundOn } = useSound()
  return (
    <button
      type="button"
      className="u2-sound"
      aria-pressed={soundOn}
      onClick={() => setSoundOn(!soundOn)}
    >
      {soundOn ? <Volume2 aria-hidden="true" size={16} /> : <VolumeX aria-hidden="true" size={16} />}
      <span>{soundOn ? 'Sonido activado' : 'Activar sonido'}</span>
    </button>
  )
}
