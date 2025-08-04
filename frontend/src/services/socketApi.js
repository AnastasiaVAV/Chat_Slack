import { createApi } from '@reduxjs/toolkit/query/react'
import { actions as channelsActions } from '../slices/channelsSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'

export const socketApi = createApi({
  reducerPath: 'sockets',
  baseQuery: () => {},
  endpoints: builder => ({
    initSockets: builder.mutation({
      queryFn: ({ dispatch, socket }) => {
        socket.on('newMessage', payload => dispatch(messagesActions.addMessage(payload)))

        socket.on('newChannel', payload => dispatch(channelsActions.addChannel(payload)))
        socket.on('renameChannel', payload => dispatch(channelsActions.renameChannel(payload)))
        socket.on('removeChannel', payload => dispatch(channelsActions.removeChannel(payload)))

        return { data: 'Socket listeners initialized' }
      },
    }),
  }),
})

export const { useInitSocketsListenerMutation } = socketApi
