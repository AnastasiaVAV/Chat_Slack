import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  openChannel: {},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      console.log('channels:', payload)
      return { ...state, channels: payload }
    },
    setOpenChannel: (state, { payload }) => {
      return { ...state, openChannel: payload }
    },
  },
})

export const { actions } = channelsSlice
export default channelsSlice.reducer
