// Component that displays the data of an engine
// props:
//    engineInfo: information about the engine

import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { NoMarginBottomH6 } from '../../../styles/styled';
import {
  EngineHeadingData,
  EngineHeadingValueData,
} from '../../Admin/Utils/EngineHeadingData';
import { camelCaseToNormal } from '../../../utils/stringManipulation';
import EngineInfoButtonMenu from '../EngineInfoButtonMenu';

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
  engineFiles,
  clientId,
  engineId,
}) => (
  <>
    <Col xs={12} lg={6}>
      <h5>
        {/* Used to make first letter Capitalized */}
        {type[0].toUpperCase()}
        {type.slice(1)}
      </h5>
      <EngineHeadingData header="Tag nr">{engineInfo.tagNr}</EngineHeadingData>
      <EngineHeadingData header="Art nr">{engineInfo.artNr}</EngineHeadingData>
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
            header="Kommutator yta"
            value={engineValues.kommutatorYta}
            engineId={engineId}
            clientId={clientId}
          />
          <EngineHeadingValueData
            header="Kollektor temp"
            value={engineValues.kollektorTemp}
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
    <EngineInfoButtonMenu
      clientId={clientId}
      engineFiles={engineFiles}
      engineId={engineId}
      engineInfo={engineInfo}
      type={type}
      engineValues={engineValues}
    />
  </>
);

export default DirectCurrentInfo;
