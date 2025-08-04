import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authorization?.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQuery = fetchBaseQuery({ baseUrl: '/api/v1' })
