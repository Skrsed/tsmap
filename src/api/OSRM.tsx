import axios from 'axios'
import { RouteResults } from 'osrm'

export const getPolyline = (points: number[][] = []): Promise<RouteResults> => {
  const queryPoints = points.map(
    (point) => point.slice().reverse().join(',')
  ).join(';')

  return axios({
    method: 'get',
    url: `http://router.project-osrm.org/route/v1/driving/${queryPoints}?geometries=geojson`
  })
}