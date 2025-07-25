const getAuthHeader = (userId) => {
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` }
  }
  return {}
}

export default getAuthHeader
