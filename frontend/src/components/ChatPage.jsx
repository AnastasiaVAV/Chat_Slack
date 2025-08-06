import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { Container, Row, Col, Spinner } from 'react-bootstrap'

import { actions as channelsActions } from '../slices/channelsSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'

import { useGetChannelsQuery } from '../services/channelsApi.js'
import { useGetMessagesQuery } from '../services/messagesApi.js'

import MessageFormFocusProvider from '../contexts/MessageFormFocusProvider.jsx'
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

  const user = useSelector(state => state.authorization)
  const openChannelId = useSelector(state => state.channels.openChannelId)

  const { data: channelsData, isLoading: isChannelsLoading, refetch: refetchChannels } = useGetChannelsQuery()
  const { data: messagesData, isLoading: isMessagesLoading, refetch: refetchMessages } = useGetMessagesQuery()

  useEffect(() => {
    if (!user?.token) {
      navigate('/login')
      return
    }
    refetchChannels()
    refetchMessages()

    if (channelsData && channelsData.length > 0) {
      dispatch(channelsActions.setChannels(channelsData))
      if (!openChannelId) {
        const defaultChannel = channelsData.find(({ name }) => name === 'General') ?? channelsData[0]
        dispatch(channelsActions.setOpenChannelId(defaultChannel.id))
      }
    }

    if (messagesData && messagesData.length > 0) {
      dispatch(messagesActions.setMessages(messagesData))
    }
  }, [user, navigate, dispatch, channelsData, messagesData, refetchChannels, refetchMessages, openChannelId])

  return (
    <>
      {isChannelsLoading || isMessagesLoading
        ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )
        : (
            <MessageFormFocusProvider>
              <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <Row className="h-100 bg-white flex-md-row">
                  <Channels />
                  <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                      <Messages />
                      <MessagesForm />
                    </div>
                  </div>
                </Row>
              </Container>
              <Modal />
            </MessageFormFocusProvider>
          )}
    </>
  )
}

export default ChatPage
