import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Modal, Button } from 'react-bootstrap'

import { actions as modalsActions } from '../../slices/modalsSlice.js'
import { useRemoveChannelMutation } from '../../services/channelsApi.js'

const Remove = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [removeChannel] = useRemoveChannelMutation()

  const currentChannel = useSelector(state => state.modals.item)

  const handleClose = () => {
    dispatch(modalsActions.hideModal())
  }

  const handleRemoveChannel = async () => {
    const id = currentChannel.id
    await removeChannel(id).unwrap()
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
