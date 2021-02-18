import axios from 'axios';
import { Col, Row, Modal, Button } from 'react-bootstrap';

import styled from 'styled-components';
import {
  formatTime,
  formatYear,
} from '../pages/engines/[clientId]/[engineId]/GraphItem';
import authHeader from '../services/auth-header';
import { SAlert } from '../styles/styled';
import { UserContext } from './UserContext';

const NewLineSpan = styled.span`
  white-space: pre-line;
  overflow-wrap: break-word;
`;

const NoteModal = ({ show, onHide, data }) => {
  const date = new Date(data.date);

  const { user } = React.useContext(UserContext);

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Not tillagd: {formatYear(date)} - {formatTime(date)}
          <h6>
            {data.user.firstname} {data.user.lastname}
          </h6>
          <h6>Tag nr: {data.engine.engineInfo.tagNr}</h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NewLineSpan>{data.note}</NewLineSpan>
      </Modal.Body>
      {user?.roles[0] === 'ROLE_ADMIN' ||
      user?.roles[0] === 'ROLE_MODERATOR' ? (
        <Modal.Footer>
          <Row className="w-100 m-0 flex-column">
            <Col>
              {message && <SAlert variant="success">{message}</SAlert>}
              {error && <SAlert variant="danger">{error}</SAlert>}
            </Col>
            <Col className="text-right">
              <Button
                variant="danger"
                onClick={() => {
                  const options = {
                    headers: authHeader(),
                  };

                  axios
                    .delete(
                      `/api/moderator/notes/${data.id}/${data.engineId}`,
                      options
                    )
                    .then(response => {
                      console.log(response.data);
                      setMessage(response.data.message);
                    })
                    .catch(err => {
                      setError(err.response.data.message);
                      console.log(err.response.data.message);
                    });
                }}
              >
                Ta bort not
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default NoteModal;
