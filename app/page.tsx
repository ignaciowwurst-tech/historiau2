import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import worldAtlas from 'world-atlas/countries-10m.json'
import U2Story from './u2-story'
import { getNorthernIrelandFeature } from './u2-story-data'

const topology = worldAtlas as unknown as Parameters<typeof feature>[0]
const countryCollection = feature(topology, 'countries') as unknown as FeatureCollection<Geometry, { name: string }>
const ireland = countryCollection.features.find((country) => country.properties.name === 'Ireland')
const unitedKingdom = countryCollection.features.find((country) => country.properties.name === 'United Kingdom')
const northernIreland = unitedKingdom ? getNorthernIrelandFeature(unitedKingdom) : null
const mapFeatures: FeatureCollection<Geometry, { name: string }> = {
  type: 'FeatureCollection',
  features: [ireland, northernIreland].filter(Boolean) as unknown as FeatureCollection<Geometry, { name: string }>['features'],
}

export default function Page() {
  return <U2Story mapFeatures={mapFeatures} />
}
