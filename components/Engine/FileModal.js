import axios from 'axios';
import { Formik } from 'formik';
import { Form, Row, Col, Modal, FormFile, Table } from 'react-bootstrap';
import styled from 'styled-components';
import authHeader from '../../services/auth-header';

import { SButton, SAlert } from '../../styles/styled';
import { UserContext } from '../UserContext';
import FileList from './FileList';

const FileInput = styled(FormFile)`
  display: flex;
  margin: 0;
  /* width: 25%; */
  justify-content: center;
  background: var(--yellow);
  border-radius: 0.5rem;
  padding: 0.25rem 0;

  cursor: pointer;
  background-color: var(--yellow);
  color: var(--green_100);
  border: 0;

  :hover {
    background-color: var(--green_100);
    color: var(--yellow);
  }

  :active {
    background-color: var(--green_80) !important;
    color: var(--yellow) !important;
  }
  border-color: var(--green80);
  label {
    cursor: pointer;
    margin: 0;
  }

  input[type='file'] {
    display: none;
  }
`;

const FileModal = ({ show, onHide, files, engineId }) => {
  let firstValidate = 0;
  const { user } = React.useContext(UserContext);

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {}, []);

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Dokument</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user &&
          (user.roles[0] === 'ROLE_ADMIN' ||
            user.roles[0] === 'ROLE_MODERATOR') && (
            <Row className="mb-3">
              <Col xs={12}>
                <h6>Lägg till nytt dokument</h6>
                <Formik
                  validate={values => {
                    setMessage('');
                    setError('');
                    console.log('validate', values);
                    console.log('fileUpdates', firstValidate);
                    const errors = {};

                    if (values.fileName === '' || !values.fileName) {
                      errors.fileName = 'Filnamnet får ej lämnas tomt';
                    }
                    if (values.file === null) {
                      if (firstValidate === 0) {
                        firstValidate++;
                        errors.file = 'En fil måste väljas';
                        document.getElementById('fileError').style.display =
                          'block';
                        // body
                      } else {
                        firstValidate++;
                        errors.file = '';
                        document.getElementById('fileError').style.display =
                          'none';
                      }
                    } else {
                      firstValidate++;

                      document.getElementById('fileError').style.display =
                        'none';
                    }
                    return errors;
                  }}
                  initialValues={{
                    file: null,
                    fileName: '',
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const options = {
                      headers: authHeader(),
                    };

                    // check here if filename has a file ending

                    console.log(values);
                    console.log(values.file instanceof Blob);

                    toBase64(values.file)
                      .then(baseUrl => {
                        const mimeType = values.file.type;
                        const extension = values.file.name.split('.')[1];
                        const name = `${values.fileName}.${extension}`;
                        axios
                          .post(
                            `/api/moderator/${engineId}/${user.id}/file`,
                            {
                              name,
                              baseUrl,
                              mimeType,
                              extension,
                            },
                            options
                          )
                          .then(response => {
                            console.log(response.data.message);
                            setMessage(response.data.message);
                            setSubmitting(false);
                          })
                          .catch(error => {
                            if (error.response.status === 413) {
                              setError(
                                'Filen är för stor, försök att minska den!'
                              );
                            } else if (error.response.status === 500) {
                              setError(error.response.data.message);
                            } else {
                              setError('Okänt fel');
                            }
                          });
                      })
                      .catch(e => {
                        console.log('Error: ', e.message);
                      });
                    const base64File = await toBase64(values.file).catch(e =>
                      Error(e)
                    );
                    if (base64File instanceof Error) {
                      console.log('Error: ', base64File.message);
                    } else {
                      console.log(base64File);
                    }
                  }}
                >
                  {({
                    values,
                    isSubmitting,
                    errors,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    handleChange,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      {/* <Form.Group controlId="formFile"> */}
                      <Form.Row>
                        <Col xs={6} md={2}>
                          <FileInput
                            type="file"
                            id="file"
                            name="file"
                            accept="image/heic, image/jpeg, image/png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
                            label="Välj dokument"
                            onChange={event => {
                              console.log(event.currentTarget.files);
                              setFieldValue(
                                'file',
                                event.currentTarget.files[0]
                              );
                              setFieldValue(
                                'fileName',
                                event.currentTarget.files[0].name.split('.')[0]
                              );
                            }}
                          />
                        </Col>
                        <Col xs={12}>
                          <Form.Control.Feedback
                            id="fileError"
                            tooltip="true"
                            type="invalid"
                          >
                            {errors.file}
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Row>
                      {/* </Form.Group> */}
                      <Form.Row className="mt-2">
                        {/* <Form.Group controlId="formFileName"> */}
                        <Col xs={12}>
                          <Form.Label>Filnamn</Form.Label>
                        </Col>
                        <Col xs={12} md={5}>
                          <Form.Control
                            type="text"
                            name="fileName"
                            value={values.fileName}
                            isValid={touched.fileName && !errors.fileName}
                            isInvalid={touched.fileName && errors.fileName}
                            onChange={handleChange}
                            placeholder="Filens namn"
                          />
                        </Col>
                        <Col>
                          <Form.Control.Feedback tooltip="true" type="invalid">
                            {errors.fileName}
                          </Form.Control.Feedback>
                        </Col>
                        {/* </Form.Group> */}
                      </Form.Row>
                      <Form.Row className="mt-3">
                        <Col>
                          <SButton type="submit" disabled={isSubmitting}>
                            Ladda upp
                          </SButton>
                        </Col>
                      </Form.Row>
                      {message && <SAlert variant="success">{message}</SAlert>}
                      {error && <SAlert variant="danger">{error}</SAlert>}
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          )}
        <Row>
          <Col>
            {files.length > 0 ? (
              <>
                <Table hover size="sm">
                  <thead>
                    <tr>
                      <th>Filnamn</th>
                      <th>Uppladdat</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map(file => (
                      <FileList
                        key={file.createdAt}
                        setMessage={message => setMessage(message)}
                        setError={error => setError(error)}
                        file={file}
                        user={user}
                      />
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              'Det finns inga dokument inlagda än'
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Stäng</SButton>
      </Modal.Footer>
    </Modal>
  );
};

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export default FileModal;
