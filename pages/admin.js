import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Sidebar from '../components/Navigation/Sidebar';

// export async function getServerSideProps() {
//   let userData;
//   if (typeof window !== 'undefined') {
//     adminService.getUsers().then(response => {
//       console.log(response.data);
//       userData = response.data.toString();
//     });
//   }
//   return {
//     props: {
//       userData,
//     },
//   };
// }

// TODO: add back check for if user is logged in

const Admin = () => {
  const router = useRouter();

  return (
    <Layout>
      <Sidebar page={router.pathname}>
        <h3>Administratörpanel</h3>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nemo
        neque earum nisi sint dolor mollitia! Dicta suscipit, in debitis
        pariatur deserunt totam cupiditate. Perferendis, neque. Nihil, quam
        veniam. Laboriosam.Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Voluptas nemo neque earum nisi sint dolor mollitia! Dicta
        suscipit, in debitis pariatur deserunt totam cupiditate. Perferendis,
        neque. Nihil, quam veniam. Laboriosam.Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Voluptas nemo neque earum nisi sint dolor
        mollitia! Dicta suscipit, in debitis pariatur deserunt totam cupiditate.
        Perferendis, neque. Nihil, quam veniam. Laboriosam.Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Voluptas nemo neque earum nisi sint
        dolor mollitia! Dicta suscipit, in debitis pariatur deserunt totam
        cupiditate. Perferendis, neque. Nihil, quam veniam. Laboriosam.Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nemo neque
        earum nisi sint dolor mollitia! Dicta suscipit, in debitis pariatur
        deserunt totam cupiditate. Perferendis, neque. Nihil, quam veniam.
        Laboriosam.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Voluptas nemo neque earum nisi sint dolor mollitia! Dicta suscipit, in
        debitis pariatur deserunt totam cupiditate. Perferendis, neque. Nihil,
        quam veniam. Laboriosam.
      </Sidebar>
    </Layout>
  );
};

export default Admin;
