import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Row, Col } from 'react-bootstrap'

import { actions as channelsActions } from '../slices/channelsSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'
import { actions as modalsActions } from '../slices/modalsSlice.js'

import { useGetChannelsQuery } from '../services/channelsApi.js'
import { useGetMessagesQuery } from '../services/messagesApi.js'

import FocusProvider from './Chat/FocusProvider.jsx'
import Channels from './Chat/Channels'
import Messages from './Chat/Messages.jsx'
import MessagesForm from './Chat/MessagesForm.jsx'
import getModal from './Modals/index.js'

const Modal = () => {
  const { type } = useSelector(state => state.modals)
  if (!type) {
    return
  }
  const Component = getModal(type)
  return <Component />
}

const ChatPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const user = useSelector(state => state.authorization)

  const { data: channelsData, isLoading: isChannelsLoading } = useGetChannelsQuery()
  const { data: messagesData, isLoading: isMessagesLoading } = useGetMessagesQuery()

  useEffect(() => {
    if (!user?.token) {
      navigate('/login')
      return
    }

    if (channelsData) {
      dispatch(channelsActions.setChannels(channelsData))
      const defaultChannel = channelsData.find(({ name }) => name === 'General') ?? channelsData[0]
      dispatch(channelsActions.setOpenChannelId(defaultChannel.id))
    }

    messagesData && dispatch(messagesActions.setMessages(messagesData))
  }, [user, navigate, dispatch, channelsData, messagesData])

  return (
    <>
      {isChannelsLoading || isMessagesLoading
        ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              Loading...
            </div>
          )
        : (
            <FocusProvider>
              <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <Row className="h-100 bg-white flex-md-row">
                  <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
                    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                      <b>{t('chat.channels')}</b>
                      <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={() => dispatch(modalsActions.openModal({ type: 'adding' }))}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                        </svg>
                        <span className="visually-hidden">+</span>
                      </button>
                    </div>
                    <Channels />
                  </Col>
                  <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                      <Messages />
                      <MessagesForm />
                    </div>
                  </div>
                </Row>
              </Container>
              <Modal />
            </FocusProvider>
          )}
    </>
  )
}

export default ChatPage

// useEffect(() => {
//   if (!token) {
//     navigate('/login')
//     return
//   }
//   const fetchData = async () => {
//     try {
//       const [channelsRes, messagesRes] = await Promise.all([
//         axios.get(routes.channelsPath(), { headers: authHeader }),
//         axios.get(routes.messagesPath(), { headers: authHeader }),
//       ])
//       dispatch(channelsActions.setChannels(channelsRes.data))
//       dispatch(messagesActions.setMessages(messagesRes.data))

//       if (channelsRes.data.length > 0) {
//         const generalChannelId = channelsRes.data.find(({ name }) => name === 'General') || channelsRes.data[0]
//         dispatch(channelsActions.setOpenChannelId(generalChannelId))
//       }
//     }
//     catch (error) {
//       console.error('Ошибка загрузки:', error)
//     }
//   }
//   fetchData()
// })

// const handleAuthCheck = () => !user?.token && navigate('/login')
// const handleChannelsData = (data) => {
//   if (!data) return
//   dispatch(channelsActions.setChannels(data))
//   const defaultChannel = data.find(({ name }) => name === 'General') ?? data[0]
//   dispatch(channelsActions.setOpenChannelId(defaultChannel.id))
// }
// const handleMessagesData = (data) => {
//   data && dispatch(messagesActions.setMessages(data))
// }
// useEffect(() => {
//   handleAuthCheck()
//   handleChannelsData(channelsData)
//   handleMessagesData(messagesData)
// }, [user, navigate, dispatch, channelsData, messagesData])
