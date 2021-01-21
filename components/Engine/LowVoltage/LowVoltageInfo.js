// Component that displays the data of an engine
// props:
//    engineInfo: information about the engine

import { Col, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import Link from 'next/link';
import { useReactToPrint } from 'react-to-print';
import { SButton, NoMarginBottomH6 } from '../../../styles/styled';

import {
  EngineHeadingData,
  EngineHeadingValueData,
} from '../../Admin/Utils/EngineHeadingData';
import { camelCaseToNormal } from '../../../utils/stringManipulation';
import EditEngineModal from '../EditEngineModal';
import DeleteModal from '../../DeleteModal';
import authHeader from '../../../services/auth-header';
import { UserContext } from '../../UserContext';
import AddNoteModal from '../AddNoteModal';

const RightButton = styled(SButton)`
  float: right;
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

export const LeftButton = styled(SButton)`
  float: left;
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

const LowVoltageInfo = ({
  engineInfo,
  engineValues,
  type,
  clientId,
  engineId,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [noteModalShow, setNoteModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);

  const printComponentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    copyStyles: true,
  });

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
        <EngineHeadingData header="Frekvens Hz">
          {engineInfo.frekvens}
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
        <EngineHeadingData header="Sekundär (V)">
          {engineInfo['sekundärV']}
        </EngineHeadingData>
        <EngineHeadingData header="Sekundär (A)">
          {engineInfo['sekundärA']}
        </EngineHeadingData>
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
              header="Motormon"
              value={engineValues.motormon}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Baker"
              value={engineValues.baker}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Meggning stator"
              value={engineValues.meggningStator}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Meggning rotor"
              value={engineValues.meggningRotor}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Driftström"
              value={engineValues['driftström']}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Lind temp"
              value={engineValues.lindTemp}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Vibration"
              value={engineValues.vibration}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Smörjning"
              value={engineValues['smörjning']}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Okulär intern"
              value={engineValues['okulärIntern']}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Okulär extern"
              value={engineValues['okulärExtern']}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Mantel temp"
              value={engineValues.mantelTemp}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Släpringsyta"
              value={engineValues['släpringsYta']}
              engineId={engineId}
              clientId={clientId}
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
                    engineId={engineId}
                    clientId={clientId}
                    extra
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
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Lager kond NDE"
              value={engineValues.lagerKondNde}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Spm DE"
              value={engineValues.spmDE}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Spm NDE"
              value={engineValues.spmNDE}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Lager temp DE"
              value={engineValues.lagerTempDe}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Lager temp NDE"
              value={engineValues.lagerTempNde}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Lager isolering"
              value={engineValues.lagerIsolering}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Renhet"
              value={engineValues.renhet}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Kylpaket"
              value={engineValues.kylpaket}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Kolborstar"
              value={engineValues.kolborstar}
              engineId={engineId}
              clientId={clientId}
            />
            <EngineHeadingValueData
              header="Varvtalsgivare"
              value={engineValues.varvtalsgivare}
              engineId={engineId}
              clientId={clientId}
            />
          </Col>
        </Row>
      </SCol>
      <Col xs={12}>
        <Link
          href="/engines/[clientId]/[engineId]/overview/[tagNr]/[type]"
          as={`/engines/${clientId}/${engineId}/overview/${engineInfo.tagNr}/${type}`}
        >
          <a>
            <LeftButton variant="primary">Översikt</LeftButton>
          </a>
        </Link>
        {user &&
        (user.roles[0] === 'ROLE_ADMIN' ||
          user.roles[0] === 'ROLE_MODERATOR') ? (
          <>
            <RightButtonDelete
              variant="danger"
              onClick={() => setDeleteModalShow(true)}
            >
              Ta bort
            </RightButtonDelete>
            <RightButton
              onClick={() => setModalShow(true)}
            >{`Redigera ${engineInfo.tagNr}`}</RightButton>
            <RightButton onClick={() => setNoteModalShow(true)}>
              Lägg till not
            </RightButton>
            <AddNoteModal
              show={noteModalShow}
              onHide={() => setNoteModalShow(false)}
              engine={{
                id: engineId,
                tagNr: engineInfo.tagNr,
              }}
            />
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
          </>
        ) : (
          <></>
        )}
      </Col>
    </>
  );
};

export default LowVoltageInfo;
