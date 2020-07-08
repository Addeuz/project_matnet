const { Card, Accordion } = require('react-bootstrap');
const { default: ClientData } = require('./ClientData');

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
