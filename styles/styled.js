// Global styled components used everywhere in the application
// Mostly just rewriting the style of bootstrap components
// the big S infront of the components stands for Styled
import {
  Button,
  Spinner,
  Row,
  Col,
  Accordion,
  Alert,
  Form,
} from 'react-bootstrap';
import styled from 'styled-components';

const FormControl = Form.Control;

export const FormControlPHError = styled(FormControl)`
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #dc3545;
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #dc3545;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #dc3545;
  }
`;

export const GreenContainer = styled.div`
  background-color: var(--green_100);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const SAlert = styled(Alert)`
  margin-top: 0.5rem;
`;
export const SButton = styled(Button)`
  background-color: var(--yellow);
  color: var(--green_100);
  border: 0;

  :hover {
    background-color: var(--green_100);
    color: var(--yellow);
  }

  :active {
    background-color: var(--green_80) !important;
    color: var(--yellow) !important;
  }

  :disabled {
    background-color: var(--green_80) !important;
    color: var(--yellow) !important;
  }

  :focus {
    background-color: var(--yellow);
    color: var(--green_100);
  }
`;

export const SSpinner = styled(Spinner)`
  color: var(--yellow);
  display: flex;
  margin: 2rem auto;

  span {
    -webkit-tap-highlight-color: transparent;

    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export const SRow = styled(Row)`
  margin: 0.5rem 0;
  /* padding: 0; */
  @media only screen and (max-width: 768px) {
    /* margin: 0.5rem; */
  }
`;

export const SCol = styled(Col)`
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const AddButtonCol = styled(SCol)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    // TODO: what is best here? flex-start, flex-end or center?
    /* justify-content: center; */
    margin-bottom: 0.5rem;

    /* align-items: center; */
  }
`;

export const SAccordion = styled(Accordion)`
  height: 80vh;
  overflow: auto;
  margin-top: 0.5rem;

  .card > .card-header {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    height: auto;
  }
`;

// export default SButton;
