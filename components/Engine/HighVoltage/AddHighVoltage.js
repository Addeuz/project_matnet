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
  diverse: '',
  fabrikat: '',
  typ: '',
  motorNr: '',
  varvtal: '',
  frekvens: '',
  effekt: '',
  spänning: '',
  ström: '',
  sekundärV: '',
  sekundärA: '',
  lagerDE: '',
  lagerNDE: '',
  kolborstar: '',
  friText: '',
  lagerIsolerad: false,
};

const initialCheckboxFields = {
  motormon: true,
  baker: false,
  meggningStator: true,
  meggningRotor: false,
  driftström: true,
  lindTemp: true,
  vibration: true,
  smörjning: false,
  okulärIntern: false,
  okulärExtern: true,
  mantelTemp: false,
  släpringsYta: false,
  lagerKondDe: true,
  lagerKondNde: true,
  spmDE: false,
  spmNDE: false,
  lagerTempDe: true,
  lagerTempNde: true,
  lagerIsolering: false,
  renhet: false,
  kylpaket: false,
  kolborstar: false,
  varvtalsgivare: false,
  tanDelta: false,
  polIndex: true,
};

// Component shows a form for adding a engine with a type of: 'lågspänd'
// props:
//    engineType - the type of the engine so it can be saved into the database

