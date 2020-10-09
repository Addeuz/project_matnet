import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../../../../../components/Layout';
import Sidebar from '../../../../../../components/Navigation/Sidebar';
import authHeader from '../../../../../../services/auth-header';
import { SSpinner } from '../../../../../../styles/styled';
import DataOverviewTimeLine from './DataOverviewTimeLine';

const EngineDataOverview = () => {
  const router = useRouter();

  const [engineData, setEngineData] = React.useState([]);
  const [extraEngineData, setExtraEngineData] = React.useState([]);
  const [engineValues, setEngineValues] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const options = {
      headers: authHeader(),
    };
    axios
      .get(
        `/api/moderator/${router.query.engineId}/${router.query.type}/overview`,
        options
      )
      .then(serverResponse => {
        console.log(serverResponse.data);
        setEngineValues(serverResponse.data.engineValues);
        setEngineData(serverResponse.data.engineData);
        setExtraEngineData(serverResponse.data.engineExtraData);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Layout>
      <Sidebar page="/">
        <h4>Översikt över data för {router.query.tagNr}</h4>
        {!isLoading &&
        engineData &&
        engineData.length > 0 &&
        extraEngineData &&
        extraEngineData.length > 0 ? (
          <DataOverviewTimeLine
            engineData={engineData}
            extraEngineData={extraEngineData}
            engineValues={engineValues}
          />
        ) : (
          <SSpinner animation="border">
            <span>Loading...</span>
          </SSpinner>
        )}
      </Sidebar>
    </Layout>
  );
};

export default EngineDataOverview;
