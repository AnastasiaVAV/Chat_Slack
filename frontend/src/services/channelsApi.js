import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './baseQuery'

export const channelsApi = createApi({
  reducerPath: 'channelsRequests',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Channels'],
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => 'channels',
      // providesTags: ['Channels'],
    }),
    addChannel: builder.mutation({
      query: newChannel => ({
        url: 'channels',
        body: newChannel,
        method: 'POST',
      }),
      // invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: ({ id, editedChannel }) => ({
        url: `channels/${id}`,
        body: editedChannel,
        method: 'PATCH',
      }),
      // invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Channels'],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi
