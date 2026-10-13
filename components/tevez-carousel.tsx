'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Download, ExternalLink, ImageDown, Camera, LoaderCircle } from 'lucide-react'

type StatRow = { club: string; apps: string; goals: string; assists: string }
type Slide = {
  id: string
  kicker: string
  title: string
  copy: string
  image?: string
  kind?: 'cover' | 'stats' | 'sources'
  rows?: StatRow[]
  small?: string
}

const slides: Slide[] = [
  {
    id: '01-la-despedida',
    kicker: 'PERFIL · CARLOS TÉVEZ',
    title: 'DE FUERTE APACHE\nAL MUNDO',
    copy: 'La carrera de Carlitos: barrio, títulos y una despedida que todavía espera fecha oficial.',
    image: '/tevez/cover.png',
    kind: 'cover',
    small: 'Una historia del fútbol sudamericano',
  },
  {
    id: '02-el-adios',
    kicker: '01 / EL ÚLTIMO PARTIDO',
    title: 'El adiós,\ncon asterisco',
    copy: 'El aval para una despedida en la Bombonera fue reportado y diciembre de 2026 aparece como ventana posible. El 20/12 circula como fecha tentativa: no hay día confirmado. Messi y Cristiano son deseos, no presencias anunciadas. La Bombonera ronda los 57.000 espectadores.',
    image: '/tevez/cover.png',
    small: 'Fecha y aforo sujetos a confirmación oficial.',
  },
  {
    id: '03-el-barrio',
    kicker: '02 / LOS PRIMEROS AÑOS',
    title: 'El barrio\ncomo origen',
    copy: 'Nació en Ciudadela en 1984 y creció en el complejo Ejército de los Andes, conocido como Fuerte Apache. Allí encontró en la pelota una forma de pertenecer; el talento lo llevó del fútbol infantil a las inferiores de Boca.',
    image: '/tevez/origin.png',
    small: 'La infancia no explica todo: también cuentan el trabajo y la formación.',
  },
  {
    id: '04-el-debut',
    kicker: '03 / EL DEBUT EN PRIMERA',
    title: 'Un debut sin\nfinal feliz',
    copy: '21 de octubre de 2001: con 17 años, Tévez debutó en Boca ante Talleres, en Córdoba. El equipo perdió 1–0; Julián Maidana marcó el gol. No encontramos un registro de asistencia fiable para ese partido: mejor dejar el dato afuera que inventarlo.',
    image: '/tevez/field.png',
    small: 'Torneo Apertura · DT: Carlos Bianchi',
  },
  {
    id: '05-boca',
    kicker: '04 / BOCA, IDA Y VUELTA',
    title: 'Boca fue casa\ny consagración',
    copy: 'En sus distintas etapas xeneizes fue figura, volvió desde Europa y convirtió la Copa Libertadores 2003 y la Intercontinental en parte de su leyenda. El vínculo con la Bombonera terminó siendo más grande que una estadística.',
    image: '/tevez/cover.png',
    rows: [{ club: 'Boca Juniors', apps: '279', goals: '94', assists: '54' }],
    small: 'Cifras agregadas de sus etapas en el club.',
  },
  {
    id: '06-europa',
    kicker: '05 / INGLATERRA E ITALIA',
    title: 'De Manchester\na Turín',
    copy: 'Ganó la Champions con Manchester United; después fue campeón y goleador con City, y pieza clave de una Juventus finalista de Champions. Su fútbol viajó bien: presión, potencia y gol en ligas distintas.',
    image: '/tevez/world.png',
    kind: 'stats',
    rows: [
      { club: 'Man. United', apps: '99', goals: '34', assists: '14' },
      { club: 'Man. City', apps: '148', goals: '73', assists: '33' },
      { club: 'Juventus', apps: '96', goals: '50', assists: '20' },
    ],
    small: 'Manchester City: campeón de Premier League 2011–12.',
  },
  {
    id: '07-otros-clubes',
    kicker: '06 / UN DELANTERO GLOBAL',
    title: 'También dejó\nhuella lejos',
    copy: 'En Corinthians fue campeón brasileño; West Ham, Shanghai Shenhua y la selección argentina completan una carrera repartida entre continentes. Un recorrido poco habitual para un delantero formado en el fútbol sudamericano.',
    image: '/tevez/field.png',
    kind: 'stats',
    rows: [
      { club: 'Corinthians', apps: '57', goals: '33', assists: '8' },
      { club: 'West Ham', apps: '29', goals: '7', assists: '4' },
      { club: 'Shanghai', apps: '20', goals: '4', assists: '7' },
      { club: 'TOTAL CLUBES', apps: '728', goals: '295', assists: '140' },
    ],
    small: 'Asistencias: registro de proveedor; puede variar entre bases.',
  },
  {
    id: '08-legado',
    kicker: '07 / POR QUÉ IMPORTA',
    title: 'No era solo\nla garra',
    copy: 'Tévez combinó presión, cambio de ritmo y gol con una versatilidad que lo hizo útil como nueve o segundo punta. Wayne Rooney lo recordó en entrevistas como un socio ideal en Manchester: intensidad compartida y libertad para intercambiar posiciones. Ese perfil conectó barrio y élite sin perder identidad.',
    image: '/tevez/cover.png',
    small: 'Testimonio en entrevistas de Rooney disponibles en YouTube.',
  },
  {
    id: '09-fuentes',
    kicker: 'FUENTES Y CRITERIO',
    title: 'Una carrera,\nvarias fuentes',
    copy: 'Estadísticas de clubes agregadas por Transfermarkt (todas las competiciones); asistencias sujetas al criterio del proveedor. Debut: registros históricos del partido Boca–Talleres, 21/10/2001. Despedida: cobertura periodística; fecha y convocados aún sin confirmación oficial. Imágenes: recreaciones editoriales generadas, no archivo fotográfico.',
    image: '/tevez/world.png',
    kind: 'sources',
    small: 'Deslizá, guardá las placas y compartí la historia.',
  },
]

