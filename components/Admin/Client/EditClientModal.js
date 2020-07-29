import { Formik } from 'formik';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { SButton, SAlert } from '../../../styles/styled';
import authHeader from '../../../services/auth-header';

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

const EditClientModal = ({ client, show, onHide }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  React.useEffect(() => {}, []);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{`Redigera ${client.clientName}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          enableReinitialize
          initialValues={{
            clientName: client.clientName,
            clientContactName: client.contactName,
            clientContactNumber: client.phoneNumber,
          }}
          onSubmit={(values, { setSubmitting }) => {
            const options = {
              headers: authHeader(),
            };

            axios
              .put(
                `http://localhost:3000/api/admin/client/${client.id}`,
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
                <Col xs={12} md={8}>
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
                  <Form.Group controlId="formGroupClientContactNumber">
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
                    Ändra
                  </SButton>
                  {message && <SAlert variant="success">{message}</SAlert>}
                  {error && <SAlert variant="danger">{error}</SAlert>}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditClientModal;
