export type MapStop = {
  id: string
  name: string
  coordinates: [number, number]
  period: string
  title: string
  body: string
  note: string
}

export const MAP_WIDTH = 720
export const MAP_HEIGHT = 760
export const MAP_CENTER: [number, number] = [-7.5, 53.55]
export const MAP_LATITUDE_MEAN = 53.4
export const MAP_SCALE = 175

// Coordinates were supplied as latitude, longitude and are stored as [longitude, latitude].
export const MAP_STOPS: MapStop[] = [
  {
    id: 'dublin',
    name: 'Dublín',
    coordinates: [-6.24889, 53.33306],
    period: '1976 · origen',
    title: 'Todo empieza en un pizarrón',
    body: 'El 25 de septiembre de 1976, Larry Mullen Jr. pegó un aviso en Mount Temple Comprehensive School: buscaba músicos. De aquella convocatoria en Dublín salió el núcleo de cuatro adolescentes que, después de llamarse Feedback y The Hype, se convertiría en U2.',
    note: 'U2 nació en la República de Irlanda, no en Irlanda del Norte. La isla ya estaba dividida políticamente.',
  },
  {
    id: 'belfast',
    name: 'Belfast',
    coordinates: [-5.92541, 54.59682],
    period: '1998 · acuerdo',
    title: 'Una canción sale del escenario',
    body: 'En mayo de 1998, durante la campaña por el Acuerdo de Viernes Santo, Bono invitó al escenario de Belfast a los dirigentes John Hume y David Trimble. La música no negoció el acuerdo: amplificó una conversación política decisiva y pidió que la ciudadanía lo respaldara en el referéndum.',
    note: 'El Acuerdo del 10 de abril de 1998 estableció un marco para compartir el poder y reducir la violencia.',
  },
  {
    id: 'derry',
    name: 'Derry / Londonderry',
    coordinates: [-7.3074, 54.9958],
    period: '1972 · memoria',
    title: 'El eco del Domingo Sangriento',
    body: 'El 30 de enero de 1972, soldados británicos mataron a 13 manifestantes desarmados en Derry; una víctima más murió después. U2 no nació allí, pero el episodio quedó en el centro de “Sunday Bloody Sunday”, una canción que no llama a tomar partido: denuncia el cansancio de una violencia que vuelve.',
    note: 'Trazado esquemático entre las tres coordenadas aportadas: no representa caminos transitables, una gira ni una ruta física de la banda.',
  },
]

