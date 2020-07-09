import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import styled from 'styled-components';

import { Form, Alert } from 'react-bootstrap';

import { SButton } from '../styles/styled';

import AuthService from '../services/auth.service';
import { UserContext } from '../components/UserContext';

const SDiv = styled.div`
  background-color: var(--green_100);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 20vw;
  margin-bottom: 1rem;

  @media only screen and (max-width: 768px) {
    width: 50vw;
  }
`;

const Header = styled.h1`
  color: var(--yellow);
  margin-bottom: 3rem;
`;

const LoginDiv = styled.div`
  border-radius: 0.25rem;
`;

const SForm = styled(Form)`
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;

  label {
    color: var(--yellow);
  }
`;

const CustomButton = styled(SButton)`
  :hover {
    background-color: var(--green_80);
    color: var(--yellow);
  }

  :active {
    background-color: var(--green_60) !important;
    color: var(--yellow) !important;
  }

  :focus {
    background-color: var(--green_60) !important;
    color: var(--yellow) !important;
  }
`;

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const router = useRouter();

  const [error, setError] = React.useState(null);
  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SDiv className="">
      <Logo src="/Assemblin_Wordmark_Yellow_RGB.svg" alt="Assemblin logo" />
      <Header>Mätnet</Header>
      <LoginDiv>
        <Formik
          validationSchema={schema}
          initialValues={{ username: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            AuthService.login(values.username, values.password).then(
              () => {
                setSubmitting(true);
                window.location.replace('/');
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                setSubmitting(false);

                setError(resMessage);
              }
            );
          }}
        >
          {({
            values,
            isSubmitting,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <SForm noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="formGroupUsername">
                <Form.Label>Användarnamn</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && errors.username}
                  onBlur={handleBlur}
                  placeholder="Fyll i användarnamn"
                />
                <Form.Control.Feedback tooltip="true" type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Lösenord</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                  onBlur={handleBlur}
                  placeholder="Lösenord"
                />
                <Form.Control.Feedback tooltip="true" type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <CustomButton type="submit" disabled={isSubmitting}>
                Logga in
              </CustomButton>
              {error && (
                <Alert variant="danger" className="mt-2 position-relative">
                  {error}
                </Alert>
              )}
            </SForm>
          )}
        </Formik>
      </LoginDiv>
    </SDiv>
  );
};

export default Login;
