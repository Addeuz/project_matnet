import { Modal } from 'react-bootstrap';
import SButton from '../../styles/SButton';
// const { Formik } = require('formik');

const EditUserModal = ({ user, show, onHide }) => {
  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{`Redigera ${user.username}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Stäng</SButton>
      </Modal.Footer>
    </Modal>
    // <div>
    //   <Formik
    //     enableReinitialize
    //     initialValues={{
    //       username: user.username,
    //       email: user.email,
    //       password: '',
    //     }}
    //     onSubmit={(values, { setSubmitting }) => {
    //       console.log(values);
    //       setSubmitting(false);
    //     }}
    //   >
    //     {({
    //       values,
    //       isSubmitting,
    //       errors,
    //       touched,
    //       handleSubmit,
    //       handleChange,
    //       handleBlur,
    //     }) => (
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group controlId="formGroupUsername">
    //           <Form.Label>Användarnamn</Form.Label>
    //           <Form.Control
    //             type="text"
    //             value={values.username}
    //             name="username"
    //             onChange={handleChange}
    //             placeholder="Fyll i användarnamn"
    //           />
    //         </Form.Group>
    //         <Form.Group controlId="formGroupEmail">
    //           <Form.Label>E-mail</Form.Label>
    //           <Form.Control
    //             type="email"
    //             name="email"
    //             value={values.email}
    //             onChange={handleChange}
    //             placeholder="Fyll i e-mailadress"
    //           />
    //         </Form.Group>
    //         <Form.Group controlId="formGroupPassword">
    //           <Form.Label>Lösenord</Form.Label>
    //           <Form.Control
    //             type="password"
    //             name="password"
    //             value={values.password}
    //             onChange={handleChange}
    //             placeholder="Ändra lösenord"
    //           />
    //         </Form.Group>
    //         <Button type="submit" disabled={isSubmitting}>
    //           Ändra
    //         </Button>
    //       </Form>
    //     )}
    //   </Formik>
    // </div>
  );
};

export default EditUserModal;
