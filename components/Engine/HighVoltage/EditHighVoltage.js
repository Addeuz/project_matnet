import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { SButton, SAlert, SSpinner } from '../../../styles/styled';
import ExtraInput from '../ExtraInput';
import { UserContext } from '../../UserContext';
import { camelize, camelCaseToNormal } from '../../../utils/stringManipulation';
import useFetch from '../../../utils/hooks/useFetch';
import authHeader from '../../../services/auth-header';

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

function YesOrNoFromBoolean(value) {
  if (value) {
    return `Ja -> Nej`;
  }
  return `Nej -> Ja`;
}

// Component used to display the editing forms for an engine with the type of 'lågspänd'
// props:
//    engine - data from the engine being edited

const EditHighVoltage = ({ engine }) => {
  const { response, isLoading, isError } = useFetch(
    `/api/admin/client/${engine.clientId}`
  );

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [extraInputNames, setExtraInputNames] = React.useState([]);
  const [extraInputs, setExtraInputs] = React.useState([]);
  const [initialTextFields, setInitialFields] = React.useState({});
  const [initialCheckboxFields, setInitialCheckboxes] = React.useState({});
  const [extraName, setExtraName] = React.useState('');
  const { user } = React.useContext(UserContext);
  const [engineClient, setEngineClient] = React.useState(null);
  const [changedValues, setChangedValues] = React.useState([]);
  const [changedMeasurePoints, setChangedMeasurePoints] = React.useState([]);

  React.useEffect(() => {
    console.log(engine);
    setInitialFields({
      tagNr: engine.engineInfo.tagNr,
      artNr: engine.engineInfo.artNr,
      position: engine.engineInfo.position,
      diverse: engine.engineInfo.diverse,
      fabrikat: engine.engineInfo.fabrikat,
      typ: engine.engineInfo.typ,
      motorNr: engine.engineInfo.motorNr,
      varvtal: engine.engineInfo.varvtal,
      frekvens: engine.engineInfo.frekvens,
      effekt: engine.engineInfo.effekt,
      spänning: engine.engineInfo['spänning'],
      ström: engine.engineInfo['ström'],
      sekundärV: engine.engineInfo['sekundärV'],
      sekundärA: engine.engineInfo['sekundärA'],
      lagerDE: engine.engineInfo.lagerDE,
      lagerNDE: engine.engineInfo.lagerNDE,
      kolborstar: engine.engineInfo.kolborstar,
      friText: engine.engineInfo.friText,
      lagerIsolerad: engine.engineInfo.lagerIsolerad,
    });

    setInitialCheckboxes({
      motormon: engine.engineValues.motormon,
      baker: engine.engineValues.baker,
      meggningStator: engine.engineValues.meggningStator,
      meggningRotor: engine.engineValues.meggningRotor,
      driftström: engine.engineValues['driftström'],
      lindTemp: engine.engineValues.lindTemp,
      vibration: engine.engineValues.vibration,
      smörjning: engine.engineValues['smörjning'],
      okulärIntern: engine.engineValues['okulärIntern'],
      okulärExtern: engine.engineValues['okulärExtern'],
      mantelTemp: engine.engineValues.mantelTemp,
      släpringsYta: engine.engineValues['släpringsYta'],
      lagerKondDe: engine.engineValues.lagerKondDe,
      lagerKondNde: engine.engineValues.lagerKondNde,
      spmDE: engine.engineValues.spmDE,
      spmNDE: engine.engineValues.spmNDE,
      lagerTempDe: engine.engineValues.lagerTempDe,
      lagerTempNde: engine.engineValues.lagerTempNde,
      lagerIsolering: engine.engineValues.lagerIsolering,
      renhet: engine.engineValues.renhet,
      kylpaket: engine.engineValues.kylpaket,
      kolborstar: engine.engineValues.kolborstar,
      varvtalsgivare: engine.engineValues.varvtalsgivare,
      tanDelta: engine.engineValues.tanDelta,
      polIndex: engine.engineValues.polIndex,
    });

    const tempExtraInputs = [];
    const tempExtraInputNames = [];
    if (engine.engineValues.extraInputs) {
      setExtraInputs(engine.engineValues.extraInputs);
      engine.engineValues.extraInputs.forEach(extraInput => {
        const camelCase = camelize(Object.keys(extraInput)[0]);
        const normalCase = camelCaseToNormal(Object.keys(extraInput)[0]);
        tempExtraInputNames.push(normalCase);
        tempExtraInputs.push({ [camelCase]: extraInput[camelCase] });
      });
      setExtraInputNames(tempExtraInputNames);
      setExtraInputs(tempExtraInputs);
    }

    if (!isLoading && response) {
      setEngineClient(response);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  React.useEffect(() => {
    console.log('Ändrade values', changedValues);
    console.log('Ändrade mätpunkter', changedMeasurePoints);
  }, [changedMeasurePoints, changedValues]);

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

        if (extraInputs[0]) {
          values.engineMeasureData = {
            ...values.engineMeasureData,
            extraInputs: [...extraInputs],
          };
        }

        console.log(values);
        axios
          .put(
            `http://localhost:3000/api/moderator/engine/${engine.engineId}`,
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
              client: engineClient,
            },
            options
          )
          .then(
            response => {
              const date = new Date(Date.now());

              let note = `Motordata ändrad för motor: ${engine.engineInfo.tagNr}\n\n`;

              if (changedValues.length > 0) {
                note += 'Motordata:\n';
                for (const item of changedValues) {
                  note += `${item}: ${
                    engine.engineInfo[item] === ''
                      ? 'Tomt'
                      : engine.engineInfo[item]
                  } -> ${values[item]}\n`;
                }
                note += '\n';
              }

              if (changedMeasurePoints.length > 0) {
                note += 'Mätpunkter:\n';
                for (const item of changedMeasurePoints) {
                  note += `${item}: ${YesOrNoFromBoolean(
                    engine.engineValues[item]
                  )}\n`;
                }
              }

              axios
                .post(
                  `http://localhost:3000/api/moderator/${engine.engineId}/${user.id}/notes`,
                  {
                    note,
                    date,
                  },
                  options
                )
                .then(
                  () => {
                    setMessage(response.data.message);
                  },
                  error => {
                    setError(error.response.data.message);
                  }
                );
            },
            error => {
              console.log(error.response);
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
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Tag nr
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.tagNr || ''}
                    name="tagNr"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
                    isValid={touched.tagNr && !errors.tagNr}
                    isInvalid={touched.tagNr && errors.tagNr}
                  />
                  <Form.Control.Feedback tooltip="true" type="invalid">
                    {errors.tagNr}
                  </Form.Control.Feedback>
                </SCol>
              </SFormGroup>
              <SFormGroup as={Row}>
                <Form.Label column sm={5}>
                  Art nr
                </Form.Label>
                <SCol sm={7}>
                  <Form.Control
                    type="text"
                    value={values.artNr || ''}
                    name="artNr"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.position || ''}
                    name="position"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.diverse || ''}
                    name="diverse"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.fabrikat || ''}
                    name="fabrikat"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.typ || ''}
                    name="typ"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.motorNr || ''}
                    name="motorNr"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.varvtal || ''}
                    name="varvtal"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.frekvens || ''}
                    name="frekvens"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.effekt || ''}
                    name="effekt"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values['spänning'] || ''}
                    name="spänning"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values['ström'] || ''}
                    name="ström"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values['sekundärV'] || ''}
                    name="sekundärV"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values['sekundärA'] || ''}
                    name="sekundärA"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    onChange={e => {
                      handleChange(e);
                      const { name, checked } = e.target;
                      console.log(name, checked);
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === checked) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.lagerDE || ''}
                    name="lagerDE"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.lagerNDE || ''}
                    name="lagerNDE"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.kolborstar || ''}
                    name="kolborstar"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    value={values.friText || ''}
                    name="friText"
                    onChange={e => {
                      handleChange(e);
                      const { name, value } = e.target;
                      if (!changedValues.includes(name)) {
                        setChangedValues([...changedValues, name]);
                      } else if (engine.engineInfo[name] === value) {
                        setChangedValues(
                          changedValues.filter(
                            filterValue => filterValue !== name
                          )
                        );
                      }
                    }}
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
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.baker"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Baker"
                    checked={values.engineMeasureData.baker}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.meggningStator"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning stator"
                    checked={values.engineMeasureData.meggningStator}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.meggningRotor"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Meggning rotor"
                    checked={values.engineMeasureData.meggningRotor}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData['driftström']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Driftström"
                    checked={values.engineMeasureData['driftström']}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split("'")[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.lindTemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lind temp"
                    checked={values.engineMeasureData.lindTemp}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.vibration"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Vibration"
                    checked={values.engineMeasureData.vibration}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData['smörjning']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Smörjning"
                    checked={values.engineMeasureData['smörjning']}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split("'")[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData['okulärIntern']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär intern"
                    checked={values.engineMeasureData['okulärIntern']}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split("'")[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData['okulärExtern']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Okulär extern"
                    checked={values.engineMeasureData['okulärExtern']}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split("'")[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.mantelTemp"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Mantel temp"
                    checked={values.engineMeasureData.mantelTemp}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData['släpringsYta']"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Släpringsyta"
                    checked={values.engineMeasureData['släpringsYta']}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split("'")[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Check
                    id="engineMeasureData.lagerKondDe"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond DE"
                    checked={values.engineMeasureData.lagerKondDe}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerKondNde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager kond NDE"
                    checked={values.engineMeasureData.lagerKondNde}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.spmDE"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm DE"
                    checked={values.engineMeasureData.spmDE}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.spmNDE"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Spm NDE"
                    checked={values.engineMeasureData.spmNDE}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerTempDe"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp DE"
                    checked={values.engineMeasureData.lagerTempDe}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerTempNde"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager temp NDE"
                    checked={values.engineMeasureData.lagerTempNde}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.lagerIsolering"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Lager isolering"
                    checked={values.engineMeasureData.lagerIsolering}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.renhet"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Renhet"
                    checked={values.engineMeasureData.renhet}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.kylpaket"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kylpaket"
                    checked={values.engineMeasureData.kylpaket}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.kolborstar"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Kolborstar"
                    checked={values.engineMeasureData.kolborstar}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.varvtalsgivare"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Varvtalsgivare"
                    checked={values.engineMeasureData.varvtalsgivare}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.tanDelta"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Tan-delta"
                    checked={values.engineMeasureData.tanDelta}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
                  />
                  <Form.Check
                    id="engineMeasureData.polIndex"
                    className="custom-form-check-input"
                    type="checkbox"
                    label="Pol-index"
                    checked={values.engineMeasureData.polIndex}
                    onChange={e => {
                      handleChange(e);
                      const { id, checked } = e.target;
                      const idType = id.split('.')[1];
                      console.log(idType, engine.engineValues[idType]);
                      if (!changedMeasurePoints.includes(idType)) {
                        setChangedMeasurePoints([
                          ...changedMeasurePoints,
                          idType,
                        ]);
                      } else if (engine.engineValues[idType] === checked) {
                        setChangedMeasurePoints(
                          changedMeasurePoints.filter(value => value !== idType)
                        );
                      }
                    }}
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
                      {isLoading ? (
                        <SSpinner animation="border">
                          <span>Loading...</span>
                        </SSpinner>
                      ) : (
                        <Form.Control
                          as="select"
                          // value={type}
                          name="engineClient"
                          defaultValue={response.clientName}
                          value={values.engineClient}
                          onChange={e => {
                            console.log(e.target.value);
                            user.clients.forEach(client => {
                              if (e.target.value === client.clientName) {
                                console.log(e.target.value);
                                setEngineClient(client);
                              }
                            });
                          }}
                        >
                          {user.clients.map(client => (
                            // checking to return the current engine client as the first selected option
                            <option key={client.id} value={client.clientName}>
                              {client.clientName}
                            </option>
                          ))}
                        </Form.Control>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col>
              <ExtraMarginSButton type="submit" disabled={isSubmitting}>
                {`Ändra ${values.tagNr}`}
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

export default EditHighVoltage;
