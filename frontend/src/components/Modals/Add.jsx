import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ToastMessage from '../ToastMessage.jsx'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import { actions as channelsActions } from '../../slices/channelsSlice.js'

import validator from '../../utils/channelsValidator.js'
import apiRequests from '../../services/api.js'

const Add = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)

  const channels = useSelector(state => state.channels.channels)
  const userToken = useSelector(state => state.authorization?.token)

  useEffect(() => inputRef.current.focus(), [])

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: validator(channels),
    onSubmit: async (values) => {
      try {
        setLoading(true)
        const newChannel = { name: values.body }
        const channelData = await apiRequests.addChannel(userToken, newChannel)
        dispatch(channelsActions.setOpenChannelId(channelData.id))
        toast.success(
          <ToastMessage>
            {t('chat.popUp.addChannel')}
          </ToastMessage>,
        )
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
        handleClose()
        setLoading(false)
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
              id="body"
            />
            <Form.Label
              className="visually-hidden"
              htmlFor="body"
            >
              {t('modal.addChannel.label')}
            </Form.Label>
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
