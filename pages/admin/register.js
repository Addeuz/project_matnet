import { useRouter } from 'next/router';
import { Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Navigation/Sidebar';
import SButton from '../../styles/SButton';
import authHeader from '../../services/auth-header';

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
        <h3>Registrera ny användare</h3>
        <Formik
          enableReinitialize
          validate={values => {
            const errors = {};

            if (!values.username) {
              errors.username = 'Detta fältet krävs';
            }
            if (!values.email) {
              errors.email = 'Detta fältet krävs';
            }
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'E-mailadressen måste vara en giltig e-mail';
            }
            if (!values.firstname) {
              errors.firstname = 'Detta fältet krävs';
            }
            if (!values.lastname) {
              errors.lastname = 'Detta fältet krävs';
            }
            if (values.password.length < 8) {
              errors.password = 'Lösenordet är för kort';
            }
            if (!values.password) {
              errors.password = 'Detta fältet krävs';
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = 'Detta fältet krävs';
            }
            if (values.password !== values.confirmPassword) {
              errors.confirmPassword = 'Lösenorden måste stämma överens';
            }

            // console.log(errors);
            return errors;
          }}
          initialValues={{
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            const options = {
              headers: authHeader(),
            };

            setSubmitting(false);
          }}
        >
          {({
            values,
            isSubmitting,
            validateOnChange,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
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
                  <h5>Behörigheter</h5>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Sidebar>
    </Layout>
  );
};
export default Register;
