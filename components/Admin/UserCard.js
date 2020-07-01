const { Card, Accordion } = require('react-bootstrap');
const { default: UserData } = require('./UserData');

const UserCard = ({ user, filter }) => (
  <>
    {filter !== '' &&
    user.username.toLowerCase().indexOf(filter.toLowerCase()) === -1 ? null : (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={user.id}>
          {user.username}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={user.id}>
          <>
            <UserData user={user} />
          </>
        </Accordion.Collapse>
      </Card>
    )}
  </>
);

export default UserCard;
