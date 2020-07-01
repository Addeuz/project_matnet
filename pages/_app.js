import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import UserContextProvider from '../components/UserContext';

export default function App({ Component, pageProps }) {
  return (
    // <UserContext.Provider value="Hello from context">
    //   <Component {...pageProps} />
    // </UserContext.Provider>
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
