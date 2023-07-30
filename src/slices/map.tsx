import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import mockRoutes from '../mocha/routes'
import { notification } from 'antd'
import { v4 as uuidv4 } from 'uuid'

interface MapState {
  selectedRouteId: string | null,
  isLoading: boolean,
  routesDetails: {
    id: string,
    name: string,
    waypoints: number[][]
  }[],
  selectedRoutePolyline: number[][] | null
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

      if (state.selectedRouteId === newSelectedId) {
        state.selectedRouteId = null
        state.selectedRoutePolyline = null

        return
      }

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