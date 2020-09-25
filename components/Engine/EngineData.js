import { SRow } from '../../styles/styled';
import EngineDataInfo from './EngineDataInfo/EngineDataInfo';

// Component that handles showing the data of a engine
// props:
//    engine - engine data that is passed from the map() in /pages/admin/clients.js

const EngineData = ({ engine }) => {
  const aaa = get(EngineData, 'aaa', '');
  const [engineValues, setEngineValues] = React.useState({});

  React.useEffect(() => {
    setEngineValues(engine.engine_value.engine_values);
  }, [engine]);

  return (
    <SRow>
      <EngineDataInfo
        engineInfo={engine.engineInfo}
        engineValues={engineValues}
        clientId={engine.clientId}
        engineId={engine.id}
        type={engine.engine_value.type}
      />
    </SRow>
  );
};
export default EngineData;
