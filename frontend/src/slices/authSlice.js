import { createSlice } from '@reduxjs/toolkit'
import getUserId from '../utils/getUserId'

const initialState = getUserId()

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state = action.payload
    }
  }
})

export const { logIn } = authSlice.actions
export default authSlice.reducer