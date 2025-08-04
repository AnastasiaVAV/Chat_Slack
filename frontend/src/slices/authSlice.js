import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('userId'))

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
