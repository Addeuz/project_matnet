// Component that displays the data of an engine
// props:
//    engineInfo: information about the engine

import { Col, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { SButton, NoMarginBottomH6 } from '../../../styles/styled';
import {
  EngineHeadingData,
  EngineHeadingValueData,
} from '../../Admin/Utils/EngineHeadingData';
import { camelCaseToNormal } from '../../../utils/stringManipulation';
import EditEngineModal from '../EditEngineModal';
import authHeader from '../../../services/auth-header';
import DeleteModal from '../../DeleteModal';
import { UserContext } from '../../UserContext';

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const SCol = styled(Col)`
  padding-left: 0;
  @media only screen and (max-width: 992px) {
    padding-left: 15px;
  }
`;

const RightButtonDelete = styled(Button)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  /* @media only screen and (max-width: 768px) {
    float: initial;
  } */
`;

const PowerTrainInfo = ({
  engineInfo,
  engineValues,
  type,
  clientId,
  engineId,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const { user } = React.useContext(UserContext);

  return (
    <>
      <Col xs={12} lg={6}>
        <h5>
          {/* Used to make first letter Capitalized */}
          {type[0].toUpperCase()}
          {type.slice(1)}
        </h5>
        <EngineHeadingData header="Strömr.">
          {engineInfo['strömR']}
        </EngineHeadingData>
        <EngineHeadingData header="Fr.omr.">
          {engineInfo.fromR}
        </EngineHeadingData>
        <EngineHeadingData header="Tag nr">
          {engineInfo.tagNr}
        </EngineHeadingData>
        <EngineHeadingData header="Art nr">
          {engineInfo.artNr}
        </EngineHeadingData>
        <EngineHeadingData header="Position">
          {engineInfo.position}
        </EngineHeadingData>
        <EngineHeadingData header="Fabrikat">
          {engineInfo.fabrikat}
        </EngineHeadingData>
        <EngineHeadingData header="Typ">{engineInfo.typ}</EngineHeadingData>
        <EngineHeadingData header="Serie nr">
          {engineInfo.serieNr}
        </EngineHeadingData>
        <EngineHeadingData header="Effekt kW">
          {engineInfo.effekt}
        </EngineHeadingData>
        <EngineHeadingData header="Spänning (V)">
          {engineInfo['spänning']}
        </EngineHeadingData>
        <EngineHeadingData header="Ström (A)">
          {engineInfo['ström']}
        </EngineHeadingData>
        <EngineHeadingData header="Fri text">
          {engineInfo.friText}
        </EngineHeadingData>
      </Col>
      <SCol xs={12} lg={6}>
        <h6>Mätdata</h6>
        <Row>
          <Col xs={6}>
            <EngineHeadingValueData
              header="Driftservice"
              value={engineValues.driftservice}
            />
            <EngineHeadingValueData
              header="Stoppservice"
              value={engineValues.stoppservice}
            />

            <NoMarginBottomH6>Extra mätpunkter</NoMarginBottomH6>
            {engineValues.extraInputs ? (
              engineValues.extraInputs.map(extraInput => {
                const key = Object.keys(extraInput)[0];
                return (
                  <EngineHeadingValueData
                    key={key}
                    header={camelCaseToNormal(key)}
                    value={extraInput[key]}
                  />
                );
              })
            ) : (
              <span>Inga extra mätpunkter</span>
            )}
          </Col>
          <Col xs={6}></Col>
        </Row>
      </SCol>
      {user &&
      (user.roles[0] === 'ROLE_ADMIN' || user.roles[0] === 'ROLE_MODERATOR') ? (
        <>
          <Col xs={12}>
            <RightButtonDelete
              variant="danger"
              onClick={() => setDeleteModalShow(true)}
            >
              Ta bort
            </RightButtonDelete>
            <RightButton
              onClick={() => setModalShow(true)}
            >{`Redigera ${engineInfo.tagNr}`}</RightButton>
            <EditEngineModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              engine={{
                clientId,
                engineId,
                engineInfo: { ...engineInfo },
                engineValues: { ...engineValues },
              }}
              type={type}
            />
            <DeleteModal
              show={deleteModalShow}
              onHide={() => setDeleteModalShow(false)}
              onDelete={() => {
                const options = {
                  headers: authHeader(),
                };

                axios
                  .delete(
                    `http://localhost:3000/api/moderator/engine/${engineId}`,
                    options
                  )
                  .then(() => {
                    window.location.reload();
                  });
              }}
              title={engineInfo.tagNr}
            >
              <p>Är du säker på att du vill ta bort {engineInfo.tagNr}?</p>
            </DeleteModal>
          </Col>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PowerTrainInfo;