export const TIMELINE = [
  { year: '1976', title: 'El aviso de Larry', detail: 'La reunión de estudiantes en Mount Temple da forma al grupo en Dublín. La búsqueda de una banda empieza antes que la búsqueda de un sonido propio.', source: 'U2.com · archivo de la banda', href: 'https://www.u2.com/' },
  { year: '1979', title: 'Un primer registro', detail: 'U2-3, un lanzamiento irlandés de apenas mil copias, fija el primer rastro discográfico profesional del grupo.', source: 'U2.com · U2-3', href: 'https://www.u2.com/' },
  { year: '1983', title: 'La herida se vuelve canción', detail: '“Sunday Bloody Sunday” pone la memoria de 1972 en una canción antimilitarista. Parte del público la leyó como un himno de facción; Bono aclaró desde el escenario que no era una canción rebelde.', source: 'Archivo audiovisual de U2', href: 'https://www.youtube.com/results?search_query=U2+Bono+Sunday+Bloody+Sunday+not+a+rebel+song' },
  { year: '1985', title: 'Live Aid', detail: 'U2 toca en el concierto global del 13 de julio. Su presentación transforma una banda de estadios en una presencia televisiva internacional y expone la potencia —y el riesgo— de la solidaridad convertida en espectáculo.', source: 'Live Aid · archivo', href: 'https://www.liveaid.org/' },
  { year: '1991', title: 'Cambiar para no repetirse', detail: 'Tras una crisis creativa, Achtung Baby y Zoo TV abrazan la electrónica, la ironía y las pantallas. U2 deja de sonar y verse como antes, en vez de repetir la fórmula que ya le daba éxito.', source: 'U2.com · discografía', href: 'https://www.u2.com/' },
  { year: '1998', title: 'Belfast y el acuerdo', detail: 'La banda respalda públicamente el Acuerdo de Viernes Santo. En una aparición en Belfast, Bono reúne en el escenario a John Hume y David Trimble, referentes de lados distintos de la negociación.', source: 'Gobierno del Reino Unido · Acuerdo de Belfast', href: 'https://www.gov.uk/government/publications/the-belfast-agreement' },
  { year: '2009', title: 'Una voz humanitaria', detail: 'Bono, The Edge y Adam Clayton reciben el premio Ambassador of Conscience de Amnistía Internacional. La visibilidad amplifica causas; también abre la pregunta de quién habla por quién.', source: 'Amnistía Internacional · archivo', href: 'https://www.amnesty.org/en/search/?q=U2%20Ambassador%20of%20Conscience' },
  { year: '2014', title: 'La ayuda también puede invadir', detail: 'Songs of Innocence aparece sin costo en bibliotecas de iTunes. La distribución masiva se vuelve una intromisión para parte del público: la banda y Apple habilitan una herramienta para quitarlo.', source: 'NPR · reacción al lanzamiento', href: 'https://www.npr.org/sections/alltechconsidered/2014/09/15/348674543/you-can-now-remove-u2s-album-from-your-itunes-account' },
  { year: '2017', title: 'Argentina, otra vez', detail: 'The Joshua Tree Tour pasa por La Plata los días 10 y 11 de octubre. La nota de La Voz estima unas 48.000 personas por noche.', source: 'La Voz · contexto argentino', href: 'https://www.lavoz.com.ar/espectaculos/u2-celebra-50-anos-nuevo-tema-fuertes-rumores-nueva-gira-vendran-argentina_0_O7trvrCz7o.html' },
  { year: '2026', title: 'Cincuenta años; el futuro, en condicional', detail: 'La Voz informó sobre el adelanto de “Silencio”, un disco previsto para noviembre y rumores de gira. La nota no confirma fechas en Argentina: una posibilidad de tour no equivale a un anuncio oficial.', source: 'La Voz · 23 de septiembre de 2026', href: 'https://www.lavoz.com.ar/espectaculos/u2-celebra-50-anos-nuevo-tema-fuertes-rumores-nueva-gira-vendran-argentina_0_O7trvrCz7o.html' },
]

export const PHOTO_STEPS = [
  { id: 'school', image: '/u2/dublin-1976.png', date: 'DUBLÍN · 1976', title: 'Cuatro adolescentes, una convocatoria', body: 'No hubo un plan maestro ni una escuela de virtuosos. Hubo un aviso de Larry Mullen Jr. en el tablón de Mount Temple y compañeros que aceptaron encontrarse. El punk había cambiado la regla: primero, tener algo que decir; después, aprender a tocarlo.', caption: 'Recreación editorial; no es una fotografía de U2 ni de Mount Temple.' },
  { id: 'north', image: '/u2/derry-memory.png', date: 'IRLANDA DEL NORTE · 1972—1998', title: 'La frontera no era una metáfora', body: 'La partición dejó a Irlanda del Norte dentro del Reino Unido. The Troubles enfrentó nacionalismos, lealtades políticas e identidades religiosas durante décadas. En Derry, Bloody Sunday hizo imposible escuchar “Sunday Bloody Sunday” como una consigna abstracta.', caption: 'Recreación editorial de Derry; no documenta un hecho puntual.' },
  { id: 'voice', image: '/u2/stage-action.png', date: 'LIVE AID · 1985', title: 'Cuando el escenario se volvió tribuna', body: 'Con Live Aid y campañas posteriores, U2 aprendió a usar el tamaño de su audiencia. Bono llevó la deuda externa, la pobreza y la ayuda internacional a reuniones de poder. La pregunta incómoda sigue vigente: ¿amplificar una causa es ayudar, o también convertirla en marca?', caption: 'Recreación editorial de un estadio; no es una foto de Live Aid ni de la banda.' },
  { id: 'reinvention', image: '/u2/achtung-studio.png', date: 'BERLÍN · 1991', title: 'La crisis también fue una herramienta', body: 'Durante las sesiones de Achtung Baby, U2 discutió qué hacer después de The Joshua Tree. La respuesta fue cambiar: electrónica, ironía y una puesta en escena multimedia en Zoo TV. La reinvención evitó que el éxito se volviera una jaula.', caption: 'Recreación editorial de un estudio; no es una imagen de las sesiones reales.' },
]

