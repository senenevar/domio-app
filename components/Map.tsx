import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const cities: Record<string, [number, number]> = {
  Riga: [56.9496, 24.1052],
  Daugavpils: [55.874, 26.536],
  Liepaja: [56.511, 21.0136],
  Jelgava: [56.652, 23.712],
  Ventspils: [57.39, 21.57],
}

export default function Map({ listings }: any) {
  return (
    <MapContainer center={[56.9496, 24.1052]} zoom={7} className="w-full h-full z-0">
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listings.map((listing: any) => {
        const loc = cities[listing.location] || [56.9496, 24.1052]
        return (
          <Marker key={listing.id} position={loc}>
            <Popup>
              <strong>{listing.title}</strong><br />
              💶 {listing.price} €<br />
              📍 {listing.location}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}