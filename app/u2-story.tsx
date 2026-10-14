'use client'

import Image from 'next/image'
import { geoProjection } from 'd3-geo'
import {
  ComposableMap,
  Geography,
  Geographies,
  useMapContext,
} from 'react-simple-maps'
import type { FeatureCollection, Geometry } from 'geojson'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  ACTIVISM_CAVEAT,
  ARTICLE_BYLINE,
  ARTICLE_DESCRIPTION,
  ARTICLE_ENDING,
  ARTICLE_KICKER,
  ARTICLE_LEAD,
  ARTICLE_TITLE,
  AUDIO_NOTE,
  BAND_MEMBERS,
  CENSORSHIP_NOTE,
  DATA_STATUS,
  EDITORIAL_ROUTE_NOTE,
  FOOTER_CREDIT,
  IPOD_CAVEAT,
  MAP_ACCESSIBLE_NAME,
  MAP_CENTER,
  MAP_CREDIT,
  MAP_HEIGHT,
  MAP_LATITUDE_MEAN,
  MAP_STOPS,
  MAP_VIEWBOX,
  MAP_WIDTH,
  MEDIA_HEADING,
  METER_DATA,
  MUSIC_REFERENCES,
  NAV_ITEMS,
  PHOTO_IMAGE_CREDIT,
  PHOTO_STEPS,
  ROUTE_CAVEAT,
  ROUTE_LABEL_OFFSETS,
  ROUTE_PATH,
  SOURCES,
  SOURCES_CUTOFF,
  STORY_HEADING,
  SUMMARY,
  TIMELINE,
  TIMELINE_HEADING,
  VIDEO_EMBED_BASE,
  VIDEO_NOTE,
  VIDEO_SOURCES,
  activeStopIndex,
  buildRouteProgress,
  getStopDistances,
  projectIrishPoint,
} from './u2-story-data'

type StoryProps = {
  mapFeatures: FeatureCollection<Geometry, { name: string }>
}

const meanLatitudeRadians = (MAP_LATITUDE_MEAN * Math.PI) / 180
const mapProjection = geoProjection((longitude, latitude) => [
  longitude * Math.cos(meanLatitudeRadians),
  latitude,
])
  .center(MAP_CENTER)
  .scale((175 * 180) / Math.PI)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
  .clipExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]])

function routeCurve(points: [number, number][]) {
  if (points.length < 2) return ''
  let path = `M ${points[0][0]} ${points[0][1]}`
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)]
    const start = points[index]
    const end = points[index + 1]
    const next = points[Math.min(points.length - 1, index + 2)]
    const firstControl = [start[0] + (end[0] - previous[0]) / 6, start[1] + (end[1] - previous[1]) / 6]
    const secondControl = [end[0] - (next[0] - start[0]) / 6, end[1] - (next[1] - start[1]) / 6]
    path += ` C ${firstControl[0]} ${firstControl[1]}, ${secondControl[0]} ${secondControl[1]}, ${end[0]} ${end[1]}`
  }
  return path
}

