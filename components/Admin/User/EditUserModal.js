import { Modal, Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import axios from 'axios';

import styled from 'styled-components';
import { SButton, SAlert, SRow, SCol } from '../../../styles/styled';
import authHeader from '../../../services/auth-header';

const FormColumn = styled(SCol)`
  padding-left: 0;
`;

const FormGroup = Form.Group;

const SFormGroup = styled(FormGroup)`
  margin-bottom: 0.25rem;

  .custom-form-check-input {
    input {
      margin-top: 9px;
      @media only screen and (max-width: 768px) {
        margin-top: 7px;
      }
    }
  }
`;

// Component that opens up a modal and allows the user to edit a user
// props:
//    user - the user chosen to be edited
//    roles - the roles that the user can have
//    clients - all clients added into Mätnet
//    show - a boolean that is being passed to the Modal component to decide if the modal is visible or not
//    onHide - the function that determines what is to be done when the model is somehow closed

const EditUserModal = ({ user, roles, clients, show, onHide }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [userClients, setUserClients] = React.useState([]);

  React.useEffect(() => {
    if (user.clients[0]) {
      const temp = [];
      user.clients.forEach(client => {
        temp.push(client.clientName);
      });
      setUserClients(temp);
    }
    console.log(user);
  }, [user, user.clients]);

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
            motormon: user.motormon,
            baker: user.baker,
            meggningstator: user.meggningstator,
            meggningrotor: user.meggningrotor,
            driftström: user['driftström'],
            lindtemp: user.lindtemp,
            vibration: user.vibration,
            smörjning: user['smörjning'],
            okulärintern: user['okulärintern'],
            okulärextern: user['okulärextern'],
            manteltemp: user.manteltemp,
            släpringsyta: user['släpringsyta'],
            lagerkondde: user.lagerkondde,
            lagerkondnde: user.lagerkondnde,
            spmde: user.spmde,
            spmnde: user.spmnde,
            lagertempde: user.lagertempde,
            lagertempnde: user.lagertempnde,
            lagerisolering: user.lagerisolering,
            renhet: user.renhet,
            kylpaket: user.kylpaket,
            kolborstar: user.kolborstar,
            varvtalsgivare: user.varvtalsgivare,
            'tan-delta': user['tan-delta'],
            'pol-index': user['pol-index'],
            kommutatoryta: user.kommutatoryta,
            kollektortemp: user.kollektortemp,
            driftservice: user.driftservice,
            stoppservice: user.stoppservice,
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
                  motormon: values.motormon,
                  baker: values.baker,
                  meggningstator: values.meggningstator,
                  meggningrotor: values.meggningrotor,
                  driftström: values['driftström'],
                  lindtemp: values.lindtemp,
                  vibration: values.vibration,
                  smörjning: values['smörjning'],
                  okulärintern: values['okulärintern'],
                  okulärextern: values['okulärextern'],
                  manteltemp: values.manteltemp,
                  släpringsyta: values['släpringsyta'],
                  lagerkondde: values.lagerkondde,
                  lagerkondnde: values.lagerkondnde,
                  spmde: values.spmde,
                  spmnde: values.spmnde,
                  lagertempde: values.lagertempde,
                  lagertempnde: values.lagertempnde,
                  lagerisolering: values.lagerisolering,
                  renhet: values.renhet,
                  kylpaket: values.kylpaket,
                  kolborstar: values.kolborstar,
                  varvtalsgivare: values.varvtalsgivare,
                  'tan-delta': values['tan-delta'],
                  'pol-index': values['pol-index'],
                  kommutatoryta: values.kommutatoryta,
                  kollektortemp: values.kollektortemp,
                  driftservice: values.driftservice,
                  stoppservice: values.stoppservice,
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
              <SFormGroup as={Row}>
                <Col xs={12}>
                  <Form.Label>Behörighet att lägga till data</Form.Label>
                </Col>

                <Col xs={6}>
                  <Form.Check
                    id="motormon"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Motormon"
                    checked={values.motormon}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="baker"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Baker"
                    checked={values.baker}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="meggningstator"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning stator"
                    checked={values.meggningstator}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="meggningrotor"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning rotor"
                    checked={values.meggningrotor}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="driftström"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Driftström"
                    checked={values['driftström']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lindtemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lind temp"
                    checked={values.lindtemp}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="vibration"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Vibration"
                    checked={values.vibration}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="smörjning"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Smörjning"
                    checked={values['smörjning']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="okulärextern"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär extern"
                    checked={values['okulärextern']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="okulärintern"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär intern"
                    checked={values['okulärintern']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="manteltemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Mantel temp"
                    checked={values.manteltemp}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="släpringsyta"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Släpringsyta"
                    checked={values['släpringsyta']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lagerkondde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond DE"
                    checked={values.lagerkondde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lagerkondnde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond NDE"
                    checked={values.lagerkondnde}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Check
                    id="spmde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm DE"
                    checked={values.spmde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="spmnde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm NDE"
                    checked={values.spmnde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lagertempde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp DE"
                    checked={values.lagertempde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lagertempnde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp NDE"
                    checked={values.lagertempnde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="lagerisolering"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager isolering"
                    checked={values.lagerisolering}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="renhet"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Renhet"
                    checked={values.renhet}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="kylpaket"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kylpaket"
                    checked={values.kylpaket}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="kolborstar"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kolborstar"
                    checked={values.kolborstar}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="varvtalsgivare"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Varvtalsgivare"
                    checked={values.varvtalsgivare}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="tan-delta"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Tan-delta"
                    checked={values['tan-delta']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="pol-index"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Pol-index"
                    checked={values['pol-index']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="kommutatoryta"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kommutator yta"
                    checked={values.kommutatoryta}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="kollektortemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kollektor temp"
                    checked={values.kollektortemp}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="driftservice"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Driftservice"
                    checked={values.driftservice}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="stoppservice"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Stoppservice"
                    checked={values.stoppservice}
                    onChange={handleChange}
                  />
                </Col>
              </SFormGroup>
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
