import styled from 'styled-components';
/* eslint-disable react/button-has-type */
import Layout from '../components/Layout';
// import { UserContext } from '../components/UserContext';
import Sidebar from '../components/Navigation/Sidebar';

const Div = styled.div`
  background-color: red;
`;

const About = () => (
  // const { user, setUser } = React.useContext(UserContext);

  <Layout>
    <Sidebar page="/">
      <Div>hello about m8</Div>
    </Sidebar>
  </Layout>
);
export default About;
