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
import EngineInfoButtonMenu from '../EngineInfoButtonMenu';

import { camelCaseToNormal } from '../../../utils/stringManipulation';

const SCol = styled(Col)`
  padding-left: 0;
  @media only screen and (max-width: 992px) {
    padding-left: 15px;
  }
`;

const PowerTrainInfo = ({
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
      <EngineHeadingData header="Strömr.">
        {engineInfo['strömR']}
      </EngineHeadingData>
      <EngineHeadingData header="Fr.omr.">{engineInfo.fromR}</EngineHeadingData>
      <EngineHeadingData header="Tag nr">{engineInfo.tagNr}</EngineHeadingData>
      <EngineHeadingData header="Art nr">{engineInfo.artNr}</EngineHeadingData>
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
            engineId={engineId}
            clientId={clientId}
          />
          <EngineHeadingValueData
            header="Stoppservice"
            value={engineValues.stoppservice}
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
        <Col xs={6}></Col>
      </Row>
    </SCol>
    <EngineInfoButtonMenu
      clientId={clientId}
      engineId={engineId}
      engineFiles={engineFiles}
      engineInfo={engineInfo}
      type={type}
      engineValues={engineValues}
    />
  </>
);

export default PowerTrainInfo;
