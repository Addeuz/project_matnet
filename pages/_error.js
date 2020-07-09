import { GreenContainer } from '../styles/styled';

export async function getServerSideProps(context) {
  const errorCode = context.res.ok ? false : context.res.statusCode;
  const title = context.query.message || 'Sidan saknas';
  return {
    props: { errorCode, title },
  };
}

export default function ErrorPage({ error, errorCode, title }) {
  // nextjs internal 404
  if (errorCode) {
    return (
      <GreenContainer>
        <p>{errorCode}</p>
        <p>{title}</p>
      </GreenContainer>
    );
  }

  return (
    <GreenContainer>
      <p>{error.errorCode}</p>
      <p>{error.errorMessage}</p>
    </GreenContainer>
  );
}