function MapOverlay({
  progress,
  activeIndex,
  pathRef,
  currentPoint,
  onSelectStop,
}: {
  progress: number
  activeIndex: number
  pathRef: React.RefObject<SVGPathElement | null>
  currentPoint: [number, number] | null
  onSelectStop: (index: number) => void
}) {
  const { projection } = useMapContext()
  const points = useMemo(
    () => MAP_STOPS.map((stop) => projection(stop.coordinates) as [number, number]),
    [projection],
  )
  const route = useMemo(() => routeCurve(points), [points])
  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelectStop(index)
    }
  }

  return (
    <g className="u2-map-route" aria-label={MAP_ACCESSIBLE_NAME}>
      <path className="u2-map-route__underlay" d={route} />
      <path className="u2-map-route__progress" d={route} ref={pathRef} />
      {MAP_STOPS.map((stop, index) => {
        const [x, y] = points[index]
        const [offsetX, offsetY] = ROUTE_LABEL_OFFSETS[stop.id]
        return (
          <g
            key={stop.id}
            className={`u2-map-stop ${index <= activeIndex ? 'is-on' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`Ir al relato de ${stop.name}`}
            aria-pressed={index === activeIndex}
            onClick={() => onSelectStop(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <circle className="u2-map-stop__target" cx={x} cy={y} r="24" />
            <circle className="u2-map-stop__dot" cx={x} cy={y} r="8" />
            <text x={x + offsetX} y={y + offsetY} className="u2-map-stop__label">
              {stop.name}
            </text>
          </g>
        )
      })}
      {currentPoint && (
        <g className="u2-map-cursor" aria-hidden="true">
          <circle className="u2-map-cursor__halo" cx={currentPoint[0]} cy={currentPoint[1]} r="17" />
          <circle className="u2-map-cursor__dot" cx={currentPoint[0]} cy={currentPoint[1]} r="6" />
        </g>
      )}
    </g>
  )
}

function IrelandMap({
  mapFeatures,
  progress,
  activeIndex,
  pathRef,
  currentPoint,
  onSelectStop,
}: StoryProps & {
  progress: number
  activeIndex: number
  pathRef: React.RefObject<SVGPathElement | null>
  currentPoint: [number, number] | null
  onSelectStop: (index: number) => void
}) {
  return (
    <ComposableMap
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      projection={mapProjection}
      className="u2-map-svg"
      viewBox={MAP_VIEWBOX}
      role="img"
      aria-label={MAP_ACCESSIBLE_NAME}
    >
      <Geographies geography={mapFeatures}>
        {({ geographies }) => (
          <>
            {geographies.map((geography) => {
              const country = geography.properties.name
              return (
                <Geography
                  key={geography.rsmKey}
                  geography={geography}
                  className={`u2-map-land ${country === 'Ireland' ? 'is-republic' : 'is-north'}`}
                  aria-label={country === 'Ireland' ? 'República de Irlanda' : 'Irlanda del Norte, parte del Reino Unido'}
                />
              )
            })}
            <MapOverlay
              progress={progress}
              activeIndex={activeIndex}
              pathRef={pathRef}
              currentPoint={currentPoint}
              onSelectStop={onSelectStop}
            />
          </>
        )}
      </Geographies>
    </ComposableMap>
  )
}

function PhotoStory() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const centered = entries.find((entry) => entry.isIntersecting)
        if (!centered) return
        const index = stepRefs.current.findIndex((step) => step === centered.target)
        if (index >= 0) setActiveStep(index)
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )
    stepRefs.current.forEach((step) => step && observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="u2-photo-story" id="contexto" aria-labelledby="u2-story-heading">
      <div className="u2-photo-story__stage" aria-hidden="true">
        {PHOTO_STEPS.map((step, index) => (
          <Image
            key={step.id}
            src={step.image}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`u2-photo-story__image ${activeStep === index ? 'is-active' : ''}`}
          />
        ))}
        <div className="u2-photo-story__shade" />
      </div>
      <div className="u2-photo-story__steps">
        {PHOTO_STEPS.map((step, index) => (
          <article
            key={step.id}
            className="u2-photo-step"
            ref={(node) => { stepRefs.current[index] = node }}
          >
            <div className="u2-photo-step__card">
              <p className="u2-eyebrow">{step.date}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <small>{step.caption}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function InteractiveTimeline() {
  const [selectedYear, setSelectedYear] = useState('2026')
  const selectedEvent = TIMELINE.find((item) => item.year === selectedYear) ?? TIMELINE[0]

  return (
    <section className="u2-timeline-section" id="datos" aria-labelledby="u2-timeline-heading">
      <div className="u2-section-heading">
        <p className="u2-eyebrow">HISTORIA Y DATOS</p>
        <h2 id="u2-timeline-heading">{TIMELINE_HEADING}</h2>
        <p>Elegí un año. La ficha cambia, sin desplazar la lectura.</p>
      </div>
      <div className="u2-timeline" role="group" aria-label="Seleccionar un hito histórico">
        {TIMELINE.map((item) => (
          <button
            key={item.year}
            type="button"
            className={`u2-timeline__year ${selectedYear === item.year ? 'is-selected' : ''}`}
            aria-pressed={selectedYear === item.year}
            onClick={() => setSelectedYear(item.year)}
          >
            {item.year}
          </button>
        ))}
      </div>
      <article className="u2-timeline-card" aria-live="polite">
        <div className="u2-timeline-card__year">{selectedEvent.year}</div>
        <div>
          <h3>{selectedEvent.title}</h3>
          <p>{selectedEvent.detail}</p>
          <a href={selectedEvent.href} target="_blank" rel="noreferrer">
            {selectedEvent.source} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
      <div className="u2-metrics" aria-label="Datos atribuidos de la trayectoria de U2">
        {METER_DATA.map((metric) => (
          <div className="u2-metric" key={metric.value}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.source}</small>
          </div>
        ))}
      </div>
      <aside className="u2-news-note" aria-labelledby="u2-news-heading">
        <div>
          <p className="u2-eyebrow">ACTUALIDAD · OCTUBRE DE 2026</p>
          <h3 id="u2-news-heading">El anuncio y el rumor no son lo mismo</h3>
        </div>
        <div>
          <p><strong>Reportado:</strong> el adelanto de "Silencio" y un álbum previsto para noviembre, según la cobertura enlazada.</p>
          <p><strong>Sin confirmar:</strong> la gira. La nota no informa fechas, estadio ni visita a Argentina.</p>
          <a href={SOURCES[0].href} target="_blank" rel="noreferrer">Leer la nota de La Voz ↗</a>
        </div>
      </aside>
    </section>
  )
}

function RouteStory({ mapFeatures }: StoryProps) {
  const [drawnLength, setDrawnLength] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [stopDistances, setStopDistances] = useState<number[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [currentPoint, setCurrentPoint] = useState<[number, number] | null>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const frameRef = useRef<number | null>(null)
  const reducedMotionRef = useRef(false)
  const activeIndexRef = useRef(0)
  const routeCoordinates = useMemo(() => MAP_STOPS.map((stop) => stop.coordinates), [])

  const selectStop = useCallback((index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const { totalLength: length, distances } = getStopDistances(path, routeCoordinates)
    setTotalLength(length)
    setStopDistances(distances)
    const initial = path.getPointAtLength(0)
    setCurrentPoint([initial.x, initial.y])

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = reducedMotion.matches
    if (reducedMotion.matches) {
      setDrawnLength(length)
      setActiveIndex(MAP_STOPS.length - 1)
      const end = path.getPointAtLength(length)
      setCurrentPoint([end.x, end.y])
    }

    const update = () => {
      frameRef.current = null
      if (reducedMotionRef.current) return
      const cards = cardRefs.current.filter((card): card is HTMLElement => card !== null)
      if (cards.length !== MAP_STOPS.length) return
      const nextLength = buildRouteProgress(path, distances, window.innerHeight / 2, cards)
      const boundedLength = Math.max(0, Math.min(length, nextLength))
      setDrawnLength(boundedLength)
      const nextActiveIndex = activeStopIndex(boundedLength, distances)
      if (activeIndexRef.current !== nextActiveIndex) {
        activeIndexRef.current = nextActiveIndex
        setActiveIndex(nextActiveIndex)
      }
      const point = path.getPointAtLength(boundedLength)
      setCurrentPoint([point.x, point.y])
    }

    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update)
    }
    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches
      if (event.matches) {
        setDrawnLength(length)
        setActiveIndex(MAP_STOPS.length - 1)
        const end = path.getPointAtLength(length)
        setCurrentPoint([end.x, end.y])
      } else {
        requestUpdate()
      }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    reducedMotion.addEventListener('change', onMotionPreferenceChange)
    requestUpdate()
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      reducedMotion.removeEventListener('change', onMotionPreferenceChange)
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    }
  }, [routeCoordinates])

  const progress = totalLength ? drawnLength / totalLength : 0

  return (
    <section className="u2-route-story" id="recorrido" aria-labelledby="u2-map-heading">
      <div className="u2-route-stage" aria-label="Mapa fijo; el relato avanza con el scroll">
        <div className="u2-route-stage__label">
          <p className="u2-eyebrow">RECORRIDO NARRATIVO · {MAP_STOPS.length} PARADAS</p>
          <h2 id="u2-map-heading">{MAP_HEADING}</h2>
        </div>
        <div className="u2-map-shell">
          <div className="u2-map-watermark" aria-hidden="true">IRLANDA</div>
          <IrelandMap
            mapFeatures={mapFeatures}
            progress={progress}
            activeIndex={activeIndex}
            pathRef={pathRef}
            currentPoint={currentPoint}
            onSelectStop={selectStop}
          />
          <div className="u2-map-credit">{MAP_CREDIT}</div>
        </div>
        <div className="u2-route-stage__guide" aria-hidden="true">Bajá para avanzar · subí para volver</div>
      </div>
      <div className="u2-route-steps">
        {MAP_STOPS.map((stop, index) => (
          <article
            key={stop.id}
            className="u2-route-step"
            ref={(node) => { cardRefs.current[index] = node }}
            aria-label={`${stop.name}, ${stop.period}`}
          >
            <div className={`u2-route-card ${index <= activeIndex ? 'is-on' : ''}`}>
              <p className="u2-eyebrow">{stop.period}</p>
              <h3>{stop.title}</h3>
              <p>{stop.body}</p>
              <small>{stop.note}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MediaArchive() {
  return (
    <section className="u2-media-section" id="escucha" aria-labelledby="u2-media-heading">
      <div className="u2-section-heading u2-section-heading--light">
        <p className="u2-eyebrow">AUDIO · VIDEO · ARCHIVO</p>
        <h2 id="u2-media-heading">{MEDIA_HEADING}</h2>
        <p>Dos registros que llevan el megáfono de Bono fuera del escenario. El sonido queda en tus manos.</p>
      </div>
      <div className="u2-video-grid">
        {VIDEO_SOURCES.map((video) => (
          <figure className="u2-video-card" key={video.id}>
            <div className="u2-video-card__frame">
              <iframe
                src={`${VIDEO_EMBED_BASE}${video.id}?rel=0`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption>
              <strong>{video.title}</strong>
              <span>{video.publisher}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="u2-listening">
        <div>
          <p className="u2-eyebrow">UNA ESCUCHA, TRES MOMENTOS</p>
          <h3>Pistas para volver a escuchar</h3>
          <p>Elegí una canción y buscá la publicación oficial. No hay reproducción automática ni archivos de audio alojados acá.</p>
        </div>
        <div className="u2-track-list">
          {MUSIC_REFERENCES.map((track) => (
            <a
              key={track.title}
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(track.query)}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>{track.year}</span>
              <strong>{track.title}</strong>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function U2Story({ mapFeatures }: StoryProps) {
  return (
    <main className="u2-story">
      <header className="u2-topbar">
        <a className="u2-wordmark" href="#inicio" aria-label="Cancha de autor, inicio">
          <span>CA</span>
          <strong>CANCHA<br />DE AUTOR</strong>
        </a>
        <nav aria-label="Navegación de la nota">
          {NAV_ITEMS.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <span className="u2-topbar__edition">EDICIÓN · 2026</span>
      </header>

      <section className="u2-hero" id="inicio" aria-labelledby="u2-title">
        <div className="u2-hero__copy">
          <p className="u2-eyebrow">{ARTICLE_KICKER}</p>
          <p className="u2-hero__anniversary">1976 <span>—</span> 2026</p>
          <h1 id="u2-title">{ARTICLE_TITLE}</h1>
          <p className="u2-hero__dek">{SUMMARY}</p>
          <p className="u2-byline">{ARTICLE_BYLINE} <span>·</span> LECTURA INTERACTIVA</p>
          <a className="u2-hero__link" href="#contexto">Entrar en la historia <span aria-hidden="true">↓</span></a>
        </div>
        <div className="u2-hero__art">
          <Image src="/u2/stage-action.png" alt="" fill priority sizes="(max-width: 760px) 100vw, 50vw" />
          <span>Recreación editorial · no es archivo fotográfico</span>
        </div>
        <div className="u2-hero__folio" aria-hidden="true">01 / 26</div>
      </section>

      <div className="u2-member-strip" aria-label="Integrantes originales de U2">
        <span>LA FORMACIÓN ORIGINAL</span>
        {BAND_MEMBERS.map((member) => <span key={member}>{member}</span>)}
      </div>

      <section className="u2-intro" aria-label="Introducción">
        <p className="u2-intro__drop">U2</p>
        <div>
          <p className="u2-eyebrow">UNA BANDA DENTRO DE SU TIEMPO</p>
          <p>{ARTICLE_LEAD}</p>
        </div>
      </section>

      <PhotoStory />

      <section className="u2-context-copy" aria-labelledby="u2-context-title">
        <div className="u2-context-copy__heading">
          <p className="u2-eyebrow">ÉXITO Y FRICCIÓN</p>
          <h2 id="u2-context-title">El megáfono nunca fue neutral</h2>
        </div>
        <div className="u2-context-copy__body">
          <p>Live Aid, Jubilee 2000 y la campaña ONE llevaron a Bono a foros donde la música rara vez llega. Esa influencia también recibió críticas: simplificar debates complejos, acercarse al poder corporativo y convertir una causa en una identidad de marca son preguntas legítimas, no notas al pie.</p>
          <p>La controversia también estuvo adentro. Al entregar <em>Songs of Innocence</em> automáticamente a usuarios de iTunes en 2014, U2 confundió alcance con permiso. El disco pudo ser gratuito; la decisión de ponerlo en una biblioteca ajena no se sintió gratuita para todos.</p>
          <p className="u2-context-copy__caveat">Sobre la censura: la canción "Sunday Bloody Sunday" fue y sigue siendo polémica por sus lecturas enfrentadas. No encontramos base suficiente para afirmar que haya sufrido una prohibición oficial general; por eso no confundimos controversia con censura.</p>
          <div className="u2-context-copy__notes">
            <span>{ACTIVISM_CAVEAT}</span>
            <span>{IPOD_CAVEAT}</span>
            <span>{CENSORSHIP_NOTE}</span>
          </div>
        </div>
      </section>

      <InteractiveTimeline />

      <section className="u2-news-intro" aria-label="Actualidad">
        <p className="u2-eyebrow">UNA NOTICIA, DOS NIVELES DE CERTEZA</p>
        <h2>El regreso a los titulares también necesita contexto.</h2>
        <p>{DATA_STATUS.confirmed} {DATA_STATUS.unconfirmed}</p>
      </section>

      <RouteStory mapFeatures={mapFeatures} />

      <section className="u2-ending" aria-labelledby="u2-ending-heading">
        <p className="u2-eyebrow">50 AÑOS DESPUÉS</p>
        <h2 id="u2-ending-heading">{ENDING_HEADING}</h2>
        <p>{ARTICLE_ENDING}</p>
        <blockquote>"{ARTICLE_DESCRIPTION.split(',')[0]}"</blockquote>
        <p className="u2-ending__last">{ARTICLE_LEAD}</p>
      </section>

      <MediaArchive />

      <section className="u2-sources" id="fuentes" aria-labelledby="u2-sources-heading">
        <div className="u2-section-heading">
          <p className="u2-eyebrow">TRANSPARENCIA EDITORIAL</p>
          <h2 id="u2-sources-heading">Fuentes, créditos y criterio</h2>
          <p>Actualidad consultada al 14 de octubre de 2026. El artículo de La Voz respalda el contexto reciente; el tour argentino se mantiene como rumor, no como anuncio.</p>
        </div>
        <div className="u2-source-list">
          {SOURCES.map((source, index) => (
            <a href={source.href} target="_blank" rel="noreferrer" className="u2-source" key={source.title}>
              <span className="u2-source__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="u2-source__copy"><strong>{source.title}</strong><small>{source.detail}</small></span>
              <span className="u2-source__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="u2-source-method">
          <p><strong>Crédito cartográfico.</strong> {MAP_CREDIT}</p>
          <p><strong>Crédito visual.</strong> {PHOTO_IMAGE_CREDIT}</p>
          <p><strong>Ruta.</strong> {EDITORIAL_ROUTE_NOTE} {ROUTE_CAVEAT}</p>
          <p><strong>Audio y video.</strong> {AUDIO_NOTE} {VIDEO_NOTE}</p>
          <p><strong>Fecha de corte.</strong> {SOURCES_CUTOFF}</p>
        </div>
      </section>

      <footer className="u2-footer">
        <a className="u2-wordmark" href="#inicio"><span>CA</span><strong>CANCHA<br />DE AUTOR</strong></a>
        <p>{FOOTER_CREDIT}</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </main>
  )
}
