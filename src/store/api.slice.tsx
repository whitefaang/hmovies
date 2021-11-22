import { createSlice } from '@reduxjs/toolkit'

const apiSlice = createSlice({
  initialState: {},
  name: 'api',
  reducers: {}
})

export const uiSelect = {}

export const { actions: apiActions, reducer: apiReducer } = apiSlice
