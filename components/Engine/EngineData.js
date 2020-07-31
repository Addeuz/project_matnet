import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { SButton, SRow } from '../../styles/styled';
import HeadingData from '../Admin/Utils/HeadingData';

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

  @media only screen and (max-width: 768px) {
    float: initial;
  }
`;

// Component that handles showing the data of a engine
// props:
//    engine - engine data that is passed from the map() in /pages/admin/clients.js

const EngineData = ({ engine }) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <SRow>
      <Col xs={12} md={5}>
        <HeadingData header="Tag_NR">{engine.tag_nr}</HeadingData>
        <HeadingData header="Position">{engine.position}</HeadingData>
        <HeadingData header="Ström">{engine.strom} A</HeadingData>
        <HeadingData header="Spänning">{engine.spanning} V</HeadingData>
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
      <Col xs={12} md={3}>
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
