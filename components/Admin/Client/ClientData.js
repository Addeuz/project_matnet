import { Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { SButton, SRow, WarningText } from '../../../styles/styled';
import EditClientModal from './EditClientModal';
import HeadingData from '../Utils/HeadingData';
import DeleteModal from '../../DeleteModal';
import authHeader from '../../../services/auth-header';

export const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

const RightButtonDelete = styled(Button)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

// Component that handles showing the data of a client
// props:
//    client - client data that is passed from the map in /pages/admin/clients.js

const ClientData = ({ client }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  return (
    <SRow>
      <Col xs={12} md={9}>
        <HeadingData header="Kund">{client.clientName}</HeadingData>
        <HeadingData header="Kontaktperson">{client.contactName}</HeadingData>
        <HeadingData header="Telefonnummer">{client.phoneNumber}</HeadingData>
      </Col>

      <Col xs={12} md={3}>
        <RightButton onClick={() => setModalShow(true)}>Redigera</RightButton>
        <RightButtonDelete
          variant="danger"
          onClick={() => setDeleteModalShow(true)}
        >
          Ta bort
        </RightButtonDelete>
      </Col>
      <EditClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={client}
      />

      <DeleteModal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        onDelete={() => {
          const options = {
            headers: authHeader(),
          };
          axios
            .delete(
              `http://localhost:3000/api/admin/client/${client.id}`,
              options
            )
            .then(response => {
              window.location.reload();
            });
        }}
        title={client.clientName}
      >
        <p>Är du säker på att du vill ta bort {client.clientName}?</p>
        <br />
        <p>
          <WarningText>Varning:</WarningText>
          Om du tar bort kunden kommer alla motorer som kunden har att tas bort!
        </p>
      </DeleteModal>
    </SRow>
  );
};
export default ClientData;
