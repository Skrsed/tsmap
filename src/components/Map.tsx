import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import RouteLine from './RouteLine'
import MoveCenter from './MoveCenter'
import { useAppSelector } from '../hooks/redux'
import { LatLngTuple } from 'leaflet'

const Map = () => {
  const selectedRouteId = useAppSelector((state) => state.map.selectedRouteId)
  const selectedRouteWaypoints = useAppSelector((state) => state.map.routesDetails
    .find(({ id }) => id === selectedRouteId))
    ?.waypoints

  const selectedRoutePoly = useAppSelector((state) => state.map.selectedRoutePolyline)

  const defaultCenter: LatLngTuple = [59.9386, 30.3141]

  const center = selectedRouteWaypoints?.[0] as LatLngTuple || defaultCenter
  
  return (
    <MapContainer
      style={{ height: '100vh', flex: 1 }}
      center={center}
      zoom={16}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <MoveCenter polyline={selectedRoutePoly}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        detectRetina={true}
      />
      <RouteLine
        waypoints={selectedRouteWaypoints}
        polyline={selectedRoutePoly}
      />
    </MapContainer>
  )
}

export default Map