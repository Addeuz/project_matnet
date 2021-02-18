import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import Link from 'next/link';
import Head from 'next/head';
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
import AdminDispatch from '../../components/AdminDispatch';

const HandleUsers = () => {
  const router = useRouter();
  const { response, isLoading, isError } = useFetch(`/api/admin/users`);

  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState('');

  React.useEffect(() => {
    console.log(response);
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [response, router.pathname]);

  return (
    <AdminDispatch>
      <Layout>
        <Head>
          <title>Användare</title>
        </Head>
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
                  response.users.map(user => (
                    <UserCard
                      filter={filter}
                      user={user}
                      roles={response.roles}
                      clients={response.clients}
                      key={user.id}
                    />
                  ))}
              </SAccordion>
            </SCol>
          </SRow>
        </Sidebar>
      </Layout>
    </AdminDispatch>
  );
};

export default HandleUsers;
