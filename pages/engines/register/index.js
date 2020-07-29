import styled from 'styled-components';
/* eslint-disable react/button-has-type */
import Link from 'next/link';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { Formik } from 'formik';
import Layout from '../../../components/Layout';
// import { UserContext } from '../components/UserContext';
import Sidebar from '../../../components/Navigation/Sidebar';

import {
  SRow,
  SCol,
  SAccordion,
  SSpinner,
  AddButtonCol,
  SButton,
  SAlert,
} from '../../../styles/styled';

const Div = styled.div`
  background-color: red;
`;

const EngineRegister = () => (
  // const { user, setUser } = React.useContext(UserContext);

  <Layout>
    <Sidebar page="/">
      <h3>Lägg till en ny motor</h3>
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
                isValid={touched.clientContactName && !errors.clientContactName}
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
                  touched.clientContactNumber && !errors.clientContactNumber
                }
                isInvalid={
                  touched.clientContactNumber && errors.clientContactNumber
                }
                onChange={handleChange}
                placeholder="Fyll i kontaktpersons nummer"
              />
              <Form.Control.Feedback tooltip="true" type="invalid">
                {errors.clientContactNumber}
              </Form.Control.Feedback>
            </Form.Group>
            <SButton type="submit" disabled={isSubmitting}>
              Lägg till
            </SButton>
            {message && <SAlert variant="success">{message}</SAlert>}
            {error && <SAlert variant="danger">{error}</SAlert>}
          </Form>
        )}
      </Formik>
    </Sidebar>
  </Layout>
);
export default EngineRegister;
