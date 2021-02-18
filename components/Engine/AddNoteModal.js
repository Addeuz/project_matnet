import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik } from 'formik';
import * as yup from 'yup';
import EditLowVoltage from './LowVoltage/EditLowVoltage';
import EditHighVoltage from './HighVoltage/EditHighVoltage';
import EditDirectCurrent from './DirectCurrent/EditDirectCurrent';
import EditPowerTrain from './PowerTrain/EditPowerTrain';
import authHeader from '../../services/auth-header';
import { SAlert, SButton } from '../../styles/styled';
import { InfoText } from '../AlarmList';
import { UserContext } from '../UserContext';

const schema = yup.object({
  note: yup.string().required('Noten får ej lämnas tom'),
});

const AddNoteModal = ({ show, onHide, engine }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const { user } = React.useContext(UserContext);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Lägg till en not för {engine.tagNr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          enableReinitialize
          initialValues={{
            note: '',
            date: Date.now(),
          }}
          onSubmit={(values, { setSubmitting }) => {
            const options = {
              headers: authHeader(),
            };

            const date = new Date(values.date);

            axios
              .post(
                `http://localhost:3000/api/moderator/${engine.id}/${user.id}/notes`,
                {
                  note: values.note,
                  date,
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
                <Col xs={12}>
                  <Form.Group controlId="formGroupNote">
                    <Form.Label>Not</Form.Label>
                    <Form.Control
                      type="text"
                      as="textarea"
                      rows={2}
                      value={values.note}
                      name="note"
                      onChange={handleChange}
                      isValid={touched.note && !errors.note}
                      isInvalid={touched.note && errors.note}
                    />
                    <Form.Control.Feedback tooltip="true" type="invalid">
                      {errors.note}
                    </Form.Control.Feedback>
                  </Form.Group>{' '}
                </Col>
                <Col xs={12} md={8} lg={6}>
                  <Form.Group controlId="formGroupDate" className="mb-1">
                    <Form.Label>Datum</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      isValid={touched.date && !errors.date}
                      isInvalid={touched.date && errors.date}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback tooltip="true" type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <InfoText className="mb-3">
                    Väljs inget datum sparas dagens datum
                  </InfoText>
                </Col>
                <Col xs={12}>
                  <SButton type="submit" disabled={isSubmitting}>
                    Lägg till not
                  </SButton>
                  {message && <SAlert variant="success">{message}</SAlert>}
                  {error && <SAlert variant="danger">{error}</SAlert>}{' '}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddNoteModal;
