import Link from 'next/link';
import { Nav, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const SNavDropdown = styled(NavDropdown)`
  .dropdown-menu {
    padding: 0;
    left: -15vw !important;
  }
`;

// Component that handles all the links in Sidebar.js
//    viewport - the current viewport
//    page - a variable that holds the current page that the user is on, ex: admin page or index page ('/')

const SidebarItems = ({ viewPort, page }) => (
  <>
    {viewPort === 'desktop' ? (
      <>
        {page === '/' && (
          <>
            <Link href="/" passHref>
              <Nav.Link>Startsida</Nav.Link>
            </Link>
            <Link href="/engines" passHref>
              <Nav.Link>Motorer</Nav.Link>
            </Link>
          </>
        )}
        {page === '/admin' && (
          <>
            <Link href="/admin" passHref>
              <Nav.Link>Administratörpanel</Nav.Link>
            </Link>
            <Link href="/admin/users" passHref>
              <Nav.Link>Hantera användare</Nav.Link>
            </Link>
            <Link href="/admin/clients" passHref>
              <Nav.Link>Hantera kunder</Nav.Link>
            </Link>
          </>
        )}
      </>
    ) : (
      <SNavDropdown
        title="Meny"
        id="nav-dropdown"
        className="align-self-center"
      >
        <>
          {page === '/' && (
            <>
              <Link href="/" passHref>
                <NavDropdown.Item>Startsida</NavDropdown.Item>
              </Link>
              <Link href="/engines" passHref>
                <NavDropdown.Item>Motorer</NavDropdown.Item>
              </Link>
            </>
          )}
          {page === '/admin' && (
            <>
              <Link href="/admin" passHref>
                <NavDropdown.Item>Administratörpanel</NavDropdown.Item>
              </Link>
              <Link href="/admin/users" passHref>
                <NavDropdown.Item>Hantera användare</NavDropdown.Item>
              </Link>
              <Link href="/admin/clients" passHref>
                <NavDropdown.Item>Hantera kunder</NavDropdown.Item>
              </Link>
            </>
          )}
        </>
      </SNavDropdown>
    )}
  </>
);

export default SidebarItems;