export const VIDEO_SOURCES = [
  { id: 'I1yfmlBS6Pc', title: 'Bono en Nigeria: atención sobre la crisis humanitaria', publisher: 'Télam · video aportado por la lectora', url: 'https://youtu.be/I1yfmlBS6Pc' },
  { id: 'LvNh3tAAzTc', title: 'Bono y The Edge en el metro de Kyiv', publisher: 'Todo Noticias · video aportado por la lectora', url: 'https://youtu.be/LvNh3tAAzTc' },
]

export const MUSIC_REFERENCES = [
  { title: 'Sunday Bloody Sunday', year: '1983', query: 'U2 Sunday Bloody Sunday official audio' },
  { title: 'One', year: '1991', query: 'U2 One official audio' },
  { title: 'Silencio', year: '2026', query: 'U2 Silencio official audio' },
]

export const SOURCES = [
  { title: 'La Voz · aniversario, “Silencio” y rumores de gira', detail: 'Nota del 23 de septiembre de 2026. La gira argentina aparece como posibilidad, no como fecha confirmada.', href: 'https://www.lavoz.com.ar/espectaculos/u2-celebra-50-anos-nuevo-tema-fuertes-rumores-nueva-gira-vendran-argentina_0_O7trvrCz7o.html' },
  { title: 'U2.com · archivo oficial de la banda', detail: 'Historia de la formación, discografía y lanzamientos.', href: 'https://www.u2.com/' },
  { title: 'Acuerdo de Belfast / Viernes Santo', detail: 'Texto y contexto del acuerdo firmado el 10 de abril de 1998.', href: 'https://www.gov.uk/government/publications/the-belfast-agreement' },
  { title: 'Amnistía Internacional · Ambassador of Conscience', detail: 'Archivo de la organización sobre el reconocimiento otorgado en 2009.', href: 'https://www.amnesty.org/en/search/?q=U2%20Ambassador%20of%20Conscience' },
  { title: 'NPR · Songs of Innocence en iTunes', detail: 'La recepción de una distribución gratuita que muchos usuarios no habían pedido.', href: 'https://www.npr.org/sections/alltechconsidered/2014/09/15/348674543/you-can-now-remove-u2s-album-from-your-itunes-account' },
  { title: 'Natural Earth · cartografía pública 1:10m', detail: 'Contornos de dominio público procesados desde world-atlas.', href: 'https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/' },
]

export function projectIrishPoint([longitude, latitude]: [number, number]) {
  const latitudeRadians = (53.4 * Math.PI) / 180
  const scale = (MAP_SCALE * 180) / Math.PI
  const x = MAP_WIDTH / 2 + ((longitude - MAP_CENTER[0]) * Math.PI / 180) * Math.cos(latitudeRadians) * scale
  const y = MAP_HEIGHT / 2 - ((latitude - MAP_CENTER[1]) * Math.PI / 180) * scale
  return [x, y] as [number, number]
}

export function smoothRoutePath(points: [number, number][]) {
  const projected = points.map(projectIrishPoint)
  if (projected.length < 2) return ''
  let path = `M ${projected[0][0]} ${projected[0][1]}`
  for (let index = 0; index < projected.length - 1; index += 1) {
    const previous = projected[Math.max(0, index - 1)]
    const start = projected[index]
    const end = projected[index + 1]
    const next = projected[Math.min(projected.length - 1, index + 2)]
    const controlOne = [start[0] + (end[0] - previous[0]) / 6, start[1] + (end[1] - previous[1]) / 6]
    const controlTwo = [end[0] - (next[0] - start[0]) / 6, end[1] - (next[1] - start[1]) / 6]
    path += ` C ${controlOne[0]} ${controlOne[1]}, ${controlTwo[0]} ${controlTwo[1]}, ${end[0]} ${end[1]}`
  }
  return path
}

export function geometryToPath(geometry: import('geojson').Geometry) {
  const rings = geometry.type === 'Polygon'
    ? geometry.coordinates
    : geometry.type === 'MultiPolygon'
      ? geometry.coordinates.flatMap((polygon) => polygon)
      : []
  return rings.map((ring) => {
    const projected = ring.map(([longitude, latitude]) => projectIrishPoint([longitude, latitude]))
    if (projected.length < 4) return ''
    const simplified: [number, number][] = [projected[0]]
    let previous = projected[0]
    for (let index = 1; index < projected.length - 1; index += 1) {
      const point = projected[index]
      if (Math.hypot(point[0] - previous[0], point[1] - previous[1]) > 0.7) {
        simplified.push(point)
        previous = point
      }
    }
    simplified.push(projected[projected.length - 1])
    return `M ${simplified.map(([x, y]) => `${x} ${y}`).join(' L ')} Z`
  }).join(' ')
}

