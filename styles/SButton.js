// Global styled components used everywhere in the application
// Mostly just rewriting the style of bootstrap components
// the big S infront of the components stands for Styled
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const SButton = styled(Button)`
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

  :focus {
    background-color: var(--green_80) !important;
    color: var(--yellow) !important;
  }
`;

export default SButton;
