import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Modal, Button, Form } from 'react-bootstrap'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import { actions as channelsActions } from '../../slices/channelsSlice.js'

import { useAddChannelMutation } from '../../services/channelsApi.js'
// import { MessageFormContext } from '../../../contexts/MessageFormContext.jsx'

import validator from '../../utils/channelsValidator.js'

const Add = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  // const { focusRef, setFocus } = useContext(MessageFormContext)

  const user = useSelector(state => state.authorization)
  const channels = useSelector(state => state.channels.channels)
  // const openChannelId = useSelector(state => state.channels.openChannelId)
  const currentUsername = useSelector(state => state.authorization.username)

  const [addChannel] = useAddChannelMutation()

  useEffect(() => inputRef.current?.focus(), [])

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: validator(channels),
    onSubmit: async (values) => {
      const newChannel = { name: values.body }
      const channelData = await addChannel(newChannel).unwrap()
      console.log('newChannel:', channelData)
      if (user.username === currentUsername) {
        dispatch(channelsActions.setOpenChannelId(channelData.id))
      }
      handleClose()
    },
  })

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.body}
              isInvalid={formik.touched.body && !!formik.errors.body}
              name="body"
            />
            <Form.Control.Feedback type="invalid">
              {t(formik.errors.body)}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.buttons.cancel')}
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={formik.handleSubmit}
        >
          {t('modal.buttons.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Add
