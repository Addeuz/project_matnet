import { Modal, Button, Table, Form } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import authHeader from '../../../services/auth-header';
import { SAlert, SButton } from '../../../styles/styled';

const STable = styled(Table)`
  table-layout: fixed;
`;

const TdDanger = styled.td`
  background-color: var(--danger);
  text-align: center;
`;

const TdWarning = styled.td`
  background-color: var(--warning);
  text-align: center;
`;

const TdSuccess = styled.td`
  background-color: var(--success);
  text-align: center;
`;

const EditLimitValues = ({
  title,
  show,
  onHide,
  engineId,
  dataPoint,
  limitValues,
  header,
}) => {
  const [lowLimit, setLowLimit] = React.useState(limitValues[0]);
  const [highLimit, setHighLimit] = React.useState(limitValues[1]);

  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>{`Redigera gränsvärden för ${title} - ${header}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <TdDanger> &lt; {lowLimit}</TdDanger>
              <TdWarning>
                {lowLimit} - {highLimit}
              </TdWarning>
              <TdSuccess> &gt; {highLimit}</TdSuccess>
            </tr>
            <tr>
              <td>
                <Form.Control
                  value={lowLimit}
                  onChange={e => {
                    setLowLimit(e.target.value);
                  }}
                />
              </td>
              <td></td>
              <td>
                <Form.Control
                  value={highLimit}
                  onChange={e => {
                    setHighLimit(e.target.value);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </STable>
        {message && <SAlert variant="success">{message}</SAlert>}
        {error && <SAlert variant="danger">{error}</SAlert>}
      </Modal.Body>
      <Modal.Footer>
        <SButton onClick={onHide}>Ångra</SButton>
        <Button
          variant="success"
          onClick={() => {
            setError('');
            // eslint-disable-next-line no-restricted-globals
            const lowLimitNumber = parseFloat(lowLimit);
            const highLimitNumber = parseFloat(highLimit);
            console.log(Number.isNaN(lowLimitNumber));
            console.log(lowLimitNumber);
            if (highLimitNumber < lowLimitNumber) {
              setError('Högre gränsvärde ej större än lägre gränsvärde');
            } else if (
              Number.isNaN(lowLimitNumber) ||
              Number.isNaN(highLimitNumber)
            ) {
              setError('Gränsvärden måste vara siffror');
            } else if (
              parseFloat(limitValues[0]) === lowLimitNumber &&
              parseFloat(limitValues[1]) === highLimitNumber
            ) {
              setError('Gränsvärden är ej ändrade');
            } else {
              console.log(lowLimitNumber, highLimitNumber);
              console.log(dataPoint);

              const options = {
                headers: authHeader(),
              };

              axios
                .put(
                  `http://localhost:3000/api/moderator/${engineId}/editLimitValues`,
                  { dataPoint, lowLimitNumber, highLimitNumber },
                  options
                )
                .then(response => {
                  setMessage(response.data.message);
                })
                .catch(error => {
                  setError(error.response.data.message);
                });
            }
          }}
        >
          Ändra
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditLimitValues;
