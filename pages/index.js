import { useRouter } from 'next/router';
import Head from 'next/head';

import { Col, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Layout, { siteTitle } from '../components/Layout';
import { UserContext } from '../components/UserContext';
import Sidebar from '../components/Navigation/Sidebar';
import userService from '../services/user.service';
import authService from '../services/auth.service';

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    userService.isUser().then(
      response => {
        if (!user) {
          window.location.replace('/login');
        } else {
          // dispatch({ action: 'LOG_IN' });
          setLoading(false);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Sidebar page={router.pathname}>
        <Row>
          <Col md={8}>{user && <h3>Välkommen, {user.firstname}</h3>}</Col>
          <Col md={4}>
            <h4>Larmlista</h4>
          </Col>
        </Row>
      </Sidebar>
    </Layout>
  );
};
export default Index;
