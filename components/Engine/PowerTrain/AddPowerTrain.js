import { Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import { SButton, SAlert, FormControlPHError } from '../../../styles/styled';
import ExtraInput from '../ExtraInput';
import { UserContext } from '../../UserContext';
import authHeader from '../../../services/auth-header';
import { camelize } from '../../../utils/stringManipulation';

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

const SCol = styled(Col)`
  padding: 0;

  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
`;

const ExtraMarginSButton = styled(SButton)`
  margin-top: 1rem;
`;

const schema = yup.object({
  tagNr: yup.string().required('Tag nr krävs'),
});

const initialTextFields = {
  tagNr: '',
  artNr: '',
  position: '',
  fabrikat: '',
  typ: '',
  serieNr: '',
  effekt: '',
  spänning: '',
  ström: '',
  friText: '',
};

const initialCheckboxFields = {
  driftservice: true,
  stoppservice: true,
};

// Component shows a form for adding a engine with a type of: 'lågspänd'
// props:
//    engineType - the type of the engine so it can be saved into the database

const AddPowerTrain = ({ engineType }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [extraInputNames, setExtraInputNames] = React.useState([]);
  const [extraInputs, setExtraInputs] = React.useState([]);
  const [extraName, setExtraName] = React.useState('');
  const { user } = React.useContext(UserContext);
  const [engineClient, setEngineClient] = React.useState(null);

  const [stromR, setStromR] = React.useState(true);
  const [fromR, setFromR] = React.useState(false);

  React.useEffect(() => {
    console.log(engineClient);
    console.log(engineType);
  }, [engineClient, engineType]);

  return (
    <Formik
      validationSchema={schema}
      enableReinitialize
      initialValues={{
        ...initialTextFields,
        engineMeasureData: {
          ...initialCheckboxFields,
        },
      }}
      onSubmit={(values, { setSubmitting }) => {
        const options = {
          headers: authHeader(),
        };
        setError('');
        setMessage('');
        if (engineClient) {
          console.log(engineClient);
          if (extraInputs[0]) {
            values.engineMeasureData = {
              ...values.engineMeasureData,
              extraInputs: [...extraInputs],
            };
          }

          console.log(values);

          axios
            .post(
              `http://localhost:3000/api/moderator/engine`,
              {
                engineInfo: {
                  strömR: stromR,
                  fromR,
                  tagNr: values.tagNr,
                  artNr: values.artNr,
                  position: values.position,
                  fabrikat: values.fabrikat,
                  typ: values.typ,
                  serieNr: values.serieNr,
                  effekt: values.effekt,
                  spänning: values['spänning'],
                  ström: values['ström'],
                  friText: values.friText,
                },
                engineMeasureData: values.engineMeasureData,
                engineType,
                limitValues: {
                  driftservice: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  stoppservice: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                },
                client: engineClient,
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
        } else {
          // HERE PUT THE API CALL
          setError('Ingen kund är vald');
          setSubmitting(false);
        }
        console.log('YWAOASDA');

        console.log(values);

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
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Strömr.
                </Form.Label>
                <SCol sm={7}>
                  <Form.Check
                    type="radio"
                    className="mt-2"
                    checked={stromR}
                    name="strömR"
                    onChange={() => {
                      if (fromR) {
                        setStromR(true);
                        setFromR(false);
                      }
                    }}
                  />
                </SCol>
                <Form.Label column sm={5}>
                  Fr.omr.
                </Form.Label>
                <SCol sm={7}>
                  <Form.Check
                    type="radio"
                    className="mt-2"
                    checked={fromR}
                    name="fromR"
                    onChange={() => {
                      if (stromR) {
                        setStromR(false);
                        setFromR(true);
                      }
                    }}
                  />
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Tag nr
                </Form.Label>
                <SCol sm={7}>
                  <FormControlPHError
                    type="text"
                    value={values.tagNr}
                    name="tagNr"
                    placeholder={errors.tagNr ? errors.tagNr : ''}
                    onChange={handleChange}
                    isValid={touched.tagNr && !errors.tagNr}
                    isInvalid={touched.tagNr && errors.tagNr}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.tagNr}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Art nr
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.artNr}
                    name="artNr"
                    onChange={handleChange}
                    isValid={touched.artNr && !errors.artNr}
                    isInvalid={touched.artNr && errors.artNr}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.artNr}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Position
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.position}
                    name="position"
                    onChange={handleChange}
                    isValid={touched.position && !errors.position}
                    isInvalid={touched.position && errors.position}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.position}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>

              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Fabrikat
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.fabrikat}
                    name="fabrikat"
                    onChange={handleChange}
                    isValid={touched.fabrikat && !errors.fabrikat}
                    isInvalid={touched.fabrikat && errors.fabrikat}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.fabrikat}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Typ
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.typ}
                    name="typ"
                    onChange={handleChange}
                    isValid={touched.typ && !errors.typ}
                    isInvalid={touched.typ && errors.typ}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.typ}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Serie nr
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.serieNr}
                    name="serieNr"
                    onChange={handleChange}
                    isValid={touched.serieNr && !errors.serieNr}
                    isInvalid={touched.serieNr && errors.serieNr}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.serieNr}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Effekt kW
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.effekt}
                    name="effekt"
                    onChange={handleChange}
                    isValid={touched.effekt && !errors.effekt}
                    isInvalid={touched.effekt && errors.effekt}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.effekt}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Spänning V
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values['spänning']}
                    name="spänning"
                    onChange={handleChange}
                    isValid={touched['spänning'] && !errors['spänning']}
                    isInvalid={touched['spänning'] && errors['spänning']}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.spanning}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Ström A
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values['ström']}
                    name="ström"
                    onChange={handleChange}
                    isValid={touched['ström'] && !errors['ström']}
                    isInvalid={touched['ström'] && errors['ström']}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.strom}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>

              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Fri text
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={2}
                    value={values.friText}
                    name="friText"
                    onChange={handleChange}
                    isValid={touched.friText && !errors.friText}
                    isInvalid={touched.friText && errors.friText}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.friText}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
            </Col>
            <Col md={6}>
              <SFormGroup as={Row}>
                <Col xs={6}>
                  <Form.Check
                    id="engineMeasureData.driftservice"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Driftservice"
                    checked={values.engineMeasureData.driftservice}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.stoppservice"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Stoppservice"
                    checked={values.engineMeasureData.stoppservice}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6}></Col>
              </SFormGroup>
              <Row>
                <Col>
                  <h5>Extra fält</h5>
                  <Row className="mb-2">
                    <Col xs={12} className="mb-2">
                      {extraInputs.length === 0 ? (
                        <span>Inga extra fält tillagda</span>
                      ) : (
                        <SFormGroup as={Row}>
                          {extraInputs.map((extraInput, index) => {
                            // <ExtraInput id={extraI}
                            console.log(extraInput);
                            const key = Object.keys(extraInput);
                            const id = key[0];
                            return (
                              <Col key={id} xs={12}>
                                <ExtraInput
                                  key={id}
                                  id={id}
                                  checked={extraInput[id]}
                                  label={extraInputNames[index]}
                                  handleChange={() => {
                                    const tempArray = [...extraInputs];
                                    tempArray[index][id] = !tempArray[index][
                                      id
                                    ];
                                    console.log(tempArray[index][id]);

                                    console.log(tempArray);

                                    setExtraInputs(tempArray);
                                  }}
                                />
                              </Col>
                            );
                          })}
                        </SFormGroup>
                      )}
                    </Col>

                    <Col xs={5}>
                      <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Ej Å,Ä eller Ö"
                        onChange={e => {
                          setExtraName(e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs={7}>
                      <SButton
                        size="sm"
                        onClick={() => {
                          const camelCase = camelize(extraName);

                          setExtraInputNames(extraInputNames.concat(extraName));
                          setExtraInputs(
                            extraInputs.concat({ [camelCase]: true })
                          );
                        }}
                      >
                        Lägg till nytt fält
                      </SButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h5>Kund</h5>
                      <Form.Control
                        as="select"
                        // value={type}
                        name="engineClient"
                        value={values.engineClient}
                        onChange={e => {
                          console.log(e.target.value);
                          user.clients.forEach(client => {
                            if (e.target.value === client.clientName) {
                              setEngineClient(client);
                            }
                          });
                        }}
                      >
                        <option value="default">
                          Vilken kund tillhör motorn?
                        </option>
                        {user.clients.map(client => (
                          <option key={client.id} value={client.clientName}>
                            {client.clientName}
                          </option>
                        ))}
                      </Form.Control>
                      {errors.engineClient && (
                        <Form.Control.Feedback tooltip="true" type="invalid">
                          {errors.engineClient}
                        </Form.Control.Feedback>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <ExtraMarginSButton type="submit" disabled={isSubmitting}>
                Lägg till
              </ExtraMarginSButton>
              {message && <SAlert variant="success">{message}</SAlert>}
              {error && <SAlert variant="danger">{error}</SAlert>}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default AddPowerTrain;
