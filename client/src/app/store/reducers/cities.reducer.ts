import * as fromCities from '../actions/cities.action';
import { City } from '../../core/models/city.model';
import { createReducer, on } from "@ngrx/store";

export interface CityState {
  data: City[],
  loaded: boolean,
  loading: boolean
}

export const initialState: CityState = {
  data: [],
  loaded: false,
  loading: false
}

export const reducer = createReducer<CityState>(
  initialState,
  on(fromCities.loadCitiesName, (state): CityState => {
    return {
      ...state,
      loading: true,
    }
  }),
  on(fromCities.loadCitiesSuccess, (state, actions): CityState => {
    return {
      ...state,
      loading: false,
      loaded: true,
      data: [...actions.data]
    }
  }),
)

export const getCities = (state: CityState) => state?.data;
export const getECitiesLoading = (state: CityState) => state.loading;
export const getCitiesLoaded = (state: CityState) => state.loaded;
