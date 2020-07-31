import { Form } from 'react-bootstrap';

// Component that is used to show all extra inputs that is added when a user adds a new engine
// props:
//    id - the id of the engine
//    checked - a boolean that decides if the checkbox is checked or not
//    handleChange - function provided by Formik that handles the changes in an form controller
//                   and handles the values accordingly
//    label - the label of the checkbox, given by the user when adding the extra input

const ExtraInput = ({ id, checked, handleChange, label }) => {
  React.useEffect(() => {
    console.log(label);
    console.log(checked);
  }, [checked, label]);
  return (
    <Form.Check
      id={`engineMeasureData.${id}`}
      className="custom-form-check-input"
      type="checkbox"
      checked={checked}
      name={`engineMeasureData.${id}`}
      label={label}
      onChange={handleChange}
    />
  );
};

export default ExtraInput;
