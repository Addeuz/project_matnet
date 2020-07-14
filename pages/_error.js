import styled from 'styled-components';
import Head from 'next/head';
import { GreenContainer } from '../styles/styled';

const CustomContainer = styled(GreenContainer)`
  flex-direction: column;
  color: var(--yellow);

  h1 {
    font-size: 5rem;
  }
`;

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
      <CustomContainer>
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{errorCode}</h1>
        <h4>{title}</h4>
      </CustomContainer>
    );
  }

  return (
    <CustomContainer>
      <Head>
        <title>{error.errorMessage}</title>
      </Head>
      <h1>{error.errorCode}</h1>
      <h4>{error.errorMessage}</h4>
    </CustomContainer>
  );
}
