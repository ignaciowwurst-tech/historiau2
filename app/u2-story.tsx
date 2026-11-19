import { Hero } from '@/components/u2/hero'
import { PhotoScrolly } from '@/components/u2/photo-scrolly'
import { SoundProvider, SoundToggle } from '@/components/u2/sound'
import { VideoMoment } from '@/components/u2/video-moment'
import {
  CREDITS,
  INTERVIEW,
  PHOTO_STEPS_ORIGIN,
  PHOTO_STEPS_WORLD,
  PROSE_CLOSING,
  PROSE_OPENING,
  PROSE_REINVENTION,
  PROSE_WAR,
  TESTIMONIES,
  type Testimony,
} from './u2-story-data'

function Prose({ paragraphs, id, lead = false }: { paragraphs: string[]; id?: string; lead?: boolean }) {
  return (
    <div className={`u2-prose${lead ? ' u2-prose--lead' : ''}`} id={id}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}

function EditorialTestimony({ testimony }: { testimony: Testimony }) {
  return (
    <aside className="u2-testimony">
      <figure>
        <blockquote>
          <p>{`“${testimony.text}”`}</p>
        </blockquote>
        <figcaption>{testimony.attribution}</figcaption>
      </figure>
    </aside>
  )
}

export default function U2Story() {
  return (
    <SoundProvider>
      <main className="u2-story">
        <SoundToggle />
        <Hero />
        <article>
          <Prose paragraphs={PROSE_OPENING} id="comienzo" lead />
          <PhotoScrolly steps={PHOTO_STEPS_ORIGIN} />
          <EditorialTestimony testimony={TESTIMONIES.origin} />
          <Prose paragraphs={PROSE_WAR} />
          {TESTIMONIES.sundayBloodySunday.map((testimony) => (
            <EditorialTestimony key={testimony.attribution} testimony={testimony} />
          ))}
          <VideoMoment moment={INTERVIEW} />
          <Prose paragraphs={PROSE_REINVENTION} />
          <PhotoScrolly steps={PHOTO_STEPS_WORLD} />
          <EditorialTestimony testimony={TESTIMONIES.one} />
          <Prose paragraphs={PROSE_CLOSING} />
        </article>
        <footer className="u2-credits">
          {CREDITS.map((credit) => (
            <p key={credit}>{credit}</p>
          ))}
        </footer>
      </main>
    </SoundProvider>
  )
}
