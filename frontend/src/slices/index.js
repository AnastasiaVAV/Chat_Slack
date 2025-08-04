import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice.js'
import channelsSlice from './channelsSlice.js'
import messagesSlice from './messagesSlice.js'
import modalsSlice from './modalsSlice.js'
import { socketApi } from '../services/socketApi.js'
import { authApi } from '../services/authApi.js'
import { channelsApi } from '../services/channelsApi.js'
import { messagesApi } from '../services/messagesApi.js'

export default configureStore({
  reducer: {
    authorization: authSlice,
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalsSlice,
    [socketApi.reducerPath]: socketApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
    socketApi.middleware,
    authApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
})