const sourceLinks = [
  { label: 'Estadísticas por club · Transfermarkt', href: 'https://www.transfermarkt.com/carlos-tevez/leistungsdatendetails/spieler/4276/plus/0?saison=ges' },
  { label: 'Premier League · perfil y trayectoria', href: 'https://www.premierleague.com/players/3316/Carlos-Tevez/overview' },
  { label: 'Rooney y Tévez · entrevistas en YouTube', href: 'https://www.youtube.com/results?search_query=Wayne+Rooney+Carlos+Tevez+best+partner+interview' },
  { label: 'Despedida · cobertura reciente', href: 'https://news.google.com/search?q=Carlos%20Tevez%20despedida%20Bombonera%202026&hl=es-419&gl=AR&ceid=AR%3Aes-419' },
]

const WIDTH = 1080
const HEIGHT = 1350
const GOLD = '#f1c644'
const INK = '#10151d'
const PAPER = '#f4f0e7'

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`No se pudo cargar ${src}`))
    image.src = src
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(/\s+/)
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (ctx.measureText(candidate).width > maxWidth && line) {
      ctx.fillText(line, x, y)
      line = word
      y += lineHeight
    } else {
      line = candidate
    }
  }
  if (line) ctx.fillText(line, x, y)
  return y + lineHeight
}

