'use client'

import { ChevronDown } from 'lucide-react'
import { HERO } from '@/app/u2-story-data'
import { ImmersiveVideo } from './immersive-video'
import { useSound } from './sound'

export function Hero() {
  const { soundOn, setSoundOn } = useSound()

  return (
    <header className="u2-hero">
      <ImmersiveVideo src={HERO.video} poster={HERO.poster} label={HERO.caption} priority />
      <div className="u2-hero__shade" aria-hidden="true" />
      <div className="u2-hero__copy">
        <p className="u2-hero__band" aria-hidden="true">U2</p>
        <h1>
          <span className="sr-only">U2: </span>
          {HERO.title}
        </h1>
        <p className="u2-hero__dek">{HERO.dek}</p>
        {soundOn ? (
          <a className="u2-hero__cta" href="#comienzo">
            Entrar al recital <ChevronDown aria-hidden="true" size={18} />
          </a>
        ) : (
          <button type="button" className="u2-hero__cta" onClick={() => setSoundOn(true)}>
            Entrar al recital
          </button>
        )}
        <p className="u2-hero__caption">{HERO.caption}</p>
      </div>
    </header>
  )
}
