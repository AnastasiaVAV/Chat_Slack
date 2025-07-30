import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useAuth from '../../hooks/useAuth.js'

import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import routes from '../../routes.js'

import { actions as modalsActions } from '../../slices/modalsSlice.js'

const Remove = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { authHeader } = useAuth()

  const currentChannel = useSelector(state => state.modals.item)

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const handleRemoveChannel = async () => {
    const res = await axios.delete(routes.channelPath(currentChannel.id), { headers: authHeader })
    console.log('removeChannel:', res.data)
    dispatch(modalsActions.hideModal())
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
