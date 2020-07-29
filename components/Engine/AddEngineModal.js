import { Formik } from 'formik';
import { Modal, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { SButton, SAlert } from '../../styles/styled';
import authHeader from '../../services/auth-header';
import LowVoltage from './LowVoltage';

const SRow = styled(Row)`
  [class*='col']:first-child {
    margin-bottom: 1rem;
    align-self: center;
    display: flex;
    justify-content: center;
  }
`;

// const schema = yup.object({
//   clientName: yup.string().required('Kundens namn får ej vara tomt'),
//   clientContactName: yup
//     .string()
//     .required('Kundens kontaktperson får ej vara tomt'),
//   clientContactNumber: yup
//     .string()
//     .required('Kontaktpersonen behöver ett telefonnummer')
//     .min(5, 'Telefonnumret måste vara längre än 5 siffror')
//     .max(15, 'Telefonnumret måste vara kortare än 15 siffor'),
// });

const AddEngineModal = ({ show, onHide }) => {
  const [type, setType] = React.useState('default');

  React.useEffect(() => {
    console.log(type);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setType('default');
      }}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Lägg till ny motor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SRow>
          <Col>
            <Form.Control
              as="select"
              style={{ width: '20rem' }}
              value={type}
              onChange={e => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="default">Välj typ...</option>
              <option value="lågspänd">Lågspänd</option>
              <option value="högspänd">Högspänd</option>
              <option value="likström">Likström</option>
              <option value="drivsystem">Drivsystem</option>
            </Form.Control>
          </Col>
          {type === 'default' && (
            <Col xs={12}>
              <span>Välj typ av motor först</span>
            </Col>
          )}
        </SRow>

        {type === 'lågspänd' && <LowVoltage engineType="lågspänd" />}
        {/* <Formik
          // validationSchema={schema}
          enableReinitialize
          initialValues={{
            clientName: '',
            clientContactName: '',
            clientContactNumber: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            // const options = {
            //   headers: authHeader(),
            // };

            // axios
            //   .put(
            //     `http://localhost:3000/api/admin/client/${client.id}`,
            //     {
            //       clientName: values.clientName,
            //       clientContactName: values.clientContactName,
            //       clientContactNumber: values.clientContactNumber,
            //     },
            //     options
            //   )
            //   .then(
            //     response => {
            //       setMessage(response.data.message);
            //     },
            //     error => {
            //       setError(error.message);
            //     }
            //   );

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
                <Col xs={12} md={6}>
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
                </Col>
                <Col xs={12} md={6}></Col>
              </Row>

              <SButton type="submit" disabled={isSubmitting}>
                Ändra
              </SButton>
              {message && <SAlert variant="success">{message}</SAlert>}
              {error && <SAlert variant="danger">{error}</SAlert>}
            </Form>
          )}
        </Formik> */}
      </Modal.Body>
    </Modal>
  );
};

export default AddEngineModal;
