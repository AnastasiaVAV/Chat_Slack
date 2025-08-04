import { useSelector } from 'react-redux'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'

import { MessageFormContext } from '../../../contexts/MessageFormContext'
import { useAddMessageMutation } from '../../services/messagesApi'

const MessagesForm = () => {
  const { t } = useTranslation()
  const { focusRef, setFocus } = useContext(MessageFormContext)

  const user = useSelector(state => state.authorization)
  const openChannelId = useSelector(state => state.channels.openChannelId)

  const [addMessage, { isLoading }] = useAddMessageMutation()

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const newMessage = { body: values.body, channelId: openChannelId, username: user.username }
      addMessage(newMessage)
      resetForm()
      setFocus()
    },
  })

  useEffect(() => setFocus(), [setFocus])

  return (
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
            ref={focusRef}
          />
          <button type="submit" disabled={!formik.values.body.trim()} className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
            </svg>
            <span className="visually-hidden">{t('chat.form.submit')}</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessagesForm
