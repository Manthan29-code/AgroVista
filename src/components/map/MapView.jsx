import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapView({ center, markers = [] }) {
  return (
    <div className="h-80 w-full rounded-card overflow-hidden">
      <MapContainer center={[center.lat, center.lng]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m, idx) => (
          <Marker position={[m.lat, m.lng]} key={idx}>
            <Popup>
              <div className="text-sm">
                <div className="font-medium">{m.name}</div>
                <div>{m.distanceKm} km</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
