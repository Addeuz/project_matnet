import axios from 'axios';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import Head from 'next/head';
import Layout from '../../../../../../components/Layout';
import Sidebar from '../../../../../../components/Navigation/Sidebar';
import authHeader from '../../../../../../services/auth-header';
import { SButton, SSpinner } from '../../../../../../styles/styled';
import DataOverviewTimeLine from './DataOverviewTimeLine';
import OverviewEnginePrint from '../../../../../../components/Engine/EnginePrint/OverviewEnginePrint';

const EngineDataOverview = () => {
  const router = useRouter();

  const [engineData, setEngineData] = React.useState([]);
  const [extraEngineData, setExtraEngineData] = React.useState([]);
  const [engineValues, setEngineValues] = React.useState(null);
  const [engineInfo, setEngineInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const printComponentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    copyStyles: true,
  });

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
        setEngineValues(serverResponse.data.engineValues);
        setEngineData(serverResponse.data.engineData);
        setExtraEngineData(serverResponse.data.engineExtraData);
        console.log(serverResponse.data.engineInfo);
        setEngineInfo(serverResponse.data.engineInfo);
      })
      .catch(error => {
        console.log(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>{`Översikt - ${router.query.tagNr}`}</title>
      </Head>
      <Sidebar page="/">
        <Row>
          <Col>
            <h4>Översikt över data för {router.query.tagNr}</h4>
          </Col>
          <Col>
            <SButton type="button" onClick={handlePrint}>
              Skriv ut översikt
            </SButton>
          </Col>
        </Row>
        {!isLoading &&
        engineData &&
        engineData.length > 0 &&
        extraEngineData &&
        extraEngineData.length >= 0 ? (
          <>
            <DataOverviewTimeLine
              engineData={engineData}
              extraEngineData={extraEngineData}
              engineValues={engineValues}
            />
            {/* TODO: from the api get the data about the engine aswell not only tag number. need to show when printing */}
            <div style={{ display: 'none' }}>
              <OverviewEnginePrint
                engineData={engineData}
                extraEngineData={extraEngineData}
                engineInfo={engineInfo}
                ref={printComponentRef}
              />
            </div>
          </>
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
