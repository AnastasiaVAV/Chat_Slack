import { createSlice } from '@reduxjs/toolkit'
import getUserId from '../utils/getUserId'

const initialState = getUserId()

const authSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      return payload
    },
    logOut: () => {
      return null
    },
  },
})

export const { actions } = authSlice
export default authSlice.reducer
