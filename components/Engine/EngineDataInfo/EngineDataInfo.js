// Component that takes care of rendering the engine info in correct order and according to type aswell.
// props:
//    engineInfo - the information itself
//    type - type of engine

import LowVoltageInfo from '../LowVoltage/LowVoltageInfo';
import HighVoltageInfo from '../HighVoltage/HighVoltageInfo';
import DirectCurrentInfo from '../DirectCurrent/DirectCurrentInfo';
import PowerTrainInfo from '../PowerTrain/PowerTrainInfo';

const EngineDataInfo = ({
  engineInfo,
  type,
  engineValues,
  clientId,
  engineId,
}) =>
  (type === 'lågspänd' && (
    <LowVoltageInfo
      engineInfo={engineInfo}
      engineValues={engineValues}
      type={type}
      engineId={engineId}
      clientId={clientId}
    />
  )) ||
  (type === 'högspänd' && (
    <HighVoltageInfo
      engineInfo={engineInfo}
      engineValues={engineValues}
      type={type}
      engineId={engineId}
      clientId={clientId}
    />
  )) ||
  (type === 'likström' && (
    <DirectCurrentInfo
      engineInfo={engineInfo}
      engineValues={engineValues}
      type={type}
      engineId={engineId}
      clientId={clientId}
    />
  )) ||
  (type === 'drivsystem' && (
    <PowerTrainInfo
      engineInfo={engineInfo}
      engineValues={engineValues}
      type={type}
      engineId={engineId}
      clientId={clientId}
    />
  ));

export default EngineDataInfo;
