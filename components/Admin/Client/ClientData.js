import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton } from '../../../styles/styled';

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightButton = styled(SButton)`
  align-self: flex-end;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const ClientData = ({ client }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Div>
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kund</th>
            <th>Kontaktperson</th>
            <th>Telefonnummer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{client.id}</td>
            <td>{client.clientName}</td>
            <td>{client.contactName}</td>
            <td>{client.phoneNumber}</td>
          </tr>
        </tbody>
      </Table>
      <RightButton
        // TODO: extend this to a styled component
        onClick={() => setModalShow(true)}
      >
        Redigera
      </RightButton>
      {/* <EditclientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={client}
      /> */}
    </Div>
  );
};
export default ClientData;
