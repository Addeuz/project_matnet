import { useRouter } from 'next/router';
import { Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Layout from '../../../components/Layout';
import Sidebar from '../../../components/Navigation/Sidebar';
import { SButton, SSpinner, SAlert } from '../../../styles/styled';
import useFetch from '../../../utils/hooks/useFetch';

import AdminDispatch from '../../../components/AdminDispatch';
import authHeader from '../../../services/auth-header';

// FIXME: kanske spara i en databas, gör såhär just nu
// const authoritiesItems = [
//   'Motormon',
//   'Baker',
//   'Tan-delta',
//   'Spm De',
//   'Spm Nde',
//   'Vibration',
//   'Meggning stator',
//   'Meggning rotor',
//   'Pol-index',
//   'Lind-temp',
//   'Lager temp De',
//   'Lager temp Nde',
//   'Okulär intern',
//   'Okulär extern',
//   'Varvtalsgivare',
//   'Kylpaket',
//   'Driftström',
//   'Komm/Släp yta',
//   'Renhet',
//   'Kolborstar',
//   'Lager kond De',
//   'Lager kond Nde',
//   'Lager isolering',
//   'Smörjning',
//   'Kollektot temp',
//   'Mantel temp',
//   'Driftservice',
//   'Stoppservice',
// ];

const schema = yup.object({
  username: yup.string().required('Detta fältet krävs'),
  email: yup
    .string()
    .required('Detta fältet krävs')
    .email('Måste vara en giltig e-mailadress'),
  firstname: yup.string().required('Detta fältet krävs'),
  lastname: yup.string().required('Detta fältet krävs'),
  password: yup
    .string()
    .required('Detta fältet krävs')
    .min(8, 'Lösenordet måste vara minst 8 tecken'),
  confirmPassword: yup
    .string()
    .required('Detta fältet krävs')
    .oneOf([yup.ref('password'), null], 'Lösenorden måste stämma överens'),
  clients: yup
    .array()
    .required('Minst en kunde måste väljas')
    .min(1, 'Minst en kunde måste väljas'),
});

const RegisterUser = () => {
  const router = useRouter();
  const [page, setPage] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const { response, isLoading, isError } = useFetch(
    `http://localhost:3000/api/admin/register`
  );

  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [response, router.pathname]);
  return (
    <AdminDispatch>
      <Layout>
        <Sidebar page={page}>
          <h3>Registrera ny användare</h3>
          <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={{
              username: '',
              email: '',
              firstname: '',
              lastname: '',
              password: '',
              confirmPassword: '',
              roles: 'kund',
              clients: [],
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              const options = {
                headers: authHeader(),
              };
              axios
                .post(
                  `http://localhost:3000/api/auth/signup`,
                  {
                    username: values.username,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    password: values.password,
                    roles: values.roles,
                    clients: values.clients,
                  },
                  options
                )
                .then(
                  () => {
                    setError('');
                    setMessage('Användaren skapad');
                  },
                  error => {
                    setMessage('');
                    setError(error.response.data.message);
                  }
                );

              setSubmitting(false);
            }}
          >
            {({
              values,
              isSubmitting,
              errors,
              touched,
              handleSubmit,
              handleChange,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formGroupUsername">
                      <Form.Label>Användarnamn</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.username}
                        name="username"
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={touched.username && errors.username}
                        placeholder="Fyll i användarnamn"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupEmail">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                        onChange={handleChange}
                        placeholder="Fyll i e-mailadress"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupFirstname">
                      <Form.Label>Förnamn</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        isValid={touched.firstname && !errors.firstname}
                        isInvalid={touched.firstname && errors.firstname}
                        onChange={handleChange}
                        placeholder="Fyll i förnamn"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.firstname}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupLastname">
                      <Form.Label>Efternamn</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        isValid={touched.lastname && !errors.lastname}
                        isInvalid={touched.lastname && errors.lastname}
                        onChange={handleChange}
                        placeholder="Fyll i efternamn"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.lastname}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                      <Form.Label>Lösenord</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && errors.password}
                        onChange={handleChange}
                        placeholder="Ändra lösenord"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupConfirmPassword">
                      <Form.Label>Bekräfta lösenord</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onChange={handleChange}
                        placeholder="Bekräfta lösenord"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    {isError && <div>{isError}</div>}
                    {isLoading ? (
                      <SSpinner animation="border">
                        <span>Loading...</span>
                      </SSpinner>
                    ) : (
                      <>
                        <Form.Group>
                          <Form.Label>Användarroll</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name="roles"
                            value={values.roles}
                            isValid={touched.roles}
                            as="select"
                          >
                            {response.roles.map(role => (
                              <option value={role.name} key={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Kunder</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            value={values.clients}
                            name="clients"
                            isValid={touched.clients && !errors.clients}
                            isInvalid={touched.clients && errors.clients}
                            as="select"
                            multiple
                          >
                            {response.clients.map(client => (
                              <option value={client.clientName} key={client.id}>
                                {client.clientName}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback tooltip="true" type="invalid">
                            {errors.clients}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <SButton type="submit" disabled={isSubmitting}>
                      Registrera
                    </SButton>
                    {message && <SAlert variant="success">{message}</SAlert>}
                    {error && <SAlert variant="danger">{error}</SAlert>}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Sidebar>
      </Layout>
    </AdminDispatch>
  );
};
export default RegisterUser;
