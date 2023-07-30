import { useMap } from 'react-leaflet'
import L from 'leaflet'

interface Props {
    polyline: number[][] | null
}

const MoveCenter = ({ polyline }: Props) => {
  const map = useMap()

  if (!polyline) return
  
  const mpoly = polyline.map(([lng, lat]) => new L.LatLng(lat, lng))
  const lpoly = L.polyline(mpoly)

  map.fitBounds(lpoly.getBounds())

  return null
}

export default MoveCenter