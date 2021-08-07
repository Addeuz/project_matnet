import styled from 'styled-components';
import axios from 'axios';
import {
  InputGroup,
  FormControl,
  Button,
  Card,
  Row,
  Col,
  AccordionToggle,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  SCol,
  SAccordion,
  SSpinner,
  SRow,
  AddButtonCol,
  SButton,
} from '../../../styles/styled';
import EngineCard from '../../../components/Engine/EngineCard';
import AddEngineModal from '../../../components/Engine/AddEngineModal';
import AlarmListModal from '../../../components/Engine/AlarmListModal';
import Layout from '../../../components/Layout';
import { adress } from '../../../utils/hooks/useFetch';
import { UserContext } from '../../../components/UserContext';

const RightButton = styled(SButton)`
  float: right;
  margin-left: 1rem;

  @media only screen and (max-width: 768px) {
    margin-bottom: 0.25rem;
    margin-left: 0.5rem;
  }
`;

const Header = styled(AccordionToggle)`
  background: var(--green_10);
  font-weight: 500;
  cursor: default !important;
  /* :hover {
    cursor: default;
  } */
`;

const ClientHeader = styled.h5`
  margin-top: 0.5rem;
`;

const EngineAccordion = () => {
  const { user } = React.useContext(UserContext);

  const router = useRouter();

  const [loadingData, setLoadingData] = React.useState(true);
  const [loadingUser, setLoadingUser] = React.useState(true);

  const [modalShow, setModalShow] = React.useState(false);
  const [larmListModalShow, setLarmListModalShow] = React.useState(false);

  const [alarmData, setAlarmData] = React.useState(null);

  const [isError, setError] = React.useState(null);
  const [response, setResponse] = React.useState([]);
  const [client, setClient] = React.useState(null);
  const [filter, setFilter] = React.useState('');

  const { clientId } = router.query;

  React.useEffect(() => {
    if (clientId) {
      axios(`${adress}/api/moderator/engines/${clientId}`)
        .then(response => {
          setLoadingData(false);
          console.log(response.data.engines);
          setResponse(response.data.engines);
          setClient(response.data.client);
        })
        .catch(err => {
          setError(err);
        });

      setLoadingUser(false);
    }

    if (user) {
      axios(`${adress}/api/moderator/${clientId}/alarmList`)
        .then(response => {
          setAlarmData(response.data);
        })
        .catch(err => {
          console.log('Error', err);
        });
    }
  }, [clientId, user]);

  return (
    <Layout>
      <Head>
        <title>{client?.clientName || ''}</title>
      </Head>
      <SRow>
        <SCol xs={5} lg={7}>
          <h3>Motorer</h3>
        </SCol>
        <AddButtonCol xs={7} lg={2}>
          {!loadingUser &&
            user &&
            (user.roles[0] === 'ROLE_ADMIN' ||
              user.roles[0] === 'ROLE_MODERATOR') && (
              <Button variant="success" onClick={() => setModalShow(true)}>
                <span>Lägg till ny motor</span>
              </Button>
            )}
        </AddButtonCol>
        <SCol xs={12} lg={3}>
          <InputGroup>
            <FormControl
              placeholder="Filtrera"
              aria-label="Filtrera"
              value={filter}
              onChange={e => {
                setFilter(e.target.value);
              }}
            />
            <InputGroup.Append>
              <InputGroup.Text>
                <BsSearch />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </SCol>
      </SRow>
      <SRow>
        <SCol xs={6}>
          {client && <ClientHeader>{client.clientName}</ClientHeader>}
        </SCol>
        <SCol xs={6}>
          {user?.clients.length > 1 && client && (
            <RightButton onClick={() => router.back()}>Byt kund</RightButton>
          )}
          <Button
            style={{ cssFloat: 'right' }}
            variant="danger"
            onClick={() => setLarmListModalShow(true)}
          >
            Larmlistan
          </Button>
        </SCol>
        <SCol xs={12}>
          <SAccordion>
            {isError && <div>{isError.response.data.message}</div>}
            {loadingData && (
              <SSpinner animation="border">
                <span>Loading...</span>
              </SSpinner>
            )}
            {/* // <EngineCard key={engine.id} engine={engine} filter={filter} /> */}
            {/** TODO: Fix this */}
            {!isError && response.length === 0 && !loadingData && client && (
              <span>Inga motorer tillägda hos {client.clientName}</span>
            )}
            {!isError && response && !loadingData && response?.length !== 0 && (
              <Card>
                <Header as={Card.Header} className="">
                  <Row className="text-center">
                    <Col>Tag NR</Col>
                    <Col>Position</Col>
                    <Col>Fabrikat</Col>
                    <Col>Typ</Col>
                  </Row>
                </Header>
                {!isError &&
                  response &&
                  response.map(engine => (
                    <EngineCard
                      engine={engine}
                      filter={filter}
                      key={engine.id}
                    />
                  ))}
              </Card>
            )}
          </SAccordion>
        </SCol>
      </SRow>
      <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
      <AlarmListModal
        show={larmListModalShow}
        onHide={() => setLarmListModalShow(false)}
        alarmData={alarmData}
        clientName={client?.clientName}
      />
    </Layout>
  );
};

export default EngineAccordion;
