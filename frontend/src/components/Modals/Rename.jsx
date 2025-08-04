import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

import { profanityFilter } from '../../init.js'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import { useRenameChannelMutation } from '../../services/channelsApi.js'
import validator from '../../utils/channelsValidator.js'

const Rename = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [renameChannel] = useRenameChannelMutation()

  const channels = useSelector(state => state.channels.channels)
  const currentChannel = useSelector(state => state.modals.item)

  useEffect(() => inputRef.current.select(), [])

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const formik = useFormik({
    initialValues: { body: currentChannel.name },
    validationSchema: validator(channels),
    onSubmit: async (values) => {
      try {
        const editedChannel = { name: values.body }
        const id = currentChannel.id
        await renameChannel({ id, editedChannel }).unwrap()
          .then(() => handleClose())
          .then(() => toast.success(t('chat.popUp.renameChannel')))
      }
      catch {
        handleClose()
        toast.error(t('chat.popUp.error'))
      }
    },
  })

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
              value={profanityFilter(formik.values.body)}
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
