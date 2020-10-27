import { Modal } from 'react-bootstrap';

import styled from 'styled-components';
import {
  formatTime,
  formatYear,
} from '../pages/engines/[clientId]/[engineId]/GraphItem';

const NewLineSpan = styled.span`
  white-space: pre-line;
`;

const NoteModal = ({ show, onHide, data }) => {
  const date = new Date(data.date);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
      centered
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Not tillagd: {formatYear(date)} - {formatTime(date)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewLineSpan>{data.note}</NewLineSpan>
      </Modal.Body>
    </Modal>
  );
};

export default NoteModal;
