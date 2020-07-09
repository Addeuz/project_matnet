import { useRouter } from 'next/router';
import { Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import Layout from '../../../components/Layout';
import Sidebar from '../../../components/Navigation/Sidebar';
import { SButton, SSpinner } from '../../../styles/styled';
// import authHeader from '../../services/auth-header';
import useFetch from '../../../utils/hooks/useFetch';
import AdminDispatch from '../../../components/AdminDispatch';

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

const RegisterUser = () => {
  // const { user, setUser } = React.useContext(UserContext);
  const router = useRouter();
  const [page, setPage] = React.useState('');

  const { response, isLoading, isError } = useFetch(
    `http://localhost:3000/api/admin/roles`
  );

  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [router.pathname]);
  return (
    <AdminDispatch>
      <Layout>
        <Sidebar page={page}>
          <h3>Registrera ny användare</h3>
          <Formik
            enableReinitialize
            // validate={values => {
            //   const errors = {};

            //   // if (!values.username) {
            //   //   errors.username = 'Detta fältet krävs';
            //   // }
            //   // if (!values.email) {
            //   //   errors.email = 'Detta fältet krävs';
            //   // }
            //   // if (
            //   //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            //   // ) {
            //   //   errors.email = 'E-mailadressen måste vara en giltig e-mail';
            //   // }
            //   // if (!values.firstname) {
            //   //   errors.firstname = 'Detta fältet krävs';
            //   // }
            //   // if (!values.lastname) {
            //   //   errors.lastname = 'Detta fältet krävs';
            //   // }
            //   // if (values.password.length < 8) {
            //   //   errors.password = 'Lösenordet är för kort';
            //   // }
            //   // if (!values.password) {
            //   //   errors.password = 'Detta fältet krävs';
            //   // }
            //   // if (!values.confirmPassword) {
            //   //   errors.confirmPassword = 'Detta fältet krävs';
            //   // }
            //   // if (values.password !== values.confirmPassword) {
            //   //   errors.confirmPassword = 'Lösenorden måste stämma överens';
            //   // }

            //   return errors;
            // }}
            initialValues={{
              username: '',
              email: '',
              firstname: '',
              lastname: '',
              password: '',
              confirmPassword: '',
              userRole: 'kund',
              motormon: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
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
                    <SButton type="submit" disabled={isSubmitting}>
                      Registrera
                    </SButton>
                  </Col>
                  <Col>
                    <h5>Användarbehörigheter</h5>
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
                            name="userRole"
                            isValid={touched.userRole}
                            as="select"
                          >
                            {response.map(role => (
                              <option value={role.name} key={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Behörigheter</Form.Label>
                        </Form.Group>
                      </>
                    )}
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
