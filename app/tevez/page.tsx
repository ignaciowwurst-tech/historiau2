import type { Metadata } from 'next'
import TevezCarouselStudio from '../tevez-carousel-studio'

export const metadata: Metadata = {
  title: 'Carlos Tévez: de Fuerte Apache al mundo | Cancha de Autor',
  description: 'Un carrusel periodístico sobre la carrera de Carlos Tévez: su infancia, el debut, sus clubes y la despedida en La Bombonera.',
}

export default function TevezPage() {
  return <TevezCarouselStudio />
}
