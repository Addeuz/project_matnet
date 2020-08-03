import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton, SRow } from '../../styles/styled';
import EngineHeadingData from '../Admin/Utils/EngineHeadingData';

// const CustomerDiv = styled.div`
//   height: 150px;
//   overflow: auto;

//   @media only screen and (max-width: 768px) {
//     height: auto;
//   }
// `;

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

// Component that handles showing the data of a engine
// props:
//    engine - engine data that is passed from the map() in /pages/admin/clients.js

const EngineData = ({ engine }) => {
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    console.log(engine);
  }, [engine]);

  return (
    <SRow>
      <Col xs={12} md={6}>
        <h5>
          {/* Used to make first letter Capitalized */}
          {engine.engine_value.type[0].toUpperCase()}
          {engine.engine_value.type.slice(1)}
        </h5>
        <EngineHeadingData header="Tag nr">{engine.tag_nr}</EngineHeadingData>
        <EngineHeadingData header="Art nr">{engine.art_nr}</EngineHeadingData>
        <EngineHeadingData header="Position">
          {engine.position}
        </EngineHeadingData>
        <EngineHeadingData header="Diverse">{engine.diverse}</EngineHeadingData>
        <EngineHeadingData header="Fabrikat">
          {engine.fabrikat}
        </EngineHeadingData>
        <EngineHeadingData header="Typ">{engine.typ}</EngineHeadingData>
        <EngineHeadingData header="Motor nr">
          {engine.motor_nr}
        </EngineHeadingData>
        <EngineHeadingData header="Varvtal RPM">
          {engine.varvtal}
        </EngineHeadingData>
        <EngineHeadingData header="Frekvens Hz">
          {engine.frekvens}
        </EngineHeadingData>
        <EngineHeadingData header="Effekt kW">
          {engine.effekt}
        </EngineHeadingData>
        <EngineHeadingData header="Spänning (V)">
          {engine.spanning}
        </EngineHeadingData>
        <EngineHeadingData header="Ström (A)">{engine.strom}</EngineHeadingData>
        <EngineHeadingData header="Sekundär (V)">
          {engine.sekundar_v}
        </EngineHeadingData>
        <EngineHeadingData header="Sekundär (A)">
          {engine.sekundar_a}
        </EngineHeadingData>
        {/* Lager isolerad */}
        <EngineHeadingData header="Lager DE">
          {engine.lager_de}
        </EngineHeadingData>
        <EngineHeadingData header="Lager NDE">
          {engine.lager_nde}
        </EngineHeadingData>
        <EngineHeadingData header="Kolborstar">
          {engine.kolborstar}
        </EngineHeadingData>
        <EngineHeadingData header="Fri text">
          {engine.fri_text}
        </EngineHeadingData>
      </Col>
      <Col xs={12} md={4}>
        {/* {engine.roles[0] ? (
          <HeadingData header="Roll">{engine.roles[0].name}</HeadingData>
        ) : (
          <HeadingData header="Roll">Ingen roll tilldelad</HeadingData>
        )}
        <HeadingData header="Kunder">
          <CustomerDiv>
            {engine.clients[0] ? (
              engine.clients.map(client => (
                <p key={client.id}>{client.clientName}</p>
              ))
            ) : (
              <p>Inga kunder tillagda</p>
            )}
          </CustomerDiv>
        </HeadingData> */}
        Hello
      </Col>
      <Col xs={12}>
        <RightButton onClick={() => setModalShow(true)}>Redigera</RightButton>
      </Col>
      {/* <EditengineModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        engine={engine}
      /> */}
    </SRow>
  );
};
export default EngineData;
