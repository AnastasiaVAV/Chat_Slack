import getUserId from '../utils/getUserId'
import getAuthHeader from '../utils/getAuthHeader'

const useAuth = () => {
  const userId = getUserId()
  const authHeader = getAuthHeader(userId)
  return { userId, authHeader }
}

export default useAuth
