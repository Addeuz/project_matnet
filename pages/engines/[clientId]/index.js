import styled from 'styled-components';
import axios from 'axios';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useRouter } from 'next/router';
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
import Sidebar from '../../../components/Navigation/Sidebar';
import Layout from '../../../components/Layout';
import { adress } from '../../../utils/hooks/useFetch';
import { UserContext } from '../../../components/UserContext';

const RightButton = styled(SButton)`
  float: right;
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
          setResponse(response.data.engines);
          setClient(response.data.client);
        })
        .catch(err => {
          setError(err);
        });

      setLoadingUser(false);
    }
  }, [clientId]);

  return (
    <Layout>
      <Sidebar page="/">
        <SRow>
          <SCol xs={5} lg={3}>
            <h3>Motorer</h3>
          </SCol>

          <AddButtonCol xs={7} lg={5}>
            {!loadingUser &&
              user &&
              (user.roles[0] === 'ROLE_ADMIN' ||
                user.roles[0] === 'ROLE_MODERATOR') && (
                <Button variant="success" onClick={() => setModalShow(true)}>
                  <span>Lägg till ny motor</span>
                </Button>
              )}
          </AddButtonCol>
          <SCol xs={12} lg={4}>
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
          <SCol xs={9}>
            {client && <ClientHeader>{client.clientName}</ClientHeader>}
          </SCol>
          <SCol xs={3}>
            {client && (
              <RightButton onClick={() => router.back()}>Byt kund</RightButton>
            )}
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
              {!isError &&
                response &&
                response.map(engine => (
                  <EngineCard engine={engine} filter={filter} key={engine.id} />
                ))}
            </SAccordion>
          </SCol>
        </SRow>
      </Sidebar>
      <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
    </Layout>
  );
};

export default EngineAccordion;
