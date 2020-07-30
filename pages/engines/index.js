/* eslint-disable react/button-has-type */
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import Layout from '../../components/Layout';
import { UserContext } from '../../components/UserContext';
import Sidebar from '../../components/Navigation/Sidebar';
import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
} from '../../styles/styled';
import AddEngineModal from '../../components/Engine/AddEngineModal';
import { adress } from '../../utils/hooks/useFetch';
import EngineCard from '../../components/Engine/EngineCard';

const EngineIndex = () => {
  const { user } = React.useContext(UserContext);
  // const { response, isLoading, isError } = useFetch(
  //   `/api/moderator/engines/${user.id}`
  // );

  const [response, setResponse] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setError] = React.useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {
    if (user) {
      axios(`${adress}/api/moderator/engines/${user.id}`)
        .then(response => {
          console.log(response.data);
          setIsLoading(false);
          setResponse(response.data);
        })
        .catch(err => {
          setError(err);
        });
      setLoading(false);
    }
  }, [user]);

  return (
    <Layout>
      <Sidebar page="/">
        <SRow>
          <SCol xs={7} lg={5}>
            <h3>Motorer</h3>
          </SCol>

          <AddButtonCol xs={5} lg={3}>
            {!loading &&
              (user.roles[0] === 'ROLE_ADMIN' ||
                user.roles[0] === 'ROLE_MODERATOR') && (
                <Button variant="success" onClick={() => setModalShow(true)}>
                  <span>Lägg till ny</span>
                </Button>
              )}
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
              {/* // <EngineCard key={engine.id} engine={engine} filter={filter} /> */}
              {!isError &&
                response &&
                response.map(engine => (
                  <EngineCard engine={engine} filter={filter} key={engine.id} />
                ))}
            </SAccordion>
          </SCol>
        </SRow>
      </Sidebar>
      <AddEngineModal show={modalShow} onHide={() => setModalShow(false)} />
    </Layout>
  );
};

export default EngineIndex;
