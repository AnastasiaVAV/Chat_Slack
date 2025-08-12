import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container, Row, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { actions as channelsActions } from '../slices/channelsSlice.js'
import { actions as messagesActions } from '../slices/messagesSlice.js'

import Channels from './Chat/Channels'
import Messages from './Chat/Messages.jsx'
import MessagesForm from './Chat/MessagesForm.jsx'
import getModal from './Modals/index.js'
import ToastMessage from './ToastMessage.jsx'

import apiRequests from '../services/api.js'
import useAuth from '../hooks/useAuth.js'

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
  const { t } = useTranslation()
  const { userToken } = useAuth()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelsData = await apiRequests.getChannels(userToken)
        const messagesData = await apiRequests.getMessages(userToken)

        if (channelsData?.length > 0) dispatch(channelsActions.setChannels(channelsData))

        if (messagesData?.length > 0) dispatch(messagesActions.setMessages(messagesData))
      }
      catch (err) {
        toast.error(
          <ToastMessage>
            {t('chat.popUp.fetchError')}
          </ToastMessage>,
        )
        throw err
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userToken, dispatch, t])

  return (
    <>
      {isLoading
        ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )
        : (
            <>
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
            </>
          )}
    </>
  )
}

export default ChatPage