function imageCover(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  const scale = Math.max(WIDTH / image.width, HEIGHT / image.height)
  const w = image.width * scale
  const h = image.height * scale
  ctx.drawImage(image, (WIDTH - w) / 2, (HEIGHT - h) / 2, w, h)
  const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT)
  gradient.addColorStop(0, 'rgba(10,15,21,.12)')
  gradient.addColorStop(0.38, 'rgba(10,15,21,.18)')
  gradient.addColorStop(1, 'rgba(10,15,21,.92)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
  ctx.fillStyle = 'rgba(8,12,18,.18)'
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

function drawSlide(ctx: CanvasRenderingContext2D, slide: Slide, index: number, image?: HTMLImageElement) {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  if (image) imageCover(ctx, image)
  else {
    ctx.fillStyle = INK
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
  }

  const left = 84
  const right = WIDTH - 84
  ctx.fillStyle = GOLD
  ctx.fillRect(left, 82, 54, 7)
  ctx.font = '700 25px Arial, sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillStyle = '#fff9e9'
  ctx.fillText(slide.kicker.toUpperCase(), left, 137)
  ctx.letterSpacing = '0px'

  if (slide.kind === 'cover') {
    ctx.font = '900 94px Arial, sans-serif'
    ctx.fillStyle = '#fff9e9'
    const lines = slide.title.split('\n')
    let y = 810
    for (const line of lines) {
      ctx.fillText(line, left, y)
      y += 103
    }
    ctx.fillStyle = GOLD
    ctx.fillRect(left, y + 4, 110, 8)
    ctx.font = '400 37px Arial, sans-serif'
    ctx.fillStyle = '#fff9e9'
    wrapText(ctx, slide.copy, left, y + 71, 820, 53)
    ctx.font = '600 24px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255,249,233,.74)'
    ctx.fillText(slide.small ?? '', left, 1254)
  } else if (slide.kind === 'stats') {
    ctx.font = '900 76px Arial, sans-serif'
    ctx.fillStyle = '#fff9e9'
    let titleY = 265
    for (const line of slide.title.split('\n')) {
      ctx.fillText(line, left, titleY)
      titleY += 82
    }
    ctx.font = '400 29px Arial, sans-serif'
    ctx.fillStyle = '#f3f0e8'
    wrapText(ctx, slide.copy, left, titleY + 13, 880, 41)
    const tableTop = 780
    ctx.fillStyle = GOLD
    ctx.fillRect(left, tableTop, right - left, 2)
    ctx.font = '700 19px Arial, sans-serif'
    ctx.fillStyle = GOLD
    ctx.fillText('CLUB', left, tableTop + 38)
    ctx.fillText('PJ', 663, tableTop + 38)
    ctx.fillText('G', 795, tableTop + 38)
    ctx.fillText('A', 928, tableTop + 38)
    ctx.font = '500 30px Arial, sans-serif'
    for (const [rowIndex, row] of (slide.rows ?? []).entries()) {
      const y = tableTop + 97 + rowIndex * 83
      ctx.fillStyle = row.club === 'TOTAL CLUBES' ? GOLD : '#fff9e9'
      ctx.font = row.club === 'TOTAL CLUBES' ? '800 27px Arial, sans-serif' : '600 28px Arial, sans-serif'
      ctx.fillText(row.club, left, y)
      ctx.font = '500 29px Arial, sans-serif'
      ctx.fillText(row.apps, 663, y)
      ctx.fillText(row.goals, 795, y)
      ctx.fillText(row.assists, 928, y)
      ctx.fillStyle = 'rgba(255,249,233,.25)'
      ctx.fillRect(left, y + 28, right - left, 1)
    }
    ctx.font = '500 21px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255,249,233,.76)'
    ctx.fillText(slide.small ?? '', left, 1240)
  } else {
    ctx.font = '900 79px Arial, sans-serif'
    ctx.fillStyle = '#fff9e9'
    let titleY = slide.kind === 'sources' ? 280 : 415
    for (const line of slide.title.split('\n')) {
      ctx.fillText(line, left, titleY)
      titleY += 86
    }
    ctx.fillStyle = GOLD
    ctx.fillRect(left, titleY + 7, 85, 7)
    ctx.font = '400 34px Arial, sans-serif'
    ctx.fillStyle = '#fff9e9'
    const textY = titleY + 69
    const endY = wrapText(ctx, slide.copy, left, textY, 880, 48)
    if (slide.kind === 'sources') {
      ctx.font = '600 22px Arial, sans-serif'
      ctx.fillStyle = GOLD
      const lines = ['TRANSFERMARKT · PREMIER LEAGUE', 'ROONEY · ENTREVISTAS EN YOUTUBE', 'PRENSA ARGENTINA · DESPEDIDA 2026', 'RECREACIONES VISUALES · NO ARCHIVO']
      lines.forEach((line, lineIndex) => ctx.fillText(line, left, endY + 36 + lineIndex * 37))
    }
    ctx.font = '600 22px Arial, sans-serif'
    ctx.fillStyle = 'rgba(255,249,233,.74)'
    wrapText(ctx, slide.small ?? '', left, 1250, 850, 30)
  }

  ctx.fillStyle = 'rgba(255,249,233,.7)'
  ctx.fillRect(left, 1290, right - left, 1)
  ctx.font = '700 19px Arial, sans-serif'
  ctx.fillStyle = '#fff9e9'
  ctx.fillText('CANCHA ABIERTA  /  PERFIL', left, 1324)
  ctx.textAlign = 'right'
  ctx.fillStyle = GOLD
  ctx.fillText(`${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`, right, 1324)
  ctx.textAlign = 'left'
}

async function renderJpeg(slide: Slide, index: number) {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const context = canvas.getContext('2d')
  if (!context) throw new Error('No se pudo preparar la placa')
  const image = slide.image ? await loadImage(slide.image) : undefined
  drawSlide(context, slide, index, image)
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Falló la exportación JPG')), 'image/jpeg', 0.94)
  })
}

