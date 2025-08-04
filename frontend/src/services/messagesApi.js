import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './baseQuery'

export const messagesApi = createApi({
  reducerPath: 'messagesRequests',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => 'messages',
    }),
    addMessage: builder.mutation({
      query: newMessage => ({
        url: 'messages',
        body: newMessage,
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi
