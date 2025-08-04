import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'

export const authApi = createApi({
  reducerPath: 'authRequests',
  baseQuery: baseQuery,
  endpoints: builder => ({
    addUser: builder.mutation({
      query: newUser => ({
        url: 'signup',
        body: newUser,
        method: 'POST',
      }),
    }),
    logIn: builder.mutation({
      query: user => ({
        url: 'login',
        body: user,
        method: 'POST',
      }),
    }),
  }),
})

export const { useAddUserMutation, useLogInMutation } = authApi
