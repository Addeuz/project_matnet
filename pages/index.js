import { useRouter } from 'next/router';
import Head from 'next/head';

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
    userService.getUserBoard().then(
      response => {
        console.log(response.data);
        if (!user) {
          router.push('/login');
        } else {
          // dispatch({ action: 'LOG_IN' });
          setLoading(false);
        }
      },
      error => {
        console.log(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
        // User don't have access
        if (error.response.status === 403) {
          authService.logOut();
          router.push('/login');
        }
        // User is not logged in and there is no token
        if (error.response.status === 401) {
          router.push('/login');
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <Loader />
  ) : (
    // <Layout>
    // </Layout>
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Sidebar page={router.pathname}>
        <div>hello logged in</div>
      </Sidebar>
    </Layout>
  );
  // return <Loader />;
};
export default Index;
