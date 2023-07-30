import { call, put, takeLatest, select } from 'redux-saga/effects'
import { selectRoute, fetchedPolyline, failFetchedPolyline, setIsLoading } from '../slices/map'
import { getPolyline } from '../api/OSRM'
import { RouteResults } from 'osrm'
import { AxiosResponse } from 'axios'
import { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface RouteDetails {
  id: string,
  name: string,
  waypoints: number[][]
}

const getRoute = (state: RootState, action: PayloadAction<string>): RouteDetails | undefined =>
  state.map.routesDetails.find(({ id }: {id: string}) => id === action.payload)

function* fetchPolyline(action: PayloadAction<string>) {
  try {
    yield put(setIsLoading(true))

    const rotue: RouteDetails = yield select(getRoute, action)

    const result: AxiosResponse<RouteResults> = yield call(getPolyline, rotue.waypoints)

    const polyline = result.data.routes[0].geometry.coordinates

    yield put(fetchedPolyline({ polyline, id: action.payload }))
  } catch (err) {

    yield put(failFetchedPolyline((err as Error).message))
  } finally {

    yield put(setIsLoading(false))
  }
}

function* mapSaga() {
  yield takeLatest(selectRoute, fetchPolyline)
}

export default mapSaga