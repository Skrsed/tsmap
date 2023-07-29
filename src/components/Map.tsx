import {
  MapContainer,
  Marker,
  TileLayer,
  Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RouteLine from './RouteLine'
import routes from '../mocha/routes.tsx'

const Map = () => {
  const firstRoute = routes[0]
  const position = firstRoute?.points[0]

  console.log({firstRoute, position, routes})

  return (
    <MapContainer
      style={{ height: '100vh', flex: 1 }}
      center={position}
      zoom={16}
      maxZoom={18}
      scrollWheelZoom={true}
      //detectRetina={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //tileSize={512}
        //zoomOffset={-1}
        detectRetina={true}
      />
      {/* TODO: routeLayer */}
      <RouteLine route={firstRoute} />
    </MapContainer>
  )
}

export default Map