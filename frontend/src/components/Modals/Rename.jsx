import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import useAuth from '../../hooks/useAuth.js'

import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import routes from '../../routes.js'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import validator from '../../utils/channelsValidator.js'

const Rename = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { authHeader } = useAuth()

  const channels = useSelector(state => state.channels.channels)
  const currentChannel = useSelector(state => state.modals.item)

  useEffect(() => inputRef.current.select(), [])

  const formik = useFormik({
    initialValues: { body: currentChannel.name },
    validationSchema: validator(channels),
    onSubmit: async (values) => {
      const editedChannel = { name: values.body }
      const res = await axios.patch(routes.channelPath(currentChannel.id), editedChannel, { headers: authHeader })
      console.log('editedChannel:', res.data)
      dispatch(modalsActions.hideModal())
    },
  })

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.renameChannel.title')}</Modal.Title>
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

export default Rename
