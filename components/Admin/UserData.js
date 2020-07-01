import { Table } from 'react-bootstrap';

import SButton from '../../styles/SButton';
import EditUserModal from './EditUserModal';

const UserData = ({ user }) => {
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="d-flex flex-column">
      <Table responsive size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Användarnamn</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </Table>
      <SButton
        className="align-self-end mr-2 mb-2"
        onClick={() => setModalShow(true)}
      >
        Redigera
      </SButton>
      <EditUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={user}
      />
    </div>
  );
};
export default UserData;
