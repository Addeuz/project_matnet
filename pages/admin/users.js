import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

import Link from 'next/link';
import Layout from '../../components/Layout';
// import adminService from '../../services/admin.service';
import Sidebar from '../../components/Navigation/Sidebar';
import UserCard from '../../components/Admin/User/UserCard';

import useFetch from '../../utils/hooks/useFetch';
import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
} from '../../styles/styled';

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
          <SCol xs={7} lg={5}>
            <h3>Användare</h3>
          </SCol>
          <AddButtonCol xs={5} lg={3}>
            <Link href="/admin/register/user">
              <Button variant="success">
                <span>Lägg till ny</span>
              </Button>
            </Link>
          </AddButtonCol>
          <SCol xs={12} lg={4}>
            <InputGroup>
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
          <SCol xs={12}>
            <SAccordion>
              {isError && <div>{isError.response.data.message}</div>}
              {isLoading && (
                <SSpinner animation="border">
                  <span>Loading...</span>
                </SSpinner>
              )}
              {!isError &&
                response &&
                response.map(user => (
                  <UserCard filter={filter} user={user} key={user.id} />
                ))}
            </SAccordion>
          </SCol>
        </SRow>
      </Sidebar>
    </Layout>
  );
};

export default HandleUsers;