function crc32(bytes: Uint8Array) {
  let crc = -1
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0)
  }
  return (crc ^ -1) >>> 0
}

function makeZip(files: { name: string; blob: Blob }[]) {
  const encoder = new TextEncoder()
  const localParts: Uint8Array[] = []
  const centralParts: Uint8Array[] = []
  let offset = 0
  for (const file of files) {
    const name = encoder.encode(file.name)
    const data = new Uint8Array(file.blob.size)
    const dataView = new DataView(data.buffer)
    file.blob.arrayBuffer().then((buffer) => data.set(new Uint8Array(buffer)))
    const header = new Uint8Array(30 + name.length)
    const view = new DataView(header.buffer)
    view.setUint32(0, 0x04034b50, true)
    view.setUint16(4, 20, true)
    view.setUint16(6, 0x0800, true)
    view.setUint16(8, 0, true)
    view.setUint32(14, crc32(data), true)
    view.setUint32(18, data.length, true)
    view.setUint32(22, data.length, true)
    view.setUint16(26, name.length, true)
    header.set(name, 30)
    localParts.push(header, data)

    const central = new Uint8Array(46 + name.length)
    const centralView = new DataView(central.buffer)
    centralView.setUint32(0, 0x02014b50, true)
    centralView.setUint16(4, 20, true)
    centralView.setUint16(6, 20, true)
    centralView.setUint16(8, 0x0800, true)
    centralView.setUint16(10, 0, true)
    centralView.setUint32(16, crc32(data), true)
    centralView.setUint32(20, data.length, true)
    centralView.setUint32(24, data.length, true)
    centralView.setUint16(28, name.length, true)
    centralView.setUint32(42, offset, true)
    central.set(name, 46)
    centralParts.push(central)
    offset += header.length + data.length
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0)
  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)
  endView.setUint32(0, 0x06054b50, true)
  endView.setUint16(8, files.length, true)
  endView.setUint16(10, files.length, true)
  endView.setUint32(12, centralSize, true)
  endView.setUint32(16, offset, true)
  return new Blob([...localParts, ...centralParts, end], { type: 'application/zip' })
}

function saveBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}

