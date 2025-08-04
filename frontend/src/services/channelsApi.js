import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './baseQuery'

export const channelsApi = createApi({
  reducerPath: 'channelsRequests',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    addChannel: builder.mutation({
      query: newChannel => ({
        url: 'channels',
        body: newChannel,
        method: 'POST',
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, editedChannel }) => ({
        url: `channels/${id}`,
        body: editedChannel,
        method: 'PATCH',
      }),
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
