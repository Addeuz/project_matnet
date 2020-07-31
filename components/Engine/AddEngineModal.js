import { Modal, Form, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import LowVoltage from './LowVoltage';

const SRow = styled(Row)`
  [class*='col']:first-child {
    margin-bottom: 1rem;
    align-self: center;
    display: flex;
    justify-content: center;
  }
`;

// Component used to display different forms for different types of engine that the user want to add to mätnet.
// props:
//    show - a boolean that is being passed to the Modal component to decide if the modal is visible or not
//    onHide - the function that determines what is to be done when the model is somehow closed

const AddEngineModal = ({ show, onHide }) => {
  const [type, setType] = React.useState('default');

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setType('default');
      }}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Lägg till ny motor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SRow>
          <Col>
            <Form.Control
              as="select"
              style={{ width: '20rem' }}
              value={type}
              onChange={e => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
            >
              <option value="default">Välj typ...</option>
              <option value="lågspänd">Lågspänd</option>
              <option value="högspänd">Högspänd</option>
              <option value="likström">Likström</option>
              <option value="drivsystem">Drivsystem</option>
            </Form.Control>
          </Col>
          {type === 'default' && (
            <Col xs={12}>
              <span>Välj typ av motor först</span>
            </Col>
          )}
        </SRow>

        {type === 'lågspänd' && <LowVoltage engineType="lågspänd" />}
      </Modal.Body>
    </Modal>
  );
};

export default AddEngineModal;
