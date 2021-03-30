import React from 'react';
import { Col, Button } from 'react-bootstrap';
import Link from 'next/link';

import axios from 'axios';
import styled from 'styled-components';
import { UserContext } from '../UserContext';
import AddNoteModal from './AddNoteModal';
import ShowNotesModal from './ShowNotesModal';
import EditEngineModal from './EditEngineModal';
import FileModal from './FileModal';
import DeleteModal from '../DeleteModal';
import { SButton } from '../../styles/styled';
import authHeader from '../../services/auth-header';

export const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

export const LeftButton = styled(SButton)`
  float: left;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

export const RightButtonDelete = styled(Button)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  /* @media only screen and (max-width: 768px) {
    float: initial;
  } */
`;

const EngineInfoButtonMenu = ({
  clientId,
  engineId,
  engineInfo,
  type,
  engineFiles,
  engineValues,
}) => {
  const [noteModalShow, setNoteModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [addNoteModalShow, setAddNoteModalShow] = React.useState(false);
  const [editEngineModalShow, setEditEngineModalShow] = React.useState(false);
  const [fileModalShow, setFileModalShow] = React.useState(false);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {}, []);
  return (
    <Col xs={12}>
      <Link
        href="/engines/[clientId]/[engineId]/overview/[tagNr]/[type]"
        as={`/engines/${clientId}/${engineId}/overview/${engineInfo.tagNr}/${type}`}
      >
        <a>
          <LeftButton variant="primary">Översikt</LeftButton>
        </a>
      </Link>

      {user &&
      (user.roles[0] === 'ROLE_ADMIN' || user.roles[0] === 'ROLE_MODERATOR') ? (
        <>
          <RightButtonDelete
            variant="danger"
            onClick={() => setDeleteModalShow(true)}
          >
            Ta bort
          </RightButtonDelete>
          <DeleteModal
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            onDelete={() => {
              const options = {
                headers: authHeader(),
              };

              axios
                .delete(
                  `http://localhost:3000/api/moderator/engine/${engineId}`,
                  options
                )
                .then(() => {
                  window.location.reload();
                });
            }}
            title={engineInfo.tagNr}
          >
            <p>Är du säker på att du vill ta bort {engineInfo.tagNr}?</p>
          </DeleteModal>

          <RightButton
            onClick={() => setEditEngineModalShow(true)}
          >{`Redigera ${engineInfo.tagNr}`}</RightButton>
          <EditEngineModal
            show={editEngineModalShow}
            onHide={() => setEditEngineModalShow(false)}
            engine={{
              clientId,
              engineId,
              engineInfo: { ...engineInfo },
              engineValues: { ...engineValues },
            }}
            type={type}
          />

          <RightButton onClick={() => setAddNoteModalShow(true)}>
            Lägg till not
          </RightButton>
          <AddNoteModal
            show={addNoteModalShow}
            onHide={() => setAddNoteModalShow(false)}
            engine={{
              id: engineId,
              tagNr: engineInfo.tagNr,
            }}
          />
        </>
      ) : (
        <></>
      )}
      <RightButton onClick={() => setNoteModalShow(true)}>
        Visa noter
      </RightButton>
      <ShowNotesModal
        show={noteModalShow}
        onHide={() => setNoteModalShow(false)}
        engine={{
          id: engineId,
          tagNr: engineInfo.tagNr,
        }}
      />
      <RightButton
        onClick={() => setFileModalShow(true)}
      >{`Dokument (${engineFiles.length})`}</RightButton>
      <FileModal
        show={fileModalShow}
        onHide={() => setFileModalShow(false)}
        files={engineFiles}
        engineId={engineId}
      />
    </Col>
  );
};

export default EngineInfoButtonMenu;
