import { Modal, Button } from 'react-bootstrap';
import { SButton } from '../styles/styled';

const DeleteModal = ({ title, show, onHide, children, onDelete }) => (
  <Modal show={show} onHide={onHide} centered size="md">
    <Modal.Header closeButton>
      <Modal.Title>{`Redigera ${title}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <SButton onClick={onHide}>Ångra</SButton>
      <Button variant="danger" onClick={onDelete}>
        Ta bort
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
