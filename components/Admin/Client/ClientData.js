import { Table, Col } from 'react-bootstrap';
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
        <RightButton
          // TODO: extend this to a styled component
          onClick={() => setModalShow(true)}
        >
          Redigera
        </RightButton>
      </Col>
      <EditClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={client}
      />
    </SRow>
    // <Div>
    //   <Table responsive size="sm">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Kund</th>
    //         <th>Kontaktperson</th>
    //         <th>Telefonnummer</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>{client.id}</td>
    //         <td>{client.clientName}</td>
    //         <td>{client.contactName}</td>
    //         <td>{client.phoneNumber}</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    //   <RightButton
    //     // TODO: extend this to a styled component
    //     onClick={() => setModalShow(true)}
    //   >
    //     Redigera
    //   </RightButton>
    //   <EditClientModal
    //     show={modalShow}
    //     onHide={() => setModalShow(false)}
    //     client={client}
    //   />
    // </Div>
  );
};
export default ClientData;
