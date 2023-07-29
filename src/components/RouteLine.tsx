import {
  Marker,
  Polyline
  // Popup
} from 'react-leaflet'

const RouteLine = ({route}) => {
  const {name, points, polyline} = route

  return (
    <>
      <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
      {
        points.map(([lat, lng], key) => {
          return <Marker key={key} position={[lat, lng]} />
        })
      }
    </>
  )
}

export default RouteLine