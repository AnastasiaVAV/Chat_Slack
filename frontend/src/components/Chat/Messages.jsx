import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Messages = () => {
  const { t } = useTranslation()
  const openChannel = useSelector(state => state.channels.openChannel)
  const messagesState = useSelector(state => state.messages)
  const currentMessagesState = messagesState.filter(({ channelId }) => channelId === openChannel.id)

  return (
    <>
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
    </>
  )
}

export default Messages
