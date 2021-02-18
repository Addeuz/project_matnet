import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import Head from 'next/head';
import Layout from '../../../../../components/Layout';
import Sidebar from '../../../../../components/Navigation/Sidebar';
import { SAlert, SButton, SSpinner } from '../../../../../styles/styled';
import { UserContext } from '../../../../../components/UserContext';
import DataTimeLine from '../DataTimeline';
import authHeader from '../../../../../services/auth-header';

const schema = yup.object({
  value: yup
    .number('Värdet måste vara ett nummer')
    .required('Mätvärdet får ej lämnas tomt'),
});

const ExtraAddDataToEngine = () => {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  const [dataPoint, setDataPoint] = React.useState(null);
  const [limit, setLimit] = React.useState('yellow');
  const [tagNr, setTagNr] = React.useState(null);
  const [dataValues, setDataValues] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [response, setResponse] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const options = {
      headers: authHeader(),
    };
    if (router.query.dataPoint && user) {
      axios
        .get(
          `/api/moderator/${router.query.engineId}/${router.query.dataPoint}/extra`,
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
      setDataPoint(router.query.dataPoint);
    }

    if (!isLoading && response && dataPoint) {
      setTagNr(response.engine.engineInfo.tagNr);
      setDataValues(response.engine[dataPoint].values);
    }
  }, [router.query, dataPoint, dataValues, isLoading, response]);

  return (
    <Layout>
      <Head>
        <title>{dataPoint || ''}</title>
      </Head>
      <Sidebar page="/">
        {user &&
          (user.roles[0] === 'ROLE_ADMIN' ||
            user.roles[0] === 'ROLE_MODERATOR') &&
          !isLoading &&
          response.engine && (
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
                  const currentDate = new Date();

                  axios
                    .post(
                      `http://localhost:3000/api/moderator/${router.query.engineId}/${dataPoint}/extra`,
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

                        <Form.Group>
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
                        <h5>Gränsvärde</h5>
                        {/* TODO: add a select element her to choose the limit */}
                        <Form.Group>
                          <Form.Control
                            value={limit}
                            onChange={e => setLimit(e.target.value)}
                            as="select"
                          >
                            <option value="red">Icke godkänt</option>
                            <option value="yellow">Godkänt</option>
                            <option value="green">Väl godkänt</option>
                          </Form.Control>
                        </Form.Group>
                        <SButton type="submit" disabled={isSubmitting}>
                          Lägg till
                        </SButton>
                        {message && (
                          <SAlert variant="success">{message}</SAlert>
                        )}
                        {error && <SAlert variant="danger">{error}</SAlert>}
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </>
          )}
        {dataValues ? (
          <DataTimeLine engineData={dataValues.reverse()} header={dataPoint} />
        ) : (
          <SSpinner animation="border">
            <span>Loading...</span>
          </SSpinner>
        )}
      </Sidebar>
    </Layout>
  );
};

export default ExtraAddDataToEngine;
