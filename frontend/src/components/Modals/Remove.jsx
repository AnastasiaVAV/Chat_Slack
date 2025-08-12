import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import ToastMessage from '../ToastMessage.jsx'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import apiRequests from '../../services/api.js'
import useAuth from '../../hooks/useAuth.js'

const Remove = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isLoading, setLoading] = useState(false)

  const { userToken } = useAuth()
  const currentChannel = useSelector(state => state.modals.item)

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const handleRemoveChannel = async () => {
    try {
      setLoading(true)
      const id = currentChannel.id
      await apiRequests.removeChannel(userToken, id)
      toast.success(
        <ToastMessage>
          {t('chat.popUp.removeChannel')}
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
  }

  return (
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleClose}>
            {t('modal.buttons.cancel')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={isLoading}
            onClick={handleRemoveChannel}
          >
            {t('modal.buttons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
