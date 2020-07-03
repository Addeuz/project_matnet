import { Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup';

import SButton from '../../styles/SButton';
import authHeader from '../../services/auth-header';

// const { Formik } = require('formik');

const schema = yup.object({
  username: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
});

const EditUserModal = ({ user, show, onHide }) => {
  React.useEffect(() => {}, []);

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
            // schema
            //   .validate(values)
            //   .then(value => {
            //     console.log(`validation: ${JSON.stringify(value)}`);
            //   })
            //   .catch(error => {
            //     errors[error.path] = error.message;
            //     // errors.error.path = error.message;
            //     console.log(errors);
            //   });

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
              console.log(values.password.length);
              if (values.password.length < 8) {
                errors.password = 'Lösenordet är för kort';
              } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Lösenorden måste stämma överens';
              }
            }

            console.log(errors);
            return errors;
          }}
          initialValues={{
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            const options = {
              headers: authHeader(),
            };
            axios
              .post(
                `http://localhost:3000/api/admin/users/${user.id}`,
                {
                  username: values.username,
                  email: values.email,
                  firstname: values.firstname,
                  lastname: values.lastname,
                  password: values.password,
                },
                options
              )
              .then(
                response => {
                  console.log(response);
                },
                error => {
                  console.log(error.message);
                }
              );
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
              <SButton type="submit" disabled={isSubmitting}>
                Ändra
              </SButton>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Stäng</SButton>
      </Modal.Footer>
    </Modal>
    // <div>

    // </div>
  );
};

export default EditUserModal;
