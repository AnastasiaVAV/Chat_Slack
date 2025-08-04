import { useDispatch, useSelector } from 'react-redux'
import { useContext, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import { actions as channelsActions } from '../../slices/channelsSlice.js'

import { useAddChannelMutation } from '../../services/channelsApi.js'
import { MessageFormContext } from '../../../contexts/MessageFormContext.jsx'
import validator from '../../utils/channelsValidator.js'

const Add = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { setFocus } = useContext(MessageFormContext)

  const channels = useSelector(state => state.channels.channels)

  const [addChannel, { isLoading }] = useAddChannelMutation()

  useEffect(() => inputRef.current?.focus(), [])

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: validator(channels),
    onSubmit: async (values) => {
      try {
        const newChannel = { name: values.body }
        const channelData = await addChannel(newChannel).unwrap()

        dispatch(channelsActions.setOpenChannelId(channelData.id))
        handleClose()
        setFocus()
        toast.success(t('chat.popUp.addChannel'))
      }
      catch (error) {
        handleClose()
        console.log(error)
        toast.error(t('chat.popUp.error'))
      }
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
          disabled={isLoading}
          onClick={formik.handleSubmit}
        >
          {t('modal.buttons.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Add
