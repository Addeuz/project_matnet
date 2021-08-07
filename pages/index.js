import { useRouter } from 'next/router';
import Head from 'next/head';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { UserContext } from '../components/UserContext';
import { AddButtonCol, SCol, SRow, SSpinner } from '../styles/styled';
import { adress } from '../utils/hooks/useFetch';
import AddEngineModal from '../components/Engine/AddEngineModal';
import userService from '../services/user.service';
import authService from '../services/auth.service';

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

const Index = () => {
  const { user } = React.useContext(UserContext);
  const router = useRouter();

  const [response, setResponse] = React.useState([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [isError, setError] = React.useState(null);

  const [client, setClient] = React.useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    userService.isUser().then(
      response => {
        if (!user) {
          window.location.replace('/login');
        } else {
          // dispatch({ action: 'LOG_IN' });
          axios(`${adress}/api/moderator/clients/${user.id}`)
            .then(response => {
              if (response.data.length === 1) {
                console.log('mannen byt direkt');
                router.push(`/engines/${response.data[0].id}`);
              } else {
                console.log(response.data);
                setLoadingData(false);
                setResponse(response.data);
              }
            })
            .catch(err => {
              setError(err);
            });
        }
      },
      error => {
        // User don't have access
        if (error.response.status === 403) {
          authService.logOut();
          window.location.replace('/login');
        }
        // User is not logged in and there is no token
        if (error.response.status === 401) {
          window.location.replace('/login');
        }
      }
    );

    setLoadingUser(false);
  }, [router, user]);

  return (
    <Layout>
      <Head>
        <title>Välj kund</title>
      </Head>
      {loadingData ? (
        <SSpinner animation="border">
          <span>Loading...</span>
        </SSpinner>
      ) : (
        <>
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
                        onClick={() => {
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
          <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
      )}
    </Layout>
  );
};

// const Index = () => {
//   const router = useRouter();
//   const [loading, setLoading] = React.useState(true);
//   const [alarmData, setAlarmData] = React.useState(null);
//   const [loadingAlarmData, setLoadingAlarmData] = React.useState(true);

//   const [notesData, setNotesData] = React.useState(null);
//   const [loadingNotesData, setLoadingNotesData] = React.useState(true);

//   const { user } = React.useContext(UserContext);

//   React.useEffect(() => {
//     userService.isUser().then(
//       response => {
//         if (!user) {
//           window.location.replace('/login');
//         } else {
//           // dispatch({ action: 'LOG_IN' });
//           setLoading(false);
//         }
//       },
//       error => {
//         // User don't have access
//         if (error.response.status === 403) {
//           authService.logOut();
//           window.location.replace('/login');
//         }
//         // User is not logged in and there is no token
//         if (error.response.status === 401) {
//           window.location.replace('/login');
//         }
//       }
//     );

//     axios(`${adress}/api/moderator/${user.id}/notes`)
//       .then(response => {
//         console.log(response.data);
//         setNotesData(response.data);
//       })
//       .finally(() => {
//         setLoadingNotesData(false);
//       })
//       .catch(err => {
//         console.log('Error', err);
//       });

//     axios(`${adress}/api/moderator/${user.id}/alarmList`)
//       .then(response => {
//         setAlarmData(response.data);
//       })
//       .finally(() => {
//         setLoadingAlarmData(false);
//       })
//       .catch(err => {
//         console.log('Error', err);
//       });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <Layout>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
//       <Sidebar page={router.pathname}>
//         <Row>
//           <Col xs={12}>{user && <h3>Välkommen, {user.firstname}</h3>}</Col>
//           <Col md={6}>
//             <h4>Noteringar på motorer</h4>
//             {loadingNotesData ? (
//               <SSpinner animation="border">
//                 <span>Loading...</span>
//               </SSpinner>
//             ) : (
//               <NotesList data={notesData} />
//             )}
//           </Col>
//           <Col md={6}>
//             <h4>Larmlista</h4>
//             {loadingAlarmData ? (
//               <SSpinner animation="border">
//                 <span>Loading...</span>
//               </SSpinner>
//             ) : (
//               <AlarmList data={alarmData} />
//             )}
//           </Col>
//         </Row>
//       </Sidebar>
//     </Layout>
//   );
// };
export default Index;
