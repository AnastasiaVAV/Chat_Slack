import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [], // { id: '1', name: 'general', removable: false}
  openChannelId: {},
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => { // []
      console.log('channels:', payload)
      return { ...state, channels: payload }
    },
    setOpenChannelId: (state, { payload }) => { // id
      console.log('openChannelId', payload)
      return { ...state, openChannelId: payload }
    },
    addChannel: (state, { payload }) => { // { id, name, removable }
      state.channels.push(payload)
    },
    renameChannel: (state, { payload }) => { // { id, name, removable }
      const currentChannel = state.channels.find(channel => channel.id === payload.id)
      currentChannel.name = payload.name
    },
    removeChannel: (state, { payload }) => { // { id: '1' }
      state.channels = state.channels.filter(channel => channel.id !== payload.id)
      if (state.openChannelId === payload.id) {
        const generalChannelId = state.channels.find(channel => channel.name === 'general').id
        state.openChannelId = generalChannelId
      }
    },
  },
})

export const { actions } = channelsSlice
export default channelsSlice.reducer
