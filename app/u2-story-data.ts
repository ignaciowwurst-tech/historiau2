export type PhotoStep = {
  id: string
  image: string
  alt: string
  position: string
  title: string
  body: string
  credit: string
}

export type VideoMoment = {
  id: string
  src: string
  poster: string
  label: string
  people?: string[]
  quotes: { text: string; attribution: string }[]
}

export const HERO = {
  video: '/u2/silencio-mount-temple.mp4',
  poster: '/u2/poster-silencio.jpg',
  title: 'Cincuenta años de ruido y fe',
  dek: 'Del aviso de un baterista adolescente en una escuela de Dublín a “Silencio”, la canción que U2 volvió a tocar en el mismo patio donde empezó todo.',
  caption: '“Silencio”, en vivo en Mount Temple, 2026',
}

export const PROSE_OPENING = [
  'El 25 de septiembre de 1976, Larry Mullen Jr. tenía catorce años y una batería en la cocina. Pegó un aviso en el tablón de Mount Temple Comprehensive School: buscaba músicos. Aparecieron dos jóvenes con ganas de romper los límites del aula: Adam Clayton y Paul Hewson, el futuro Bono. Con el tiempo, también se sumó David Evans, más tarde conocido como The Edge, y el grupo fue tomando forma en los pasillos y garajes de Dublín.',
  'El punk había cambiado la regla: primero había que tener algo que decir; después, aprender a decirlo. Pasaron por Feedback y The Hype antes de quedarse con dos letras. Paul pasó a ser Bono; el nombre de la banda se quedó en U2, una abreviatura que venía de la forma de escribir las letras del alfabeto de la radio, pero también de una forma de entender el mundo: de un lado al otro, de la pequeña escena irlandesa a una gran historia global.',
]

export const PHOTO_STEPS_ORIGIN: PhotoStep[] = [
  {
    id: 'joven',
    image: '/u2/u2-joven.jpeg',
    alt: 'Los cuatro integrantes de U2, adolescentes, en una foto en blanco y negro de fines de los años setenta',
    position: '70% center',
    title: 'Cuatro chicos del norte de Dublín',
    body: 'Ensayaban en la escuela y tocaban donde los dejaran. En 1978 ganaron un concurso de talentos en Limerick y, con él, la primera sesión de grabación. Al año siguiente, U2-3 salió solo del ecosistema local y empezó a ser pensado como banda, no como proyecto de instituto.',
    credit: 'Foto: archivo, material aportado por la redacción',
  },
  {
    id: 'boy',
    image: '/u2/boy.jpg',
    alt: 'Tapa del disco Boy: un chico de pelo claro mira de frente con las manos detrás de la cabeza',
    position: 'center 35%',
    title: 'Boy, 1980',
    body: 'El primer disco, producido por Steve Lillywhite, eligió para la tapa la cara de un chico: Peter Rowen, hermano de un amigo de la banda. Canciones sobre crecer, la fe y la pérdida, con letras que hablaban de la adolescencia sin usar el lenguaje de la comodidad.',
    credit: 'Tapa de Boy (Island Records, 1980) · edición Deluxe',
  },
]

export const PROSE_WAR = [
  'A pocos kilómetros, la isla seguía partida. Irlanda del Norte vivía los Troubles: bombas, barricadas y funerales. El 30 de enero de 1972, en Derry, soldados británicos mataron a trece personas durante una marcha de protesta. La violencia no era un telón de fondo: era la materia prima del mundo en que crecían.',
  'U2 convirtió esa herida en “Sunday Bloody Sunday”, el tema que abre War (1983). No era un himno de bando: era una canción contra el cansancio de una violencia que siempre volvía. La banda se enfrentó al riesgo de convertirse en una especie de símbolo vivo de la convulsión política, pero jamás perdieron la capacidad de mirar a la historia con la exigencia de un cuestionamiento moral.',
]

