import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function DeleteModal({ show, onClose, onConfirm, isDeleting, productTitle }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to delete{' '}
          <strong>{productTitle || 'this product'}</strong>?
        </p>

        <p className="text-muted small mb-0">
          FakeStoreAPI is a mock API. Delete requests return success, but the
          product will not be permanently removed.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal