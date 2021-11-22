import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { uiReducer } from './ui.slice'

const reducer = combineReducers({
  ui: uiReducer
})
export const store = configureStore({
  reducer,
  devTools: true
})
export type RootState = ReturnType<typeof store.getState>
