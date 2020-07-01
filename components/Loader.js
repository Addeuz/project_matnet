import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--green_100);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

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

export default function Loader() {
  return (
    <Container>
      <SpinningLogo
        src="/Assemblin_Symbol_Yellow_RGB.svg"
        alt="Assemblin Logotyp"
      />
    </Container>
  );
}
