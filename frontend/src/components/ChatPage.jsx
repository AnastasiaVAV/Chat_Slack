import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux' 
import { useEffect } from 'react'
import axios from 'axios'
import routes from '../routes'
import getUserId from '../utils/getUserId'
import { setChannels } from '../slices/channelsSlice'
import { setMessages } from '../slices/messagesSlice'

const getAuthHeader = (userId) => {
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` }
  }

  return {}
}

const ChatPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const state = useSelector(state => state.channels)

  useEffect(() => {
    const userId = getUserId()

    if (!userId?.token) {
      navigate('/login')
    } 
    else {
      const fetchChannels = async () => {
        const res = await axios.get(routes.channelsPath(), { 
          headers: getAuthHeader(userId) 
        })
        dispatch(setChannels(res.data))
      }

      const fetchMessages = async () => {
        const res = await axios.get(routes.messagesPath(), {
          headers: getAuthHeader(userId) 
        })
        dispatch(setMessages(res.data))
      }
      fetchChannels()
      fetchMessages()
    }
  }, [dispatch, navigate])

  return (
    <ul>
      {state.map(channel => <li key={channel.id}>{channel.name}</li>)}
    </ul>
  )
}

export default ChatPage
