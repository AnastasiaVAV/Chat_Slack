import { createSlice } from '@reduxjs/toolkit'
import { actions as channelsActions } from './channelsSlice.js'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [], // {body: '1', channelId: '1', username: 'admin', removable: true, id: '5'}
  reducers: {
    setMessages: (state, { payload }) => { // []
      console.log('messages:', payload)
      return payload
    },
    addMessage: (state, { payload }) => { // {body: '2', channelId: '1', username: 'admin', removable: true, id: '13'}
      console.log('new message:', payload)
      state.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => { // { id: '1' } (channel's id)
      return state.filter(message => message.channelId !== payload.id)
    })
  },
})

export const { actions } = messagesSlice
export default messagesSlice.reducer
