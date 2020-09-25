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
import { UserContext } from '../../UserContext';
import DeleteModal from '../../DeleteModal';
import authHeader from '../../../services/auth-header';

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const RightButtonDelete = styled(Button)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;

  /* @media only screen and (max-width: 768px) {
    float: initial;
  } */
`;

const SCol = styled(Col)`
  padding-left: 0;
  @media only screen and (max-width: 992px) {
    padding-left: 15px;
  }
`;

const DirectCurrentInfo = ({
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
        <EngineHeadingData header="Tag nr">
          {engineInfo.tagNr}
        </EngineHeadingData>
        <EngineHeadingData header="Art nr">
          {engineInfo.artNr}
        </EngineHeadingData>
        <EngineHeadingData header="Position">
          {engineInfo.position}
        </EngineHeadingData>
        <EngineHeadingData header="Diverse">
          {engineInfo.diverse}
        </EngineHeadingData>
        <EngineHeadingData header="Fabrikat">
          {engineInfo.fabrikat}
        </EngineHeadingData>
        <EngineHeadingData header="Typ">{engineInfo.typ}</EngineHeadingData>
        <EngineHeadingData header="Motor nr">
          {engineInfo.motorNr}
        </EngineHeadingData>
        <EngineHeadingData header="Varvtal RPM">
          {engineInfo.varvtal}
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
        <EngineHeadingData header="Magnetisering (V)">
          {engineInfo.magnetiseringV}
        </EngineHeadingData>
        <EngineHeadingData header="Magnetisering (A)">
          {engineInfo.magnetiseringA}
        </EngineHeadingData>
        <EngineHeadingData header="Ohm">{engineInfo.ohm}</EngineHeadingData>
        <EngineHeadingData header="Lager isolerad">
          {engineInfo.lagerIsolerad}
        </EngineHeadingData>
        <EngineHeadingData header="Lager DE">
          {engineInfo.lagerNDE}
        </EngineHeadingData>
        <EngineHeadingData header="Lager NDE">
          {engineInfo.lagerDE}
        </EngineHeadingData>
        <EngineHeadingData header="Kolborstar">
          {engineInfo.kolborstar}
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
              header="Meggning stator"
              value={engineValues.meggningStator}
            />
            <EngineHeadingValueData
              header="Meggning rotor"
              value={engineValues.meggningRotor}
            />
            <EngineHeadingValueData
              header="Driftström"
              value={engineValues['driftström']}
            />
            <EngineHeadingValueData
              header="Lind temp"
              value={engineValues.lindTemp}
            />
            <EngineHeadingValueData
              header="Vibration"
              value={engineValues.vibration}
            />
            <EngineHeadingValueData
              header="Smörjning"
              value={engineValues['smörjning']}
            />
            <EngineHeadingValueData
              header="Okulär intern"
              value={engineValues['okulärIntern']}
            />
            <EngineHeadingValueData
              header="Okulär extern"
              value={engineValues['okulärExtern']}
            />
            <EngineHeadingValueData
              header="Mantel temp"
              value={engineValues.mantelTemp}
            />
            <EngineHeadingValueData
              header="Kommutator yta"
              value={engineValues.kommutatorYta}
            />
            <EngineHeadingValueData
              header="Kollektor temp"
              value={engineValues.kollektorTemp}
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
          <Col xs={6}>
            <EngineHeadingValueData
              header="Lager kond DE"
              value={engineValues.lagerKondDe}
            />
            <EngineHeadingValueData
              header="Lager kond NDE"
              value={engineValues.lagerKondNde}
            />
            <EngineHeadingValueData
              header="Spm DE"
              value={engineValues.spmDE}
            />
            <EngineHeadingValueData
              header="Spm NDE"
              value={engineValues.spmNDE}
            />
            <EngineHeadingValueData
              header="Lager temp DE"
              value={engineValues.lagerTempDe}
            />
            <EngineHeadingValueData
              header="Lager temp NDE"
              value={engineValues.lagerTempNde}
            />
            <EngineHeadingValueData
              header="Lager isolering"
              value={engineValues.lagerIsolering}
            />
            <EngineHeadingValueData
              header="Renhet"
              value={engineValues.renhet}
            />
            <EngineHeadingValueData
              header="Kylpaket"
              value={engineValues.kylpaket}
            />
            <EngineHeadingValueData
              header="Kolborstar"
              value={engineValues.kolborstar}
            />
            <EngineHeadingValueData
              header="Varvtalsgivare"
              value={engineValues.varvtalsgivare}
            />
          </Col>
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

export default DirectCurrentInfo;