export function getNorthernIrelandFeature(feature: import('geojson').Feature) {
  if (feature.geometry.type === 'Polygon') return feature
  if (feature.geometry.type !== 'MultiPolygon') return null
  const [belfast, derry] = [MAP_STOPS[1].coordinates, MAP_STOPS[2].coordinates]
  const polygon = feature.geometry.coordinates.find((candidate) => {
    const ring = candidate[0]
    const longitudes = ring.map((point) => point[0])
    const latitudes = ring.map((point) => point[1])
    return Math.min(...longitudes) < derry[0] && Math.max(...longitudes) > belfast[0] && Math.min(...latitudes) < belfast[1] && Math.max(...latitudes) > derry[1]
  })
  return polygon ? { ...feature, geometry: { type: 'Polygon' as const, coordinates: polygon } } : null
}

export function getStopDistances(path: SVGPathElement, coordinates: [number, number][]) {
  const totalLength = path.getTotalLength()
  const distances = coordinates.map((coordinate) => {
    const [x, y] = projectIrishPoint(coordinate)
    let closestDistance = 0
    let closestDelta = Number.POSITIVE_INFINITY
    const segments = Math.ceil(totalLength / 1.5)
    for (let index = 0; index <= segments; index += 1) {
      const distance = (index / segments) * totalLength
      const point = path.getPointAtLength(distance)
      const delta = Math.hypot(point.x - x, point.y - y)
      if (delta < closestDelta) {
        closestDistance = distance
        closestDelta = delta
      }
    }
    return closestDistance
  })
  return { totalLength, distances }
}

export function buildRouteProgress(path: SVGPathElement, distances: number[], middle: number, cards: HTMLElement[]) {
  const centers = cards.map((card) => {
    const rect = card.getBoundingClientRect()
    return rect.top + rect.height / 2
  })
  if (middle <= centers[0] + 1) return distances[0]
  if (middle >= centers[centers.length - 1] - 1) return path.getTotalLength()
  for (let index = 0; index < centers.length - 1; index += 1) {
    if (middle >= centers[index] && middle <= centers[index + 1]) {
      const progress = (middle - centers[index]) / (centers[index + 1] - centers[index])
      return distances[index] + (distances[index + 1] - distances[index]) * progress
    }
  }
  return distances[0]
}

export function activeStopIndex(drawLength: number, distances: number[]) {
  let active = 0
  distances.forEach((distance, index) => {
    if (drawLength >= distance - 0.75) active = index
  })
  return active
}

