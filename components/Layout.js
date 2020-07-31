import Head from 'next/head';
import styled from 'styled-components';
import Navigation from './Navigation/Nav';

export const siteTitle = 'Mätnet';

const SDiv = styled.div`
  padding: 0;
`;

// Component used to alter the head of the html document.
// It is coming from next.js

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Mätnet - Used to store data and display for clients of Assemblin El"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Navigation />
      <SDiv className="container">{children}</SDiv>
    </div>
  );
}