export function TevezCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportMessage, setExportMessage] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let cancelled = false
    const draw = async () => {
      try {
        const image = activeSlide.image ? await loadImage(activeSlide.image) : undefined
        if (!cancelled) drawSlide(context, activeSlide, activeIndex, image)
      } catch {
        if (!cancelled) drawSlide(context, activeSlide, activeIndex)
      }
    }
    void draw()
    return () => { cancelled = true }
  }, [activeIndex, activeSlide])

  const downloadCurrent = useCallback(async () => {
    setIsExporting(true)
    setExportMessage('')
    try {
      const blob = await renderJpeg(activeSlide, activeIndex)
      saveBlob(blob, `${String(activeIndex + 1).padStart(2, '0')}-${activeSlide.id}.jpg`)
      setExportMessage('Placa JPG descargada.')
    } catch {
      setExportMessage('No se pudo exportar la placa. Probá de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }, [activeIndex, activeSlide])

  const downloadAll = useCallback(async () => {
    setIsExporting(true)
    setExportMessage('')
    try {
      const files = []
      for (const [index, slide] of slides.entries()) {
        files.push({ name: `${String(index + 1).padStart(2, '0')}-${slide.id}.jpg`, blob: await renderJpeg(slide, index) })
      }
      const zip = await makeZip(files)
      saveBlob(zip, 'carlos-tevez-carrusel-jpg.zip')
      setExportMessage('Carrusel completo descargado en un ZIP con 9 placas JPG.')
    } catch {
      setExportMessage('No se pudo exportar el carrusel. Probá de nuevo.')
    } finally {
      setIsExporting(false)
    }
  }, [])

  const move = (direction: -1 | 1) => setActiveIndex((index) => (index + direction + slides.length) % slides.length)

  return (
    <main className="min-h-screen bg-[#10151d] text-[#f4f0e7]">
      <div className="mx-auto max-w-[1380px] px-4 pb-14 pt-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <a className="flex items-center gap-3" href="#inicio" aria-label="Cancha Abierta, inicio">
            <span className="grid size-10 place-items-center rounded-full bg-[#f1c644] text-[#10151d]"><Camera size={18} aria-hidden="true" /></span>
            <span className="text-sm font-black uppercase tracking-[0.2em]">Cancha Abierta</span>
          </a>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">Periodismo en placas · 2026</span>
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-[#f1c644]">PERFIL 01</span>
        </header>

        <section id="inicio" className="grid gap-8 pt-8 lg:grid-cols-[minmax(280px,0.78fr)_minmax(440px,1fr)] lg:gap-14 lg:pt-12">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#f1c644]">Fútbol · archivo vivo</p>
            <h1 className="max-w-xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[62px]">Del barrio al mundo: la carrera de Carlitos</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/65 sm:text-lg">Un carrusel periodístico de nueve placas sobre el origen, el debut y el recorrido de Carlos Tévez. Los datos están resumidos para Instagram y las incertidumbres quedan señaladas.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wider text-white/60">
              <span className="rounded-full border border-white/15 px-3 py-2">9 placas</span>
              <span className="rounded-full border border-white/15 px-3 py-2">1080 × 1350 px</span>
              <span className="rounded-full border border-white/15 px-3 py-2">JPG · 4:5</span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={downloadCurrent} disabled={isExporting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f1c644] px-5 text-sm font-extrabold text-[#10151d] transition hover:bg-[#ffdc70] disabled:cursor-wait disabled:opacity-60">
                {isExporting ? <LoaderCircle className="animate-spin" size={17} /> : <ImageDown size={17} />}
                Descargar placa JPG
              </button>
              <button onClick={downloadAll} disabled={isExporting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/50 hover:bg-white/5 disabled:cursor-wait disabled:opacity-60">
                {isExporting ? <LoaderCircle className="animate-spin" size={17} /> : <Download size={17} />}
                Descargar las 9 placas
              </button>
            </div>
            <p className="mt-3 min-h-5 text-sm text-[#f1c644]" aria-live="polite">{exportMessage}</p>
          </div>

          <div className="mx-auto w-full max-w-[580px]">
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[#171e28] p-2 shadow-[0_28px_100px_rgba(0,0,0,0.4)] sm:p-3">
              <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} role="img" aria-label={`Placa ${activeIndex + 1} de ${slides.length}: ${activeSlide.title.replaceAll('\n', ' ')}`} className="block aspect-[4/5] w-full rounded-[18px] bg-[#171e28]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between sm:bottom-6 sm:left-6 sm:right-6">
                <button onClick={() => move(-1)} aria-label="Placa anterior" className="grid size-11 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/60"><ArrowLeft size={19} /></button>
                <span className="rounded-full bg-black/45 px-4 py-2 text-xs font-bold tracking-[0.15em] text-white backdrop-blur">{String(activeIndex + 1).padStart(2, '0')} <span className="text-white/45">/ {String(slides.length).padStart(2, '0')}</span></span>
                <button onClick={() => move(1)} aria-label="Placa siguiente" className="grid size-11 place-items-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition hover:bg-black/60"><ArrowRight size={19} /></button>
              </div>
            </div>
            <nav aria-label="Elegir placa" className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {slides.map((slide, index) => (
                <button key={slide.id} onClick={() => setActiveIndex(index)} aria-label={`Ver placa ${index + 1}: ${slide.title.replaceAll('\n', ' ')}`} aria-current={activeIndex === index ? 'step' : undefined} className={`grid size-10 shrink-0 place-items-center rounded-full border text-xs font-bold transition ${activeIndex === index ? 'border-[#f1c644] bg-[#f1c644] text-[#10151d]' : 'border-white/15 text-white/65 hover:border-white/45 hover:text-white'}`}>
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <section className="mt-10 grid gap-6 border-t border-white/10 pt-7 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-lg font-extrabold">Fuentes consultables</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">La fecha de despedida se presenta como tentativa porque no encontramos confirmación pública de día y horario. Las placas usan recreaciones visuales, no fotografías de archivo.</p>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {sourceLinks.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer" className="group flex min-h-12 items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/75 transition hover:border-[#f1c644]/60 hover:text-[#f1c644]">
                  <span>{source.label}</span><ExternalLink size={15} className="shrink-0 opacity-60 group-hover:opacity-100" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/40">
          <span>CANCHA ABIERTA · HISTORIAS DEL FÚTBOL</span>
          <span>Verificá fechas y estadísticas antes de publicar.</span>
        </footer>
      </div>
    </main>
  )
}

export { slides }
export type { Slide, StatRow }
