import { useRouter } from 'next/router';
import { Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '../../../components/Layout';
import Sidebar from '../../../components/Navigation/Sidebar';
import { SButton, SSpinner, SAlert } from '../../../styles/styled';
import useFetch from '../../../utils/hooks/useFetch';

import AdminDispatch from '../../../components/AdminDispatch';
import authHeader from '../../../services/auth-header';

// FIXME: kanske spara i en databas, gör såhär just nu
// const authoritiesItems = [
//   'Motormon',
//   'Baker',
//   'Tan-delta',
//   'Spm De',
//   'Spm Nde',
//   'Vibration',
//   'Meggning stator',
//   'Meggning rotor',
//   'Pol-index',
//   'Lind-temp',
//   'Lager temp De',
//   'Lager temp Nde',
//   'Okulär intern',
//   'Okulär extern',
//   'Varvtalsgivare',
//   'Kylpaket',
//   'Driftström',
//   'Komm/Släp yta',
//   'Renhet',
//   'Kolborstar',
//   'Lager kond De',
//   'Lager kond Nde',
//   'Lager isolering',
//   'Smörjning',
//   'Kollektot temp',
//   'Mantel temp',
//   'Driftservice',
//   'Stoppservice',
// ];

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

const schema = yup.object({
  username: yup.string().required('Detta fältet krävs'),
  email: yup
    .string()
    .required('Detta fältet krävs')
    .email('Måste vara en giltig e-mailadress'),
  firstname: yup.string().required('Detta fältet krävs'),
  lastname: yup.string().required('Detta fältet krävs'),
  password: yup
    .string()
    .required('Detta fältet krävs')
    .min(8, 'Lösenordet måste vara minst 8 tecken'),
  confirmPassword: yup
    .string()
    .required('Detta fältet krävs')
    .oneOf([yup.ref('password'), null], 'Lösenorden måste stämma överens'),
  clients: yup
    .array()
    .required('Minst en kunde måste väljas')
    .min(1, 'Minst en kunde måste väljas'),
});

const RegisterUser = () => {
  const router = useRouter();
  const [page, setPage] = React.useState('');

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const { response, isLoading, isError } = useFetch(`/api/admin/register`);

  React.useEffect(() => {
    if (router.pathname.includes('/admin')) setPage('/admin');
    console.log(response);
    console.log(isLoading);
  }, [isLoading, response, router.pathname]);
  return (
    <AdminDispatch>
      <Layout>
        <Sidebar page={page}>
          <h3>Registrera ny användare</h3>
          <Formik
            validationSchema={schema}
            enableReinitialize
            initialValues={{
              username: '',
              email: '',
              firstname: '',
              lastname: '',
              password: '',
              confirmPassword: '',
              roles: 'kund',
              clients: [],
              motormon: false,
              baker: false,
              meggningstator: false,
              meggningrotor: false,
              driftström: false,
              lindtemp: false,
              vibration: false,
              smörjning: false,
              okulärintern: false,
              okulärextern: false,
              manteltemp: false,
              släpringsyta: false,
              lagerkondde: false,
              lagerkondnde: false,
              spmde: false,
              spmnde: false,
              lagertempde: false,
              lagertempnde: false,
              lagerisolering: false,
              renhet: false,
              kylpaket: false,
              kolborstar: false,
              varvtalsgivare: false,
              'tan-delta': false,
              'pol-index': false,
              kommutatoryta: false,
              kollektortemp: false,
              driftservice: false,
              stoppservice: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              const options = {
                headers: authHeader(),
              };
              axios
                .post(
                  `http://localhost:3000/api/auth/signup`,
                  {
                    username: values.username,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    password: values.password,
                    roles: values.roles,
                    clients: values.clients,
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
                  () => {
                    setError('');
                    setMessage('Användaren skapad');
                  },
                  error => {
                    setMessage('');
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
                <Row>
                  <Col md={6}>
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
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        isValid={
                          touched.confirmPassword && !errors.confirmPassword
                        }
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                        onChange={handleChange}
                        placeholder="Bekräfta lösenord"
                      />
                      <Form.Control.Feedback tooltip="true" type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <SButton type="submit" disabled={isSubmitting}>
                      Registrera
                    </SButton>
                    {message && <SAlert variant="success">{message}</SAlert>}
                    {error && <SAlert variant="danger">{error}</SAlert>}
                  </Col>

                  <Col>
                    {isError && <div>{isError}</div>}
                    {isLoading && !response ? (
                      <SSpinner animation="border">
                        <span>Loading...</span>
                      </SSpinner>
                    ) : (
                      <>
                        <Form.Group>
                          <Form.Label>Användarroll</Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name="roles"
                            value={values.roles}
                            isValid={touched.roles}
                            as="select"
                          >
                            {response.roles.map(role => (
                              <option value={role.name} key={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
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
                            {response.clients.map(client => (
                              <option value={client.clientName} key={client.id}>
                                {client.clientName}
                              </option>
                            ))}
                          </Form.Control>
                          <Form.Control.Feedback tooltip="true" type="invalid">
                            {errors.clients}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <SFormGroup as={Row}>
                          <Col xs={12}>
                            <Form.Label>
                              Behörighet att lägga till data
                            </Form.Label>
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
                      </>
                    )}
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
export default RegisterUser;
