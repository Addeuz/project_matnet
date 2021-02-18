import styled from 'styled-components';

const {
  Card,
  Accordion,
  Row,
  Col,
  AccordionToggle,
} = require('react-bootstrap');
const { default: EngineData } = require('./EngineData');

// Component - returns the card that populates the accordion in /pages/admin/clients.js
// props:
//    engine - engine data that is passed from the map() in /pages/engines/index.js
//    filter - the filter string that is used to determine if a client is to be shown. filtered on the engines tag_nr

const Header = styled(AccordionToggle)`
  background: var(--green_10);
  font-weight: 500;
  cursor: default !important;
  /* :hover {
    cursor: default;
  } */
`;

const EngineCard = ({ engine, filter }) => (
  <>
    {filter === '' ||
    engine.engineInfo.tagNr.toLowerCase().indexOf(filter.toLowerCase()) !==
      -1 ||
    engine.engineInfo.fabrikat.toLowerCase().indexOf(filter.toLowerCase()) !==
      -1 ||
    engine.engineInfo.position.toLowerCase().indexOf(filter.toLowerCase()) !==
      -1 ? (
      <>
        <Accordion.Toggle as={Card.Header} eventKey={engine.id}>
          <Row className="text-center">
            <Col>{engine.engineInfo.tagNr}</Col>
            <Col>{engine.engineInfo.position}</Col>
            <Col>{engine.engineInfo.fabrikat}</Col>
          </Row>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={engine.id}>
          <EngineData engine={engine} />
        </Accordion.Collapse>
      </>
    ) : null}
  </>
);

export default EngineCard;
