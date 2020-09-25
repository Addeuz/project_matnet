import { Modal } from 'react-bootstrap';
import EditLowVoltage from './LowVoltage/EditLowVoltage';
import EditHighVoltage from './HighVoltage/EditHighVoltage';
import EditDirectCurrent from './DirectCurrent/EditDirectCurrent';
import EditPowerTrain from './PowerTrain/EditPowerTrain';

// const SRow = styled(Row)`
//   [class*='col']:first-child {
//     margin-bottom: 1rem;
//     align-self: center;
//     display: flex;
//     justify-content: center;
//   }
// `;

// Component used to display different forms for different types of engine that the user want to add to mätnet.
// props:
//    show - a boolean that is being passed to the Modal component to decide if the modal is visible or not
//    onHide - the function that determines what is to be done when the model is somehow closed

const EditEngineModal = ({ show, onHide, type, engine }) => {
  React.useEffect(() => {
    // console.log(type);
  }, []);

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Redigera {engine.engineInfo.tagNr}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'lågspänd' && <EditLowVoltage engine={engine} />}
        {type === 'högspänd' && <EditHighVoltage engine={engine} />}
        {type === 'likström' && <EditDirectCurrent engine={engine} />}
        {type === 'drivsystem' && <EditPowerTrain engine={engine} />}
      </Modal.Body>
    </Modal>
  );
};

export default EditEngineModal;