export const ROUTE_PATH = smoothRoutePath(MAP_STOPS.map((stop) => stop.coordinates))
export const MAP_CREDIT = 'Contornos de Natural Earth 1:10m (dominio público), procesados desde world-atlas. Coordenadas de las paradas: provistas por la autora.'
export const ARTICLE_TITLE = 'U2: del pizarrón de Dublín a la voz global'
export const ARTICLE_DESCRIPTION = 'Una nota biográfica interactiva sobre U2, su contexto irlandés, la historia de sus canciones, el activismo y sus contradicciones.'
export const ARTICLE_KICKER = 'CANCIÓN, MEMORIA Y PODER'
export const ARTICLE_BYLINE = 'NOTA BIOGRÁFICA · ACTUALIZADA EN OCTUBRE DE 2026'
export const ARTICLE_LEAD = 'Cincuenta años después del aviso que reunió a cuatro estudiantes en Dublín, U2 vuelve a la conversación con “Silencio”, un álbum anunciado para noviembre y rumores de gira. Pero ninguna fecha argentina está confirmada en la nota que abrió esta historia.'
export const ARTICLE_ENDING = 'U2 hizo de una experiencia local un lenguaje global: melodías reconocibles, puesta en escena ambiciosa y una insistencia poco común en entrar a conversaciones políticas. La diferencia no está en ser portavoz de todos, sino en sostener esa exposición, reinventarse y aceptar que el megáfono también puede incomodar.'
export const ROUTE_CAVEAT = 'El recorrido conecta tres lugares clave; no agrega puntos intermedios ni representa una gira real.'
export const METER_DATA = [{ value: '50', label: 'años desde el aviso en Mount Temple', source: '1976 → 2026' }, { value: '22', label: 'premios Grammy', source: 'Archivo de la Academia' }, { value: '175M+', label: 'discos vendidos, según la nota', source: 'Dato atribuido a La Voz' }]
export const DATA_STATUS = { confirmed: 'La cobertura informa del adelanto de “Silencio” y de un álbum previsto para noviembre de 2026.', unconfirmed: 'La nota menciona rumores de gira. No confirma fechas, estadio ni visita a la Argentina.' }
export const ROUTE_LABEL_OFFSETS: Record<string, [number, number]> = { dublin: [-18, 26], belfast: [17, -19], derry: [18, -19] }
export const QUERY_URL = (query: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
export const MUSICAL_SEARCHES = MUSIC_REFERENCES.map((item) => ({ ...item, href: QUERY_URL(item.query) }))
export const VIDEO_EMBED_BASE = 'https://www.youtube-nocookie.com/embed/'
export const PHOTO_IMAGE_CREDIT = 'Recreaciones editoriales generadas para acompañar la narración; no son imágenes documentales.'
export const INTERACTIVE_NOTE = 'Elegí un año para leer su ficha; desplazate por el mapa para dibujar el recorrido y activar cada parada.'
export const CENSORSHIP_NOTE = 'No afirmamos que “Sunday Bloody Sunday” haya sido prohibida: las fuentes consultadas sostienen una historia de controversia e interpretaciones enfrentadas, no una prohibición oficial general.'
export const NAV_ITEMS = [{ label: 'Relato', href: '#contexto' }, { label: 'Mapa', href: '#recorrido' }, { label: 'Datos', href: '#datos' }, { label: 'Archivo', href: '#escucha' }]
export const SUMMARY = 'Una historia de música y conflicto en una isla dividida; de las canciones que intentaron nombrar la violencia al activismo que encontró sus límites.'
export const EDITORIAL_ROUTE_NOTE = 'U2 nació en Dublín; Belfast y Derry sitúan otras capas de la historia irlandesa. Este mapa es un recorrido editorial, no una ruta histórica de la banda.'
export const AUDIO_NOTE = 'Los enlaces de canciones abren búsquedas en YouTube; el audio queda siempre bajo tu control.'
export const VIDEO_NOTE = 'Los videos aportados incluyen audio y permanecen en pausa hasta que actives el reproductor.'
export const BAND_MEMBERS = ['Bono · voz', 'The Edge · guitarra', 'Adam Clayton · bajo', 'Larry Mullen Jr. · batería']
export const ACTIVISM_CAVEAT = 'El activismo de una celebridad puede atraer atención; no reemplaza a las personas afectadas ni a las políticas públicas.'
export const IPOD_CAVEAT = 'Una entrega gratuita no equivale a consentimiento: el episodio de iTunes hizo visible ese límite.'
export const FOOTER_CREDIT = 'U2 · 1976—2026 · Una nota biográfica interactiva'
export const YEAR_DEFAULT = '2026'
export const MAP_VIEWBOX = `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`
export const STORY_HEADING = 'El mundo que sonaba detrás de las canciones'
export const MAP_HEADING = 'Tres ciudades, una memoria compartida'
export const TIMELINE_HEADING = 'Una banda dentro de su tiempo'
export const MEDIA_HEADING = 'La voz también viaja'
export const ENDING_HEADING = 'El megáfono y sus límites'
export const STATS_HEADING = 'El tamaño del fenómeno'
export const MAP_ACCESSIBLE_NAME = 'Mapa de Irlanda con tres paradas seleccionables'
export const CURRENT_ALBUM_NAME = 'Carnaval De Luz'
export const CURRENT_SINGLE_NAME = 'Silencio'
export const TOUR_STATUS_NOTE = 'La gira argentina no está confirmada en la nota consultada.'
export const ARTICLE_FINAL_QUESTION = '¿Puede una banda hablar por todos? La historia de U2 también consiste en discutir esa pregunta.'
export const ARTICLE_FINAL_LINE = 'Cincuenta años después del primer aviso, U2 sigue siendo noticia. La pregunta no es solo qué canción viene: es quién puede usar su volumen y con qué responsabilidad.'
export const NEWS_URL = SOURCES[0].href
export const ATLAS_SOURCE_URL = SOURCES[5].href
export const SOURCES_CUTOFF = '14 de octubre de 2026'
export const ARTICLE_META = { title: ARTICLE_TITLE, description: ARTICLE_DESCRIPTION }
