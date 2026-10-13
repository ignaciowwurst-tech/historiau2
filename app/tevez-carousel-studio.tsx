'use client'

import { useRef, useState } from 'react'
import { toJpeg } from 'html-to-image'
import JSZip from 'jszip'
import { ArrowDown, ArrowLeft, ArrowRight, Camera, Download, ExternalLink, LoaderCircle, Volume2 } from 'lucide-react'

type Slide = {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  label: string
}

const slides: Slide[] = [
  { eyebrow: 'PERFIL · CARLOS TÉVEZ', title: 'DE FUERTE APACHE AL MUNDO', subtitle: 'El pibe que hizo del esfuerzo una marca. Una carrera de barrio, títulos y regreso.', image: '/tevez/cover.png', label: 'Tapa' },
  { eyebrow: '01 — EL ORIGEN', title: 'Antes del mundo, el potrero.', subtitle: 'Nació en Ciudadela y creció en Fuerte Apache. Debutó en Primera con Boca a los 17: 21 de octubre de 2001, ante Talleres. Boca cayó 1–0. En las crónicas consultadas se consignan 13.000 espectadores.', image: '/tevez/origin.png', label: 'El comienzo' },
  { eyebrow: '02 — BOCA LO LANZÓ', title: 'De promesa a bandera.', subtitle: 'Con Carlos Bianchi, ganó la Libertadores y la Intercontinental de 2003. En Atenas 2004 fue goleador y campeón olímpico con Argentina. La intensidad del barrio encontró escenario mundial.', image: '/tevez/field.png', label: 'Boca y selección' },
  { eyebrow: '03 — LA DESPEDIDA', title: 'La Bombonera, sí. La fecha, todavía no.', subtitle: 'Tévez confirmó su despedida en la cancha de Boca, con el aval de Juan Román Riquelme. El aforo actual ronda los 57.000 espectadores. Se habla de diciembre de 2026; el 20 circula como posibilidad, no como fecha oficial. Messi y Cristiano fueron mencionados como invitados: su presencia no está confirmada. El aforo es el del estadio, no el cupo anunciado para el homenaje.', image: '/tevez/cover.png', label: 'La noticia' },
  { eyebrow: '04 — EL MAPA DE SU CARRERA', title: 'Siete camisetas. Una misma intensidad.', subtitle: 'En clubes: 728 partidos · 295 goles. Asistencias según Transfermarkt. Totales de carrera y desglose por club pueden variar según proveedor y criterio.', image: '/tevez/world.png', label: 'Estadísticas' },
  { eyebrow: '05 — DE SUDAMÉRICA A EUROPA', title: 'No fue un viaje lineal.', subtitle: 'Corinthians lo convirtió en fenómeno brasileño. West Ham, Manchester United y City lo llevaron a la Premier; Juventus, a otra final europea. Volvió a Boca dos veces: no fue una despedida del barrio, sino una elección repetida.', image: '/tevez/field.png', label: 'El recorrido' },
  { eyebrow: '06 — LO QUE VIERON SUS COMPAÑEROS', title: 'El socio que presionaba y jugaba.', subtitle: 'Rooney valoró la química y la rotación de posiciones. Ferguson elogió su energía y entrega; Russo defendió su libertad para moverse y asociarse. Son paráfrasis, no citas textuales. En los enlaces hay búsquedas de entrevistas y análisis en YouTube.', image: '/tevez/world.png', label: 'Testimonios' },
  { eyebrow: '07 — POR QUÉ IMPORTA', title: 'El “Jugador del Pueblo” no fue un apodo vacío.', subtitle: 'Tévez unió tres mundos: el fútbol popular argentino, la élite sudamericana y la competencia europea. Se diferenciaba por jugar cada pelota como una disputa, sin dejar de ser goleador y socio. Su legado no cabe en una estadística: también habla de pertenencia.', image: '/tevez/cover.png', label: 'El legado' },
]

const clubStats = [
  ['Boca Juniors', '279', '94', '54'],
  ['Corinthians', '57', '33', '8'],
  ['West Ham', '29', '7', '4'],
  ['Manchester United', '99', '34', '14'],
  ['Manchester City', '148', '73', '33'],
  ['Juventus', '96', '50', '20'],
  ['Shanghai Shenhua', '20', '4', '7'],
]

const references = [
  { label: 'Transfermarkt · perfil y estadísticas', href: 'https://www.transfermarkt.com/carlos-tevez/leistungsdatendetails/spieler/4276/plus/0?saison=ges' },
  { label: 'Crónicas · debut y espectadores', href: 'https://www.google.com/search?q=%22Carlos+Tevez%22+%22Talleres%22+%2213.000%22+21+octubre+2001' },
  { label: 'YouTube · debut de Tévez ante Talleres', href: 'https://www.youtube.com/results?search_query=Carlos+Tevez+debut+Boca+Talleres+2001+1-0' },
  { label: 'YouTube · Rooney sobre Tévez en Manchester', href: 'https://www.youtube.com/results?search_query=Wayne+Rooney+Carlos+Tevez+best+partner+Manchester+United' },
  { label: 'YouTube · Ferguson sobre el compromiso de Tévez', href: 'https://www.youtube.com/results?search_query=Sir+Alex+Ferguson+Carlos+Tevez+terrier+work+rate' },
  { label: 'YouTube · Russo explica el rol de Tévez en Boca', href: 'https://www.youtube.com/results?search_query=Miguel+Angel+Russo+Carlos+Tevez+rol+entrevista+analisis' },
  { label: 'YouTube · despedida y fecha', href: 'https://www.youtube.com/results?search_query=Carlos+Tevez+partido+despedida+Bombonera+diciembre+2026' },
]

