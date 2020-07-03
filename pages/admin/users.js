import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import {
  Accordion,
  Row,
  Col,
  InputGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';

import Layout from '../../components/Layout';
// import adminService from '../../services/admin.service';
import Sidebar from '../../components/Navigation/Sidebar';
import UserCard from '../../components/Admin/UserCard';

import useFetch from '../../utils/hooks/useFetch';

const SRow = styled(Row)`
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const SCol = styled(Col)`
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const SAccordion = styled(Accordion)`
  height: 80vh;
  overflow: auto;

  .card > .card-header {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

const SSpinner = styled(Spinner)`
  color: var(--yellow);
  display: flex;
  margin: 2rem auto;

  span {
    -webkit-tap-highlight-color: transparent;

    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const HandleUsers = () => {
  const router = useRouter();
  const { response, isLoading, isError } = useFetch(
    `http://localhost:3000/api/admin/users`
  );

  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState('');

  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [router.pathname]);

  return (
    <Layout>
      <Sidebar page={page}>
        <SRow>
          <SCol md={8}>
            <h3>Hantera användare</h3>
          </SCol>
          <SCol md={4}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Filtrera"
                aria-label="Filtrera"
                onChange={e => {
                  setFilter(e.target.value);
                  console.log(filter);
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
        <SAccordion>
          {isError && <div>{isError}</div>}
          {isLoading ? (
            <SSpinner animation="border">
              <span>Loading...</span>
            </SSpinner>
          ) : (
            response.map(user => (
              <UserCard filter={filter} user={user} key={user.id} />
            ))
          )}
        </SAccordion>
      </Sidebar>
    </Layout>
  );
};

export default HandleUsers;
