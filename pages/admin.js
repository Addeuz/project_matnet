import { useRouter } from 'next/router';

import Head from 'next/head';
import Layout from '../components/Layout';
import Sidebar from '../components/Navigation/Sidebar';
import AdminDispatch from '../components/AdminDispatch';

const Admin = () => {
  const router = useRouter();

  return (
    <AdminDispatch>
      <Layout>
        <Head>
          <title>Administratörspanel</title>
        </Head>
        <Sidebar page={router.pathname}>
          <h3>Administratörpanel</h3>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas
          nemo neque earum nisi sint dolor mollitia! Dicta suscipit, in debitis
          pariatur deserunt totam cupiditate. Perferendis, neque. Nihil, quam
          veniam. Laboriosam.Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Voluptas nemo neque earum nisi sint dolor mollitia! Dicta
          suscipit, in debitis pariatur deserunt totam cupiditate. Perferendis,
          neque. Nihil, quam veniam. Laboriosam.Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Voluptas nemo neque earum nisi sint
          dolor mollitia! Dicta suscipit, in debitis pariatur deserunt totam
          cupiditate. Perferendis, neque. Nihil, quam veniam. Laboriosam.Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nemo
          neque earum nisi sint dolor mollitia! Dicta suscipit, in debitis
          pariatur deserunt totam cupiditate. Perferendis, neque. Nihil, quam
          veniam. Laboriosam.Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Voluptas nemo neque earum nisi sint dolor mollitia! Dicta
          suscipit, in debitis pariatur deserunt totam cupiditate. Perferendis,
          neque. Nihil, quam veniam. Laboriosam.Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Voluptas nemo neque earum nisi sint
          dolor mollitia! Dicta suscipit, in debitis pariatur deserunt totam
          cupiditate. Perferendis, neque. Nihil, quam veniam. Laboriosam.
        </Sidebar>
      </Layout>
    </AdminDispatch>
  );
};

export default Admin;
