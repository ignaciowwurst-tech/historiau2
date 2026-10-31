import type { VideoMoment as VideoMomentData } from '@/app/u2-story-data'
import { ImmersiveVideo } from './immersive-video'

export function VideoMoment({ moment }: { moment: VideoMomentData }) {
  return (
    <section className="u2-moment" aria-label={moment.label}>
      <div className="u2-moment__stage">
        <ImmersiveVideo src={moment.src} poster={moment.poster} label={moment.label} />
        <div className="u2-moment__shade" aria-hidden="true" />
      </div>
      <div className="u2-moment__quotes">
        {moment.quotes.map((quote) => (
          <figure className="u2-quote" key={quote.text}>
            <blockquote>{`“${quote.text}”`}</blockquote>
            <figcaption>{quote.attribution}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
