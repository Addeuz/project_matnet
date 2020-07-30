const { Card, Accordion } = require('react-bootstrap');
const { default: EngineData } = require('./EngineData');
// const { default: engineData } = require('./engineData');

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
