'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { PhotoStep } from '@/app/u2-story-data'

export function PhotoScrolly({ steps }: { steps: PhotoStep[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = stepRefs.current.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActiveIndex(index)
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="scrolly">
      <div className="escenario" aria-hidden="true">
        {steps.map((step, index) => (
          <Image
            key={step.id}
            src={step.image}
            alt=""
            fill
            sizes="100vw"
            className={`escenario__foto${index === activeIndex ? ' is-active' : ''}`}
            style={{ objectPosition: step.position }}
          />
        ))}
        <div className="escenario__degradado" />
      </div>
      <div className="pasos">
        {steps.map((step, index) => (
          <article
            key={step.id}
            className="paso"
            ref={(node) => {
              stepRefs.current[index] = node
            }}
          >
            <div className="tarjeta">
              <h2>{step.title}</h2>
              <p>{step.body}</p>
              <p className="sr-only">{step.alt}</p>
              <small>{step.credit}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
