import styled from 'styled-components';
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Layout from '../../components/Layout';
import { UserContext } from '../../components/UserContext';
import Sidebar from '../../components/Navigation/Sidebar';

import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
} from '../../styles/styled';
import AddEngineModal from '../../components/Engine/AddEngineModal';
import Loader from '../../components/Loader';

const Div = styled.div`
  background-color: red;
`;

const EngineIndex = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <Layout>
      <Sidebar page="/">
        <SRow>
          <SCol xs={7} lg={5}>
            <h3>Motorer</h3>
          </SCol>

          <AddButtonCol xs={5} lg={3}>
            {!isLoading &&
              (user.roles[0] === 'ROLE_ADMIN' ||
                user.roles[0] === 'ROLE_MODERATOR') && (
                <Button variant="success" onClick={() => setModalShow(true)}>
                  <span>Lägg till ny</span>
                </Button>
              )}
          </AddButtonCol>
          <SCol xs={12} lg={4}>
            <InputGroup>
              <FormControl
                placeholder="Filtrera"
                aria-label="Filtrera"
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
          <SCol xs={12}>
            {/* <SAccordion>
            {isError && <div>{isError.response.data.message}</div>}
            {isLoading && (
              <SSpinner animation="border">
                <span>Loading...</span>
              </SSpinner>
            )}
            {!isError &&
              response &&
              response.users.map(user => (
                <UserCard
                  filter={filter}
                  user={user}
                  roles={response.roles}
                  clients={response.clients}
                  key={user.id}
                />
              ))}
          </SAccordion> */}
          </SCol>
        </SRow>
      </Sidebar>
      <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
    </Layout>
  );
};

export default EngineIndex;
