import { useSelector } from 'react-redux'

const useAuth = () => {
  const userToken = useSelector(state => state.authorization?.token)
  const logIn = (userData) => {
    return localStorage.setItem('userId', JSON.stringify(userData))
  }
  const logOut = () => localStorage.removeItem('userId')
  return { userToken, logIn, logOut }
}

export default useAuth
