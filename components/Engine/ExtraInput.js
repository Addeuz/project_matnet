import { Form } from 'react-bootstrap';

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
