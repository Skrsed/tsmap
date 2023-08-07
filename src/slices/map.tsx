import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mockRoutes from '../mocha/routes'
import { notification } from 'antd'
import { v4 as uuidv4 } from 'uuid'

export interface MapState {
  selectedRouteId: string | null,
  isLoading: boolean,
  routesDetails: RouteDetails[],
  selectedRoutePolyline: number[][] | null
}

export interface RouteDetails {
  id: string,
  name: string,
  waypoints: number[][]
}
  
const initialState: MapState = {
  selectedRouteId: null,
  isLoading: false,
  routesDetails: mockRoutes.map(({ name, waypoints }) => {
    return {
      id: uuidv4(),
      name,
      waypoints
    }
  }),
  selectedRoutePolyline: null
}
  
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // make type
    fetchedPolyline(state, action) {
      const { payload: { polyline } } = action

      state.selectedRoutePolyline = polyline
    },
    failFetchedPolyline(state, action) {
      state.selectedRouteId = null
      state.selectedRoutePolyline = null

      notification.error({
        // TODO: localization
        message: 'Не удалось получить маршрут',
        description: action.payload
      })
    },
    selectRoute(state, action: PayloadAction<string>) {
      const newSelectedId = action.payload

      state.selectedRouteId = newSelectedId
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  }
})
  
export const {
  selectRoute,
  fetchedPolyline,
  failFetchedPolyline,
  setIsLoading
} = mapSlice.actions

export default mapSlice.reducer