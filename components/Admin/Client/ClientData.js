import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton, SRow } from '../../../styles/styled';
import EditClientModal from './EditClientModal';
import HeadingData from '../Utils/HeadingData';

const RightButton = styled(SButton)`
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

  return (
    <SRow>
      <Col xs={12} md={9}>
        <HeadingData header="Kund">{client.clientName}</HeadingData>
        <HeadingData header="Kontaktperson">{client.contactName}</HeadingData>
        <HeadingData header="Telefonnummer">{client.phoneNumber}</HeadingData>
      </Col>

      <Col xs={12} md={3}>
        <RightButton onClick={() => setModalShow(true)}>Redigera</RightButton>
      </Col>
      <EditClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={client}
      />
    </SRow>
  );
};
export default ClientData;
