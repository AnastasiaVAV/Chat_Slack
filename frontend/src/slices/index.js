import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import channelsSlice from './channelsSlice.js'
import messagesSlice from './messagesSlice.js'
import modalsSlice from './modalsSlice.js'

export default configureStore({
  reducer: {
    authorization: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalsSlice,
  },
})
