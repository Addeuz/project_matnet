import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios';
import EditLimitValues from '../../../../components/Engine/LimitValues/EditLimitValues';
import Layout from '../../../../components/Layout';
import Sidebar from '../../../../components/Navigation/Sidebar';
import DataTimeLine from './DataTimeline';

import authHeader from '../../../../services/auth-header';
import {
  SAlert,
  SButton,
  SSpinner,
  STable,
  TdDanger,
  TdSuccess,
  TdWarning,
} from '../../../../styles/styled';
import { UserContext } from '../../../../components/UserContext';

const schema = yup.object({
  value: yup
    .number('Värdet måste vara ett nummer')
    .required('Mätvärdet får ej lämnas tomt'),
});

const DefaultText = styled.p`
  color: ${props => (props.default ? 'var(--success)' : 'var(--danger)')};
`;

const AddDataToEngine = () => {
  const router = useRouter();

  const [modalShow, setModalShow] = React.useState(false);

  const [dataPoint, setDataPoint] = React.useState(null);
  const [limitValues, setLimitValues] = React.useState(null);
  const [limitDefault, setLimitDefault] = React.useState(null);

  const [dataValues, setDataValues] = React.useState(null);
  const [tagNr, setTagNr] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [canEdit, setCanEdit] = React.useState(false);

  const [error, setError] = React.useState('');
  const { user } = React.useContext(UserContext);

  const [response, setResponse] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const options = {
      headers: authHeader(),
    };
    if (router.query.dataPoint && user) {
      axios
        .get(
          `/api/moderator/${
            router.query.engineId
          }/${router.query.dataPoint.toLowerCase()}/${user.id}`,
          options
        )
        .then(serverResponse => {
          setResponse(serverResponse.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [router.query.dataPoint, router.query.engineId, user]);

  React.useEffect(() => {
    if (router.query.dataPoint) {
      setDataPoint(router.query.dataPoint.toLowerCase());
    }

    if (!isLoading && response && dataPoint) {
      setTagNr(response.engine.engineInfo.tagNr);
      setLimitValues(response.engine.limit_value[dataPoint].limit);
      setLimitDefault(response.engine.limit_value[dataPoint].default);
      setDataValues(response.engine[dataPoint].values);
      setCanEdit(response.canEdit);
    }
  }, [router.query, dataPoint, limitValues, dataValues, isLoading, response]);

  return (
    <Layout>
      <Sidebar page="/">
        {user &&
          (canEdit ||
            user.roles[0] === 'ROLE_ADMIN' ||
            user.roles[0] === 'ROLE_MODERATOR') &&
          !isLoading &&
          response.engine &&
          limitValues && (
            <>
              <Formik
                validationSchema={schema}
                enableReinitialize
                initialValues={{
                  value: '',
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const options = {
                    headers: authHeader(),
                  };
                  console.log(values);
                  const currentDate = new Date();
                  let limit;

                  if (values.value < limitValues[0]) {
                    // icke godkänt
                    limit = 'red';
                  } else if (
                    values.value > limitValues[0] &&
                    values.value < limitValues[1]
                  ) {
                    // godkänt
                    limit = 'yellow';
                  } else {
                    // väl godkänt
                    limit = 'green';
                  }

                  axios
                    .post(
                      `http://localhost:3000/api/moderator/${router.query.engineId}/${dataPoint}`,
                      {
                        data: {
                          value: values.value,
                          date: currentDate,
                          limit,
                        },
                        dataPoint,
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
                      <Col xs={12} md={6}>
                        <h5>
                          Lägg till värde för {tagNr} - {dataPoint}
                        </h5>

                        <Form.Group controlId="formGroupClientName">
                          <Form.Label>Mätvärde</Form.Label>
                          <Form.Control
                            type="text"
                            value={values.value}
                            name="value"
                            onChange={handleChange}
                            isValid={touched.value && !errors.value}
                            isInvalid={touched.value && errors.value}
                            placeholder="Värde på datan"
                          />
                          <Form.Control.Feedback tooltip="true" type="invalid">
                            {errors.value}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <h5>Gränsvärden</h5>
                        <STable size="sm">
                          <thead>
                            <tr>
                              <th>Ej godkänt</th>
                              <th>Godkänt</th>
                              <th>Väl godkänt</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <TdDanger> &lt; {limitValues[0]}</TdDanger>
                              <TdWarning>
                                {limitValues[0]} - {limitValues[1]}
                              </TdWarning>
                              <TdSuccess> &gt; {limitValues[1]}</TdSuccess>
                            </tr>
                          </tbody>
                        </STable>
                        <Row>
                          <Col xs={7}>
                            {limitDefault ? (
                              <DefaultText default>
                                Gränsvärden standard
                              </DefaultText>
                            ) : (
                              <DefaultText>Gränsvärden ej standard</DefaultText>
                            )}
                          </Col>
                          <Col xs={5}>
                            {((user && user.roles[0] === 'ROLE_ADMIN') ||
                              user.roles[0] === 'ROLE_MODERATOR') && (
                              <SButton onClick={() => setModalShow(true)}>
                                Ändra gränsv.
                              </SButton>
                            )}
                          </Col>
                        </Row>

                        <SButton type="submit" disabled={isSubmitting}>
                          Lägg till
                        </SButton>
                        {message && (
                          <SAlert variant="success">{message}</SAlert>
                        )}
                        {error && <SAlert variant="danger">{error}</SAlert>}
                      </Col>
                      <Col xs={12}>
                        {limitValues && dataPoint && (
                          <EditLimitValues
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            limitValues={limitValues}
                            dataPoint={dataPoint}
                            title={tagNr}
                            header={dataPoint}
                            engineId={router.query.engineId}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </>
          )}
        {dataValues ? (
          <DataTimeLine engineData={dataValues} header={dataPoint} />
        ) : (
          <SSpinner animation="border">
            <span>Loading...</span>
          </SSpinner>
        )}
      </Sidebar>
    </Layout>
  );
};

export default AddDataToEngine;
