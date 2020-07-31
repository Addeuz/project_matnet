const { Card, Accordion } = require('react-bootstrap');
const { default: UserData } = require('./UserData');

// Component - returns the card that populates the accordion in /pages/admin/users.js
// props:
//    user - user data that is passed from the map() in /pages/admin/users.js
//    clients - clients added into mätnet
//    roles - roles that exists in mätnet
//    filter - the filter string that is used to determine if a client is to be shown. filtered by username

const UserCard = ({ user, roles, clients, filter }) => (
  <>
    {filter !== '' &&
    user.username.toLowerCase().indexOf(filter.toLowerCase()) === -1 ? null : (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={user.id}>
          {user.username}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={user.id}>
          <UserData user={user} roles={roles} clients={clients} />
        </Accordion.Collapse>
      </Card>
    )}
  </>
);

export default UserCard;