function SlideArtwork({ index, capture = false }: { index: number; capture?: boolean }) {
  const slide = slides[index]
  return (
    <article className={`tevez-slide tevez-slide-${index + 1}${capture ? ' tevez-slide-capture' : ''}`} data-slide-capture={capture ? index : undefined}>
      <img className="tevez-slide-photo" src={slide.image} alt="" />
      <div className="tevez-slide-shade" />
      <div className="tevez-slide-frame">
        <div className="tevez-slide-topline"><span>CANCHA DE AUTOR</span><span>PERFIL · 2026</span></div>
        {index === 0 ? (
          <div className="tevez-cover-copy">
            <span className="tevez-kicker">{slide.eyebrow}</span>
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            <span className="tevez-cover-mark">CARLITOS<br />TÉVEZ</span>
          </div>
        ) : index === 4 ? (
          <div className="tevez-stat-copy">
            <span className="tevez-kicker">{slide.eyebrow}</span>
            <h2>{slide.title}</h2>
            <div className="tevez-stat-total"><strong>728</strong><span>partidos<br />de club</span><strong>295</strong><span>goles<br />de club</span></div>
            <div className="tevez-stat-table">
              <div className="tevez-stat-row tevez-stat-head"><span>CLUB</span><span>PJ</span><span>G</span><span>A</span></div>
              {clubStats.map(([club, pj, goals, assists]) => <div className="tevez-stat-row" key={club}><span>{club}</span><span>{pj}</span><span>{goals}</span><span>{assists}</span></div>)}
            </div>
            <p className="tevez-stat-note">Asistencias: Transfermarkt. Los registros varían por proveedor.</p>
          </div>
        ) : (
          <div className="tevez-story-copy">
            <span className="tevez-kicker">{slide.eyebrow}</span>
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
            {index === 3 && <span className="tevez-status-stamp">FECHA SIN CONFIRMAR</span>}
            {index === 6 && <span className="tevez-quote-mark">“</span>}
            {index === 7 && <span className="tevez-last-word">EL BARRIO<br />TAMBIÉN JUEGA</span>}
          </div>
        )}
        <div className="tevez-slide-footer"><span>DESLIZÁ PARA SEGUIR</span><span>0{index + 1} / 0{slides.length}</span></div>
      </div>
    </article>
  )
}

