import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Navigation/Sidebar';

const Register = () => {
  // const { user, setUser } = React.useContext(UserContext);
  const router = useRouter();
  const [page, setPage] = React.useState('');
  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [router.pathname]);
  return (
    <Layout>
      <Sidebar page={page}>
        <div>Registrera användare</div>
      </Sidebar>
    </Layout>
  );
};
export default Register;