export const INTERVIEW: VideoMoment = {
  id: 'belfast',
  src: '/u2/bono-belfast.mp4',
  poster: '/u2/poster-belfast.jpg',
  label: 'Bono recuerda la primera vez que tocaron “Sunday Bloody Sunday” en Belfast',
  people: ['Carlos Iogna Prat', 'Cristian Poow', 'Franco “Churri” Ricci'],
  quotes: [
    {
      text: 'Esta canción se llama “Sunday Bloody Sunday”. Si no les gusta, no la volvemos a tocar nunca más.',
      attribution: 'Bono, al presentarla en el Maysfield Leisure Centre de Belfast, diciembre de 1982, según las crónicas del show',
    },
    {
      text: 'Esta no es una canción rebelde.',
      attribution: 'Bono, desde el escenario de Red Rocks, 1983 (Under a Blood Red Sky)',
    },
  ],
}

export const PROSE_REINVENTION = [
  'Después vinieron Live Aid, The Joshua Tree y los estadios. Y, con ellos, el riesgo de repetirse. A fines de 1990, la banda viajó a Berlín, a los estudios Hansa, recién caído el Muro, sin una idea clara de qué era lo que iban a hacer, pero con la convicción de que el gran desafío del grupo era romper con la imagen que había construido desde fuera. No querían ser una banda que se repite; querían ser una banda que se reinventa.',
  'Achtung Baby (1991) no fue solo un cambio de sonido. Fue un cambio de velocidad, un giro hacia la ironía y la electrónica, con letras que no escapaban de la duda. La banda se vio obligada a mirar a la cámara y preguntarse por qué había dejado de sorprenderse. A partir de ahí, la historia de U2 pasó a describirse también como una historia de supervivencia artística.',
]

export const PHOTO_STEPS_WORLD: PhotoStep[] = [
  {
    id: 'achtung',
    image: '/u2/achtung-baby.jpeg',
    alt: 'Collage de dieciséis fotos de la tapa de Achtung Baby: la banda, un auto Trabant, una vaca, Berlín',
    position: 'center',
    title: 'Achtung Baby, 1991',
    body: 'Electrónica, ironía y distorsión. Las discusiones en Berlín casi los separan, hasta que apareció “One”. La gira Zoo TV llenó los escenarios de pantallas y canales de televisión para proponer una imagen del mundo más caótica y más actual que la de la vieja era del rock épico.',
    credit: 'Collage de tapa de Achtung Baby (Island Records, 1991) · cancionero Hal Leonard',
  },
  {
    id: 'argentina',
    image: '/u2/argentina-sol.jpeg',
    alt: 'Bono canta frente a una pantalla gigante con el sol de la bandera argentina; Adam Clayton toca el bajo',
    position: 'center 40%',
    title: 'Un sol en la pantalla',
    body: 'En La Plata, durante la gira de The Joshua Tree de 2017, la pantalla se tiñó de celeste y blanco y el sol de la bandera ocupó todo el fondo. Unas 48.000 personas por noche, según la prensa del momento, celebraban la intención de U2 de volver a la gran reunión colectiva sin olvidarse nunca del conflicto.',
    credit: 'Foto: público en el Estadio Único de La Plata, 2017 · material aportado por la redacción',
  },
]

export const PROSE_CLOSING = [
  'Cincuenta años después del aviso, U2 volvió al patio de Mount Temple. Tocó “Silencio” rodeada de estudiantes con carteles, a metros del aula donde se juntaron por primera vez.',
  'Hay un disco anunciado para noviembre y rumores de gira. Hasta hoy, ninguna fecha en la Argentina está confirmada.',
]

export const CLOSING: VideoMoment = {
  id: 'silencio',
  src: '/u2/silencio-mount-temple.mp4',
  poster: '/u2/poster-silencio.jpg',
  label: '“Silencio”, en vivo en Mount Temple, 2026',
  quotes: [
    {
      text: 'Primero había que tener algo que decir. Cincuenta años después, siguen buscando cómo decirlo.',
      attribution: '“Silencio”, en vivo en Mount Temple, 2026',
    },
  ],
}

export const CREDITS = [
  'Videos: “Silencio”, en vivo en Mount Temple (2026), y entrevista a Bono sobre el estreno de “Sunday Bloody Sunday” en Belfast. Material aportado por la redacción.',
  'Fotos: archivo de la banda, tapas de Boy (1980) y Achtung Baby (1991), y público en La Plata (2017).',
  'Las citas de Bono provienen de presentaciones en vivo documentadas; no son una transcripción de la entrevista.',
  'Contexto: U2.com, Acuerdo de Belfast (gov.uk) y La Voz (23 de septiembre de 2026).',
]

