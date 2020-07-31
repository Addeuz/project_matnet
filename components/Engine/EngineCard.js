const { Card, Accordion } = require('react-bootstrap');
const { default: EngineData } = require('./EngineData');
// const { default: engineData } = require('./engineData');

// Component - returns the card that populates the accordion in /pages/admin/clients.js
// props:
//    engine - engine data that is passed from the map() in /pages/engines/index.js
//    filter - the filter string that is used to determine if a client is to be shown. filtered on the engines tag_nr

const EngineCard = ({ engine, filter }) => (
  <>
    {filter !== '' &&
    engine.tag_nr.toLowerCase().indexOf(filter.toLowerCase()) === -1 ? null : (
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={engine.id}>
          {engine.tag_nr}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={engine.id}>
          <EngineData engine={engine} />
        </Accordion.Collapse>
      </Card>
    )}
  </>
);

export default EngineCard;
