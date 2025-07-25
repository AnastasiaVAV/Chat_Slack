import { createSlice } from '@reduxjs/toolkit'

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (state, action) => {
      console.log('messages:', action.payload)
      return action.payload
    },
    addMessage: (state, action) => {
      console.log('new message:', action.payload)
      state.push(action.payload)
    },
  },
})

export const { actions } = messagesSlice
export default messagesSlice.reducer
