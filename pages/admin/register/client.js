import { useRouter } from 'next/router';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as yup from 'yup';
import axios from 'axios';
import Sidebar from '../../../components/Navigation/Sidebar';
import Layout from '../../../components/Layout';
import { SButton, SAlert } from '../../../styles/styled';
import authHeader from '../../../services/auth-header';
import AdminDispatch from '../../../components/AdminDispatch';

const schema = yup.object({
  clientName: yup.string().required('Kundens namn får ej vara tomt'),
  clientContactName: yup
    .string()
    .required('Kundens kontaktperson får ej vara tomt'),
  clientContactNumber: yup
    .string()
    .required('Kontaktpersonen behöver ett telefonnummer')
    .min(5, 'Telefonnumret måste vara längre än 5 siffror')
    .max(15, 'Telefonnumret måste vara kortare än 15 siffor'),
});

// The view to handle a registration of a client (kund).

const RegisterClient = () => {
  const router = useRouter();
  const [page, setPage] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // set the page to admin so that Sidebar component know what links to show
    if (router.pathname.includes('/admin')) setPage('/admin');
  }, [router.pathname]);

  return (
    <AdminDispatch>
      <Layout>
        <Sidebar page={page}>
          <h3>Registrera ny kund</h3>
          <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={{
              clientName: '',
              clientContactName: '',
              clientContactNumber: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const options = {
                headers: authHeader(),
              };

              axios
                .post(
                  `http://localhost:3000/api/admin/register/client`,
                  {
                    clientName: values.clientName,
                    clientContactName: values.clientContactName,
                    clientContactNumber: values.clientContactNumber,
                  },
                  options
                )
                .then(
                  response => {
                    setMessage(response.data.message);
                  },
                  error => {
                    setError(error.message);
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
                  <Col xs={12} md={8} lg={6}>
                    <Form.Group controlId="formGroupClientName">
                      <Form.Label>Kundnamn</Form.Label>
                      <Form.Control
                        type="text"
                        value={values.clientName}
                        name="clientName"
                        onChange={handleChange}
                        isValid={touched.clientName && !errors.clientName}
                        isInvalid={touched.clientName && errors.clientName}
                        placeholder="Fyll i kundens namn"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.clientName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupClientContactName">
                      <Form.Label>Kundkontakt namn</Form.Label>
                      <Form.Control
                        type="text"
                        name="clientContactName"
                        value={values.clientContactName}
                        isValid={
                          touched.clientContactName && !errors.clientContactName
                        }
                        isInvalid={
                          touched.clientContactName && errors.clientContactName
                        }
                        onChange={handleChange}
                        placeholder="Fyll i kontaktpersons namn"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.clientContactName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formGroupClientContactName">
                      <Form.Label>Kundkontakt telefonnummer</Form.Label>
                      <Form.Control
                        type="text"
                        name="clientContactNumber"
                        value={values.clientContactNumber}
                        isValid={
                          touched.clientContactNumber &&
                          !errors.clientContactNumber
                        }
                        isInvalid={
                          touched.clientContactNumber &&
                          errors.clientContactNumber
                        }
                        onChange={handleChange}
                        placeholder="Fyll i kontaktpersons nummer"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.clientContactNumber}
                      </Form.Control.Feedback>
                    </Form.Group>
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

export default RegisterClient;
