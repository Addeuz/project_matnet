import Link from 'next/link';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { UserContext } from '../UserContext';

const SNavbar = styled(Navbar)`
  background-color: var(--green_100);
`;

const SNavbarLogo = styled.img`
  align-content: center;
  display: inline-block;
`;

const SNav = styled(Nav)`
  margin-left: auto;
`;

const SNavDropdown = styled(NavDropdown)`
  a {
    color: var(--link_color) !important;
  }
  a:hover {
    color: var(--link_color_hover) !important;
  }

  .dropdown-menu {
    padding: 0;
    overflow: hidden !important;
  }

  .dropdown-menu > a {
    color: var(--menu_color) !important;
  }

  .dropdown-menu > a:hover {
    color: var(--green_100) !important;
    background-color: var(--yellow);
  }
`;

export default function Navigation() {
  const { user, dispatch } = React.useContext(UserContext);

  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    console.log(user);
    if (user) {
      if (user.roles.includes('ROLE_ADMIN')) {
        setAdmin(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logOut() {
    if (user) {
      dispatch({ type: 'LOG_OUT' });
    }
  }

  return (
    <SNavbar collapseOnSelect variant="light">
      <div className="container">
        <Link href="/" passHref>
          <Navbar.Brand>
            <SNavbarLogo
              height="25"
              src="/Assemblin_Wordmark_Yellow_RGB.svg"
              alt="Assemblin logo"
            />
          </Navbar.Brand>
        </Link>

        <SNav>
          {!user && (
            <Link href="/login" passHref>
              <Nav.Link>Logga in</Nav.Link>
            </Link>
          )}

          {user && (
            <SNavDropdown title={`Välkommen, ${user.firstname}`}>
              {admin && (
                <Link href="/admin" passHref>
                  <Nav.Link>Administratör</Nav.Link>
                </Link>
              )}
              <Link href="/login" passHref>
                <Nav.Link onClick={() => logOut()}>Logga ut</Nav.Link>
              </Link>
            </SNavDropdown>
          )}
        </SNav>
      </div>
    </SNavbar>
  );
}
