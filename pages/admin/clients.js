import { useRouter } from 'next/router';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import Link from 'next/link';
import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
} from '../../styles/styled';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Navigation/Sidebar';
import useFetch from '../../utils/hooks/useFetch';
import ClientCard from '../../components/Admin/Client/ClientCard';
import AdminDispatch from '../../components/AdminDispatch';

const Clients = () => {
  const router = useRouter();

  // TODO: Fix this api endpoint
  const { response, isLoading, isError } = useFetch(
    `http://localhost:3000/api/admin/clients`
  );

  const [filter, setFilter] = React.useState('');
  const [page, setPage] = React.useState('');

  React.useEffect(() => {
    console.log(response);
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [response, router.pathname]);

  return (
    <AdminDispatch>
      <Layout>
        <Sidebar page={page}>
          <SRow>
            <SCol xs={7} lg={5}>
              <h3>Kunder</h3>
            </SCol>
            <AddButtonCol xs={5} lg={3}>
              <Link href="/admin/register/client">
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
                  response.map(client => (
                    <ClientCard
                      filter={filter}
                      client={client}
                      key={client.id}
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

export default Clients;
