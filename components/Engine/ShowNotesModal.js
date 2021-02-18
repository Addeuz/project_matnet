import axios from 'axios';
import React from 'react';
import { ListGroupItem, ListGroup, Modal, Button } from 'react-bootstrap';

import styled from 'styled-components';
import {
  formatTime,
  formatYear,
} from '../../pages/engines/[clientId]/[engineId]/GraphItem';

import authHeader from '../../services/auth-header';
import { SButton } from '../../styles/styled';
import NoteModal from '../NoteModal';

const NoteParagraph = styled.li`
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  cursor: pointer;
`;

const NoteItem = styled(ListGroupItem)`
  /* overflow-wrap: break-word; */
`;

const ShowNotesModal = ({ show, onHide, engine }) => {
  const options = {
    headers: authHeader(),
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [notes, setNotes] = React.useState(null);
  const [modalShow, setModalShow] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/api/moderator/notes/${engine.id}`, options)
      .then(serverResponse => {
        setNotes(serverResponse.data.notes);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{`Noter för tag nr:  ${engine.tagNr}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {notes?.map(note => (
            <React.Fragment key={note.date}>
              <NoteItem>
                <h6>
                  {formatYear(new Date(note.date))}{' '}
                  {formatTime(new Date(note.date))}
                </h6>
                <h6>
                  {note.user.firstname} {note.user.lastname}
                </h6>
                <NoteParagraph onClick={() => setModalShow(note.date)}>
                  {note.note}
                </NoteParagraph>
              </NoteItem>
              <NoteModal
                data={note}
                show={modalShow === note.date}
                onHide={() => setModalShow(null)}
              />
            </React.Fragment>
          ))}
          {notes?.length === 0 && (
            <ListGroup.Item>
              Inga noter tillagda på aktuell motor
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Stäng</SButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowNotesModal;
