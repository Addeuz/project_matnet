import { Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';

import styled from 'styled-components';
import { SButton, SAlert, SRow, SCol } from '../../../styles/styled';
import authHeader from '../../../services/auth-header';

// const { Formik } = require('formik');

const FormColumn = styled(SCol)`
  padding-left: 0;
`;

// const FormROw = styled(SRow)``;

const EditUserModal = ({ user, roles, clients, show, onHide }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [userClients, setUserClients] = React.useState([]);
  console.log(clients);
  console.log(user.clients);

  React.useEffect(() => {
    if (user.clients[0]) {
      const temp = [];
      user.clients.forEach(client => {
        temp.push(client.clientName);
      });
      setUserClients(temp);
    }
  }, [user.clients]);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{`Redigera ${user.username}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize
          validate={values => {
            const errors = {};
            // TODO: change this to yup, or look into checking if somethings are equal
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

            if (values.password) {
              if (values.password.length < 8) {
                errors.password = 'Lösenordet är för kort';
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Lösenorden måste stämma överens';
              }
            }

            if (!values.clients) {
              error.clients = 'Detta fältet krävs';
            }

            return errors;
          }}
          initialValues={{
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.roles[0] ? user.roles[0].name : '',
            clients: userClients,
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            const options = {
              headers: authHeader(),
            };
            console.log(values);
            axios
              .post(
                `http://localhost:3000/api/admin/users/${user.id}`,
                {
                  username: values.username,
                  email: values.email,
                  firstname: values.firstname,
                  lastname: values.lastname,
                  role: values.role,
                  clients: values.clients,
                  password: values.password,
                },
                options
              )
              .then(
                response => {
                  setMessage(response.data.message);
                },
                error => {
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
                  disabled={!values.password}
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  isValid={touched.confirmPassword && !errors.confirmPassword}
                  isInvalid={touched.confirmPassword && errors.confirmPassword}
                  onChange={handleChange}
                  placeholder="Bekräfta lösenord"
                />
                <Form.Control.Feedback tooltip="true" type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <SRow>
                <FormColumn xs={12} md={6}>
                  <Form.Group>
                    <Form.Label>Användarroll</Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="role"
                      value={values.role}
                      isValid={touched.role}
                      as="select"
                    >
                      {roles.map(role => (
                        <option value={role.name} key={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </FormColumn>
                <FormColumn xs={12} md={6}>
                  {console.log(values.clients)}
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
                      {clients.map(client => (
                        <option value={client.clientName} key={client.id}>
                          {client.clientName}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback tooltip="true" type="invalid">
                      {errors.clients}
                    </Form.Control.Feedback>
                  </Form.Group>
                </FormColumn>
              </SRow>
              <SButton type="submit" disabled={isSubmitting}>
                Ändra
              </SButton>
              {message && <SAlert variant="success">{message}</SAlert>}
              {error && <SAlert variant="danger">{error}</SAlert>}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Stäng</SButton>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