export default function TevezCarouselStudio() {
  const [active, setActive] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState('')
  const exportRef = useRef<HTMLDivElement>(null)
  const activeSlide = slides[active]

  async function exportSlides() {
    if (!exportRef.current || isExporting) return
    setIsExporting(true)
    setProgress('Preparando JPG…')
    try {
      await document.fonts.ready
      const images = Array.from(exportRef.current.querySelectorAll('img'))
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)))
      const zip = new JSZip()
      for (let index = 0; index < slides.length; index += 1) {
        setProgress(`Exportando ${index + 1} de ${slides.length}…`)
        const node = exportRef.current.querySelector<HTMLElement>(`[data-slide-capture="${index}"]`)
        if (!node) continue
        const dataUrl = await toJpeg(node, { quality: 0.94, pixelRatio: 1, cacheBust: true, backgroundColor: '#111315' })
        zip.file(`tevez-carrusel-${String(index + 1).padStart(2, '0')}.jpg`, dataUrl.split(',')[1], { base64: true })
      }
      setProgress('Armando el archivo…')
      const blob = await zip.generateAsync({ type: 'blob', compression: 'STORE' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'carlos-tevez-carrusel-instagram.zip'
      link.click()
      URL.revokeObjectURL(url)
      setProgress('Carrusel listo · 8 placas JPG')
    } catch (error) {
      console.error('[v0] No se pudo exportar el carrusel:', error)
      setProgress('No se pudo exportar. Probá de nuevo.')
    } finally {
      setIsExporting(false)
      window.setTimeout(() => setProgress(''), 4500)
    }
  }

  async function exportCurrentSlide() {
    if (!exportRef.current || isExporting) return
    setIsExporting(true)
    setProgress('Preparando JPG…')
    try {
      await document.fonts.ready
      const node = exportRef.current.querySelector<HTMLElement>(`[data-slide-capture="${active}"]`)
      if (!node) throw new Error('No se encontró la placa activa')
      const image = node.querySelector('img')
      if (image) await image.decode()
      const dataUrl = await toJpeg(node, { quality: 0.95, pixelRatio: 1, cacheBust: true, backgroundColor: '#111315' })
      const link = document.createElement('a')
      link.download = `tevez-carrusel-${String(active + 1).padStart(2, '0')}.jpg`
      link.href = dataUrl
      link.click()
      setProgress('Placa JPG descargada')
    } catch (error) {
      console.error('[v0] No se pudo descargar la placa:', error)
      setProgress('No se pudo descargar. Probá de nuevo.')
    } finally {
      setIsExporting(false)
      window.setTimeout(() => setProgress(''), 3500)
    }
  }

  function showSlide(next: number) {
    setActive((next + slides.length) % slides.length)
  }

  return (
    <main className="tevez-studio">
      <header className="tevez-header">
        <a href="#inicio" className="tevez-brand" aria-label="Cancha de Autor, inicio"><span className="tevez-brand-icon"><Camera aria-hidden="true" /></span><span>CANCHA <i>DE</i> AUTOR</span></a>
        <div className="tevez-header-note"><span className="tevez-live-dot" /> EDICIÓN ESPECIAL <span className="tevez-header-divider">/</span> FÚTBOL ARGENTINO</div>
        <button className="tevez-download-top" onClick={exportSlides} disabled={isExporting}><Download aria-hidden="true" /> {isExporting ? 'Preparando…' : 'Descargar carrusel'}</button>
      </header>

      <section className="tevez-main" id="inicio">
        <div className="tevez-editorial">
          <div className="tevez-section-tag"><span>01</span> HISTORIAS QUE QUEDAN</div>
          <h1>Una carrera<br />a <em>puro corazón.</em></h1>
          <p className="tevez-deck">Carlos Tévez, de Fuerte Apache a la cima. Ocho placas, un recorrido y las aclaraciones que la historia merece.</p>
          <div className="tevez-byline"><span className="tevez-avatar">CA</span><span>PERFIL PERIODÍSTICO<br /><strong>LECTURA · 2 MIN</strong></span></div>
        </div>

        <aside className="tevez-sources">
          <div className="tevez-editorial-rule" />
          <div className="tevez-reference-label"><Volume2 aria-hidden="true" /> TESTIMONIOS Y FUENTES</div>
          <p className="tevez-reference-note">Estadísticas por club: Transfermarkt. Los testimonios de Rooney, Ferguson y Russo son paráfrasis, no citas textuales. Los enlaces incluyen búsquedas de prensa y videos en YouTube.</p>
          <div className="tevez-reference-list">{references.map((reference, index) => <a href={reference.href} target="_blank" rel="noreferrer" key={reference.label}><span>0{index + 1}</span>{reference.label}<ExternalLink aria-hidden="true" /></a>)}</div>
          <p className="tevez-caveat">La fecha del partido de despedida y la presencia de invitados siguen sin confirmación oficial.</p>
        </aside>

        <div className="tevez-preview-area">
          <div className="tevez-preview-heading"><div><span>VISTA PREVIA</span><strong>{activeSlide.label}</strong></div><span className="tevez-size-label">1080 × 1350 <i>·</i> JPG</span></div>
          <div className="tevez-preview-stage">
            <button className="tevez-arrow tevez-arrow-left" onClick={() => showSlide(active - 1)} aria-label="Ver placa anterior"><ArrowLeft aria-hidden="true" /></button>
            <div className="tevez-visible-card"><SlideArtwork index={active} /></div>
            <button className="tevez-arrow tevez-arrow-right" onClick={() => showSlide(active + 1)} aria-label="Ver placa siguiente"><ArrowRight aria-hidden="true" /></button>
          </div>
          <div className="tevez-controls">
            <div className="tevez-dots" role="group" aria-label="Elegir placa">{slides.map((slide, index) => <button key={slide.label} className={`tevez-dot${active === index ? ' is-active' : ''}`} onClick={() => showSlide(index)} aria-label={`Placa ${index + 1}: ${slide.label}`} aria-current={active === index ? 'step' : undefined} />)}</div>
            <span className="tevez-counter">{String(active + 1).padStart(2, '0')} <i>/</i> {String(slides.length).padStart(2, '0')}</span>
          </div>
          <div className="tevez-download-actions"><button className="tevez-export-current" onClick={exportCurrentSlide} disabled={isExporting}><Download aria-hidden="true" /> Descargar esta placa</button><button className="tevez-export-all" onClick={exportSlides} disabled={isExporting}>{isExporting ? <LoaderCircle className="tevez-spinner" aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}{isExporting ? progress || 'Exportando' : 'Las 8 en ZIP'}</button></div>
          <p className="tevez-export-status" aria-live="polite">{progress}</p>
        </div>
      </section>

      <footer className="tevez-footer"><span>CANCHA DE AUTOR <i>·</i> FÚTBOL, CONTADO COMO SE JUEGA</span><span>HISTORIA EN MOVIMIENTO <span aria-hidden="true">↗</span></span></footer>

      <div className="tevez-export-deck" ref={exportRef} aria-hidden="true">{slides.map((slide, index) => <SlideArtwork key={slide.label} index={index} capture />)}</div>
    </main>
  )
}
