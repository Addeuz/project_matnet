import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton, SRow } from '../../../styles/styled';
import EditUserModal from './EditUserModal';
import HeadingData from '../Utils/HeadingData';

const CustomerDiv = styled.div`
  height: 150px;
  overflow: auto;

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

// Component that handles showing the data of a user
// props:
//    user - client data that is passed from the map in /pages/admin/users.js
//    clients - clients added into mätnet
//    roles - roles that exists in mätnet

const UserData = ({ user, roles, clients }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <SRow>
      <Col xs={12} md={5}>
        <HeadingData header="Användarnamn">{user.username}</HeadingData>
        <HeadingData header="Förnamn">{user.firstname}</HeadingData>
        <HeadingData header="Efternamn">{user.lastname}</HeadingData>
        <HeadingData header="Email">{user.email}</HeadingData>
      </Col>
      <Col xs={12} md={4}>
        {user.roles[0] ? (
          <HeadingData header="Roll">{user.roles[0].name}</HeadingData>
        ) : (
          <HeadingData header="Roll">Ingen roll tilldelad</HeadingData>
        )}
        <HeadingData header="Kunder">
          <CustomerDiv>
            {user.clients[0] ? (
              user.clients.map(client => (
                <p key={client.id}>{client.clientName}</p>
              ))
            ) : (
              <p>Inga kunder tillagda</p>
            )}
          </CustomerDiv>
        </HeadingData>
      </Col>
      <Col xs={12} md={3}>
        <RightButton
          // TODO: extend this to a styled component
          onClick={() => setModalShow(true)}
        >
          Redigera
        </RightButton>
      </Col>
      <EditUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
        roles={roles}
        clients={clients}
      />
    </SRow>
  );
};
export default UserData;
