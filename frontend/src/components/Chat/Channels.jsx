import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import cn from 'classnames'
import routes from '../../routes.js'
import getUserId from '../../utils/getUserId'
import getAuthHeader from '../../utils/getAuthHeader.js'
import { actions as channelsActions } from '../../slices/channelsSlice.js'

const Channels = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const channelsState = useSelector(state => state.channels.channels)
  const openChannel = useSelector(state => state.channels.openChannel)

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const userId = getUserId()
        const res = await axios.get(routes.channelsPath(), { headers: getAuthHeader(userId) })
        dispatch(channelsActions.setChannels(res.data))

        if (res.data.length > 0) {
          const generalChannelId = res.data.find(({ name }) => name === 'General') || res.data[0]
          dispatch(channelsActions.setOpenChannel(generalChannelId))
        }
      }
      catch (error) {
        console.error('Ошибка загрузки:', error)
      }
    }

    fetchChannels()
  }, [dispatch, navigate])

  const channelsClasses = channel => cn('w-100 rounded-0 text-start btn', {
    'btn-secondary': channel.id === openChannel.id,
  })

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsState.map(channel => (
          <li key={channel.id} className="nav-item w-100">
            <button type="button" className={channelsClasses(channel)} onClick={() => dispatch(channelsActions.setOpenChannel(channel))}>
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </Col>
  )
}

export default Channels
