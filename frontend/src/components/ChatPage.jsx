import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import routes from '../routes'
import getUserId from '../utils/getUserId'
import getAuthHeader from '../utils/getAuthHeader'
import { actions as messagesActions } from '../slices/messagesSlice'
import Channels from './Chat/Channels'

const ChatPage = () => {
  const inputMessage = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const openChannel = useSelector(state => state.channels.openChannel)
  const messagesState = useSelector(state => state.messages)
  const currentMessagesState = messagesState.filter(({ channelId }) => channelId === openChannel.id)

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const userId = getUserId()
      const newMessage = { body: values.body, channelId: openChannel.id, username: userId.username }
      const res = await axios.post(routes.messagesPath(), newMessage, { headers: getAuthHeader(userId) })
      dispatch(messagesActions.addMessage(res.data))
      resetForm()
    },
  })

  useEffect(() => {
    const userId = getUserId()
    if (!userId?.token) {
      navigate('/login')
      return
    }
  }, [navigate])

  useEffect(() => inputMessage.current.focus(), [])

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              {openChannel && (
                <>
                  <p className="m-0">
                    <b>
                      #
                      {' '}
                      {openChannel.name}
                    </b>
                  </p>
                  <span className="text-muted">
                    {t('chat.messages.key', { count: currentMessagesState.length })}
                  </span>
                </>
              )}
            </div>

            <div id="messages-box" className="chat-messages overflow-auto px-5">
              {currentMessagesState.map(message => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>
                  {': '}
                  {message.body}
                </div>
              ))}
            </div>

            <div className="mt-auto px-5 py-3">
              <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                <div className="input-group has-validation">
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder={t('chat.form.enterMessage')}
                    className="border-0 p-0 ps-2 form-control"
                    ref={inputMessage}
                  />
                  <button type="submit" disabled="" className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                    </svg>
                    <span className="visually-hidden">{t('chat.form.submit')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default ChatPage

// const ChatPage = () => {
//   const userId = getUserId()
//   const inputMessage = useRef()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const channelsState = useSelector(state => state.channels.channels)
//   const openChannel = useSelector(state => state.channels.openChannel)
//   const messagesState = useSelector(state => state.messages)
//   const [isLoading, setIsLoading] = useState(true)
//   const { t } = useTranslation()
//   const formik = useFormik({
//     initialValues: {
//       body: '',
//     },
//     onSubmit: async (values) => {
//       const newMessage = { body: values.body, channelId: openChannel.id, username: userId.username }
//       const res = await axios.post(routes.messagesPath(), newMessage, { headers: getAuthHeader(userId) })
//       dispatch(messagesActions.addMessage(res.data))
//     },
//   })

//   useEffect(() => {
//     inputMessage.current.focus()
//     const userId = getUserId()
//     if (!userId?.token) {
//       navigate('/login')
//       return
//     }

//     const fetchData = async () => {
//       try {
//         const [channelsRes, messagesRes] = await Promise.all([
//           axios.get(routes.channelsPath(), { headers: getAuthHeader(userId) }),
//           axios.get(routes.messagesPath(), { headers: getAuthHeader(userId) }),
//         ])
//         dispatch(setChannels(channelsRes.data))
//         dispatch(messagesActions.setMessages(messagesRes.data))

//         if (channelsRes.data.length > 0) {
//           const generalChannelId = channelsRes.data.find(({ name }) => name === 'General') || channelsRes.data[0]
//           dispatch(setOpenChannel(generalChannelId))
//         }
//       }
//       catch (error) {
//         console.error('Ошибка загрузки:', error)
//       }
//       finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()
//   }, [dispatch, navigate])

//   const channelsClasses = channel => cn('w-100 rounded-0 text-start btn', {
//     'btn-secondary': channel.id === openChannel.id,
//   })

//   return (
//     <Container className="h-100 my-4 overflow-hidden rounded shadow">
//       <Row className="h-100 bg-white flex-md-row">
//         <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">

//           {/* Каналы */}
//           <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
//             <b>{t('chat.channels')}</b>
//             <button type="button" className="p-0 text-primary btn btn-group-vertical">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
//                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
//                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
//               </svg>
//               <span className="visually-hidden">+</span>
//             </button>
//           </div>
//           <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
//             {channelsState.map(channel => (
//               <li key={channel.id} className="nav-item w-100">
//                 <button type="button" className={channelsClasses(channel)} onClick={() => dispatch(setOpenChannel(channel))}>
//                   <span className="me-1">#</span>
//                   {channel.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </Col>

//         <div className="col p-0 h-100">
//           <div className="d-flex flex-column h-100">
//             <div className="bg-light mb-4 p-3 shadow-sm small">
//               {isLoading
//                 ? (
//                     <p>{t('chat.loadingChannel')}</p>
//                   )
//                 : (
//                     openChannel && (
//                       <>
//                         <p className="m-0">
//                           <b>
//                             #
//                             {' '}
//                             {openChannel.name}
//                           </b>
//                         </p>
//                         <span className="text-muted">
//                           {t('chat.messages.key', { count: messagesState.filter(({ channelId }) => channelId === openChannel.id).length })}
//                         </span>
//                       </>
//                     )
//                   )}
//             </div>

//             <div id="messages-box" className="chat-messages overflow-auto px-5">
//               <div className="text-break mb-2">
//                 <b>admin</b>
//                 : а
//               </div>
//               <div className="text-break mb-2">
//                 <b>admin</b>
//                 : и
//               </div>
//             </div>

//             <div className="mt-auto px-5 py-3">
//               <form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
//                 <div className="input-group has-validation">
//                   <input
//                     onChange={formik.handleChange}
//                     value={formik.values.body}
//                     name="body"
//                     aria-label="Новое сообщение"
//                     placeholder={t('chat.form.enterMessage')}
//                     className="border-0 p-0 ps-2 form-control"
//                     ref={inputMessage}
//                   />
//                   <button type="submit" disabled="" className="btn btn-group-vertical">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
//                       <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
//                     </svg>
//                     <span className="visually-hidden">{t('chat.form.submit')}</span>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </Row>
//     </Container>
//   )
// }
