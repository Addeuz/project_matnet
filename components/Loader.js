import styled from 'styled-components';
import { GreenContainer } from '../styles/styled';

const SpinningLogo = styled.img`
  width: 10%;
  animation: spin 3s ease-in-out infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// A spinning Assemblin icon to be a full page loader

export default function Loader() {
  return (
    <GreenContainer>
      <SpinningLogo
        src="/Assemblin_Symbol_Yellow_RGB.svg"
        alt="Assemblin Logotyp"
      />
    </GreenContainer>
  );
}
