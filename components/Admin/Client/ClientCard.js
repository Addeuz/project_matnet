const { Card, Accordion } = require('react-bootstrap');
const { default: ClientData } = require('./ClientData');

// Component - returns the card that populates the accordion in /pages/admin/clients.js
// props:
//    client - client data that is passed from the map() in /pages/admin/clients.js
//    filter - the filter string that is used to determine if a client is to be shown. filtered on the clients name

const ClientCard = ({ client, filter }) => (
  <>
    {filter !== '' &&
    client.clientName.toLowerCase().indexOf(filter.toLowerCase()) ===
      -1 ? null : (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={client.id}>
          {client.clientName}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={client.id}>
          <ClientData client={client} />
        </Accordion.Collapse>
      </Card>
    )}
  </>
);

export default ClientCard;
