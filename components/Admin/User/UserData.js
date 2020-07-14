import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton } from '../../../styles/styled';
import EditUserModal from './EditUserModal';

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightButton = styled(SButton)`
  align-self: flex-end;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const UserData = ({ user, roles, clients }) => {
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <Div>
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Användarnamn</th>
            <th>E-mail</th>
            <th>E-mail</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.email}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </Table>
      <RightButton
        // TODO: extend this to a styled component
        onClick={() => setModalShow(true)}
      >
        Redigera
      </RightButton>
      <EditUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
        roles={roles}
        clients={clients}
      />
    </Div>
  );
};
export default UserData;
