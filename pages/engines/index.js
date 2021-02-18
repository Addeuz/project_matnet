/* eslint-disable react/button-has-type */
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/Layout';
import { UserContext } from '../../components/UserContext';
import Sidebar from '../../components/Navigation/Sidebar';
import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
  SButton,
} from '../../styles/styled';
import AddEngineModal from '../../components/Engine/AddEngineModal';
import { adress } from '../../utils/hooks/useFetch';
import EngineCard from '../../components/Engine/EngineCard';

const ClientRow = styled(SRow)`
  height: 400px;
`;

const ClientCol = styled(SCol)`
  height: inherit;
  overflow: auto;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    flex-flow: row wrap;
  }
`;

const EngineIndex = () => {
  const { user } = React.useContext(UserContext);

  const [response, setResponse] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [isError, setError] = React.useState(null);

  const [client, setClient] = React.useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    axios(`${adress}/api/moderator/clients/${user.id}`)
      .then(response => {
        console.log(response.data);
        setLoadingData(false);
        setResponse(response.data);
      })
      .catch(err => {
        setError(err);
      });

    setLoadingUser(false);
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>Välj kund</title>
      </Head>
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
        <ClientRow>
          <SCol xs={12} className="">
            <h5>Välj kund</h5>
          </SCol>
          <ClientCol xs={12} className="">
            {isError && <div>{isError.response.data.message}</div>}
            {loadingData && (
              <SSpinner animation="border">
                <span>Loading...</span>
              </SSpinner>
            )}
            {!isError &&
              response &&
              response.map(client =>
                filter === '' ||
                client.clientName
                  .toLowerCase()
                  .indexOf(filter.toLowerCase()) !== -1 ? (
                  <Link
                    key={client.id}
                    href="/engines/[clientId]"
                    as={`/engines/${client.id}`}
                  >
                    <Button
                      key={client.id}
                      onClick={e => {
                        setClient(client);
                        setFilter('');
                      }}
                      value={client.clientName}
                      variant="link"
                    >
                      <a>{client.clientName}</a>
                    </Button>
                  </Link>
                ) : null
              )}
          </ClientCol>
        </ClientRow>
      </Sidebar>
      <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
    </Layout>
  );
};

export default EngineIndex;