const AddHighVoltage = ({ engineType }) => {
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [extraInputNames, setExtraInputNames] = React.useState([]);
  const [extraInputs, setExtraInputs] = React.useState([]);
  const [extraName, setExtraName] = React.useState('');
  const { user } = React.useContext(UserContext);
  const [engineClient, setEngineClient] = React.useState(null);

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
                  tagNr: values.tagNr,
                  artNr: values.artNr,
                  position: values.position,
                  diverse: values.diverse,
                  fabrikat: values.fabrikat,
                  typ: values.typ,
                  motorNr: values.motorNr,
                  varvtal: values.varvtal,
                  frekvens: values.frekvens,
                  effekt: values.effekt,
                  spänning: values['spänning'],
                  ström: values['ström'],
                  sekundärV: values['sekundärV'],
                  sekundärA: values['sekundärA'],
                  lagerDE: values.lagerDE,
                  lagerNDE: values.lagerNDE,
                  kolborstar: values.kolborstar,
                  friText: values.friText,
                  lagerIsolerad: values.lagerIsolerad,
                },
                engineMeasureData: values.engineMeasureData,
                engineType,
                limitValues: {
                  motormon: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  baker: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  meggningStator: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  meggningRotor: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  driftström: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lindTemp: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  vibration: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  smörjning: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  okulärIntern: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  okulärExtern: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  mantelTemp: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  släpringsyta: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lagerKondDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lagerKondNDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  spmDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  spmNDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lagerTempDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lagerTempNDE: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  lagerIsolering: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  renhet: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  kylpaket: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  kolborstar: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  varvtalsgivare: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  tanDelta: {
                    limit: [1, 2, 3],
                    default: true,
                  },
                  polIndex: {
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
                  Diverse
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.diverse}
                    name="diverse"
                    onChange={handleChange}
                    isValid={touched.diverse && !errors.diverse}
                    isInvalid={touched.diverse && errors.diverse}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.diverse}
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
                  Motor nr
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.motorNr}
                    name="motorNr"
                    onChange={handleChange}
                    isValid={touched.motorNr && !errors.motorNr}
                    isInvalid={touched.motorNr && errors.motorNr}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.motorNr}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Varvtal RPM
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.varvtal}
                    name="varvtal"
                    onChange={handleChange}
                    isValid={touched.varvtal && !errors.varvtal}
                    isInvalid={touched.varvtal && errors.varvtal}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.varvtal}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Frekvens Hz
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.frekvens}
                    name="frekvens"
                    onChange={handleChange}
                    isValid={touched.frekvens && !errors.frekvens}
                    isInvalid={touched.frekvens && errors.frekvens}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.frekvens}
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
                  Sekundär V
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values['sekundärV']}
                    name="sekundärV"
                    onChange={handleChange}
                    isValid={touched['sekundärV'] && !errors['sekundärV']}
                    isInvalid={touched['sekundärV'] && errors['sekundärV']}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.sekundarV}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Sekundär A
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values['sekundärA']}
                    name="sekundärA"
                    onChange={handleChange}
                    isValid={touched['sekundärA'] && !errors['sekundärA']}
                    isInvalid={touched['sekundärA'] && errors['sekundärA']}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.sekundarA}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Lager isolerad
                </Form.Label>
                <SCol sm={7}>
                  <Form.Check
                    type="checkbox"
                    className="mt-2"
                    checked={values.lagerIsolerad}
                    name="lagerIsolerad"
                    onChange={handleChange}
                    isValid={touched.lagerIsolerad && !errors.lagerIsolerad}
                    isInvalid={touched.lagerIsolerad && errors.lagerIsolerad}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.lagerIsolerad}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Lager DE
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={2}
                    value={values.lagerDE}
                    name="lagerDE"
                    onChange={handleChange}
                    isValid={touched.lagerDE && !errors.lagerDE}
                    isInvalid={touched.lagerDE && errors.lagerDE}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.lagerDE}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Lager NDE
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={2}
                    value={values.lagerNDE}
                    name="lagerNDE"
                    onChange={handleChange}
                    isValid={touched.lagerNDE && !errors.lagerNDE}
                    isInvalid={touched.lagerNDE && errors.lagerNDE}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.lagerNDE}
                  </Form.Control.Feedback> */}
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Kolborstar
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={2}
                    value={values.kolborstar}
                    name="kolborstar"
                    onChange={handleChange}
                    isValid={touched.kolborstar && !errors.kolborstar}
                    isInvalid={touched.kolborstar && errors.kolborstar}
                  />
                  {/* <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.kolborstar}
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
                    id="engineMeasureData.motormon"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Motormon"
                    checked={values.engineMeasureData.motormon}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.baker"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Baker"
                    checked={values.engineMeasureData.baker}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.meggningStator"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning stator"
                    checked={values.engineMeasureData.meggningStator}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.meggningRotor"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning rotor"
                    checked={values.engineMeasureData.meggningRotor}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData['driftström']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Driftström"
                    checked={values.engineMeasureData['driftström']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.lindTemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lind temp"
                    checked={values.engineMeasureData.lindTemp}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.vibration"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Vibration"
                    checked={values.engineMeasureData.vibration}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData['smörjning']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Smörjning"
                    checked={values.engineMeasureData['smörjning']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData['okulärIntern']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär intern"
                    checked={values.engineMeasureData['okulärIntern']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData['okulärExtern']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär extern"
                    checked={values.engineMeasureData['okulärExtern']}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.mantelTemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Mantel temp"
                    checked={values.engineMeasureData.mantelTemp}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData['släpringsYta']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Släpringsyta"
                    checked={values.engineMeasureData['släpringsYta']}
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Check
                    id="engineMeasureData.lagerKondDe"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond DE"
                    checked={values.engineMeasureData.lagerKondDe}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerKondNde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond NDE"
                    checked={values.engineMeasureData.lagerKondNde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.spmDE"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm DE"
                    checked={values.engineMeasureData.spmDE}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.spmNDE"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm NDE"
                    checked={values.engineMeasureData.spmNDE}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerTempDe"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp DE"
                    checked={values.engineMeasureData.lagerTempDe}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerTempNde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp NDE"
                    checked={values.engineMeasureData.lagerTempNde}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerIsolering"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager isolering"
                    checked={values.engineMeasureData.lagerIsolering}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.renhet"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Renhet"
                    checked={values.engineMeasureData.renhet}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.kylpaket"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kylpaket"
                    checked={values.engineMeasureData.kylpaket}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.kolborstar"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kolborstar"
                    checked={values.engineMeasureData.kolborstar}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.varvtalsgivare"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Varvtalsgivare"
                    checked={values.engineMeasureData.varvtalsgivare}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.tanDelta"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Tan-delta"
                    checked={values.engineMeasureData.tanDelta}
                    onChange={handleChange}
                  />
                  <Form.Check
                    id="engineMeasureData.polIndex"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Pol-index"
                    checked={values.engineMeasureData.polIndex}
                    onChange={handleChange}
                  />
                </Col>
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

export default AddHighVoltage;
