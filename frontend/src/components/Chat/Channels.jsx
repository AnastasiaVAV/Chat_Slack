import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'

import { Col } from 'react-bootstrap'

import cn from 'classnames'

import { actions as channelsActions } from '../../slices/channelsSlice.js'
import { actions as modalsActions } from '../../slices/modalsSlice.js'
import ContentFilterContext from '../../contexts/ContentFilterContext.jsx'

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const profanityFilter = useContext(ContentFilterContext)

  const channelsState = useSelector(state => state.channels.channels)
  const openChannelId = useSelector(state => state.channels.openChannelId)

  const channelClasses = channel => cn('w-100 rounded-0 text-start text-truncate btn', {
    'btn-secondary': channel.id === openChannelId,
  })

  const handleChangeOpenChannel = (id) => {
    dispatch(channelsActions.setOpenChannelId(id))
  }

  const handleOpenModal = (type, item = null) => dispatch(modalsActions.openModal({ type, item }))

  return (
    <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleOpenModal('adding')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">{t('chat.addChannelBtn')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsState.map(channel => (
          <li key={channel.id} className="nav-item w-100">
            <Dropdown role="group" className="d-flex dropdown btn-group">
              <button
                type="button"
                className={channelClasses(channel)}
                onClick={() => handleChangeOpenChannel(channel.id)}
              >
                <span className="me-1">#</span>
                {profanityFilter(channel.name)}
              </button>
              {channel.removable && (
                <>
                  <Dropdown.Toggle
                    split
                    variant={channel.id === openChannelId ? 'secondary' : ''}
                    className="flex-grow-0 dropdown-toggle-split"
                  >
                    <span className="visually-hidden">{t('chat.channelMenu.dropdownEl')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleOpenModal('removing', channel)}>
                      {t('chat.channelMenu.removeBtn')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleOpenModal('renaming', channel)}>
                      {t('chat.channelMenu.renameBtn')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          </li>
        ))}
      </ul>
    </Col>
  )
}

export default Channels
