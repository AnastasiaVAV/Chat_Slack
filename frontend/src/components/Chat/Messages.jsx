import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useContext } from 'react'

// import { profanityFilter } from '../../init'
import ContentFilterContext from '../../contexts/ContentFilterContext.jsx'

const Messages = () => {
  const { t } = useTranslation()
  const profanityFilter = useContext(ContentFilterContext)

  const openChannelId = useSelector(state => state.channels.openChannelId)
  const openChannel = useSelector(state => state.channels.channels).find(channel => channel.id === openChannelId)
  const currentMessagesState = useSelector(state => state.messages).filter(({ channelId }) => channelId === openChannelId)

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        {openChannel && (
          <>
            <p className="m-0">
              <b>
                #
                {' '}
                {profanityFilter(openChannel.name)}
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
            {profanityFilter(message.body)}
          </div>
        ))}
      </div>
    </>
  )
}

export default Messages
