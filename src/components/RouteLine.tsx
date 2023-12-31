import {
  Marker,
  Polyline
} from 'react-leaflet'
import { LatLng } from 'leaflet'

interface Props {
  waypoints?: number[][],
  polyline?: number[][] | null
}

const pathOptions = {
  color: 'green'
}

const RouteLine = ({ waypoints, polyline }: Props) => {
  if (!waypoints || !polyline) return

  const reversed = polyline.map(([lng, lat]) => new LatLng(lat, lng))

  return (
    <>
      <Polyline pathOptions={pathOptions} positions={reversed} />
      {
        waypoints?.map(([lat, lng], key) => {
          return <Marker key={key} position={[lat, lng]} />
        })
      }
    </>
  )
}

export default RouteLine