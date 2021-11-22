import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMovieDetail } from 'models/api.model'
import { RootState } from 'store'

const initialState: { movies: IMovieDetail[] } = {
  movies: []
}

const uiSlice = createSlice({
  initialState,
  name: 'ui',
  reducers: {
    rateMovie: (
      state,
      action: PayloadAction<{ movie: IMovieDetail; rating: number }>
    ) => {
      const movie = state.movies.find((m) => m.id === action.payload.movie.id)
      if (movie) {
        state.movies = state.movies.map((m) => {
          if (m.id === action.payload.movie.id) {
            return Object.assign(Object.assign(m, action.payload.movie), {
              myRating: action.payload.rating
            })
          }
          return m
        })
      } else {
        state.movies.push(
          Object.assign(Object.assign({}, action.payload.movie), {
            myRating: action.payload.rating
          })
        )
      }
    }
  }
})

export const uiSelect = {
  getMyMovies: (state: RootState) => state.ui.movies.filter((m) => m.myRating)
}

export const { actions: uiActions, reducer: uiReducer } = uiSlice
