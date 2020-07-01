import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { Accordion, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import adminService from '../../services/admin.service';
import Sidebar from '../../components/Navigation/Sidebar';
import UserCard from '../../components/Admin/UserCard';

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

const HandleUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  // const [selectedUser, setSelectedUser] = React.useState(null);
  const [page, setPage] = React.useState('');

  const router = useRouter();

  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');

    adminService.getUsers().then(
      response => {
        console.log(response.data);
        setUsers(response.data);
      },
      error => {
        setUsers(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
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
          {users.map(user => (
            <UserCard filter={filter} user={user} key={user.id} />
          ))}
        </SAccordion>
      </Sidebar>
    </Layout>
  );
};

export default HandleUsers;
