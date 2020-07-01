import Link from 'next/link';
import { Nav, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';

const SNavDropdown = styled(NavDropdown)`
  .dropdown-menu {
    padding: 0;
    left: -15vw !important;
  }
`;

const SidebarItems = ({ viewPort, page }) => (
  <>
    {viewPort === 'desktop' ? (
      <>
        {page === '/' && (
          <>
            <Link href="/" passHref>
              <Nav.Link>hej index</Nav.Link>
            </Link>
            <Link href="/about" passHref>
              <Nav.Link>about</Nav.Link>
            </Link>
          </>
        )}
        {page === '/admin' && (
          <>
            <Link href="/admin" passHref>
              <Nav.Link>Administratörpanel</Nav.Link>
            </Link>
            <Link href="/admin/register" passHref>
              <Nav.Link>Registrera ny användare</Nav.Link>
            </Link>
            <Link href="/admin/users" passHref>
              <Nav.Link>Hantera användare</Nav.Link>
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
            <Link href="/" passHref>
              <NavDropdown.Item>hej index</NavDropdown.Item>
            </Link>
          )}
          {page === '/admin' && (
            <>
              <Link href="/admin" passHref>
                <NavDropdown.Item>Administratörpanel</NavDropdown.Item>
              </Link>
              <Link href="/admin/register" passHref>
                <NavDropdown.Item>Registrera ny användare</NavDropdown.Item>
              </Link>
              <Link href="/admin/users" passHref>
                <NavDropdown.Item>Hantera användare</NavDropdown.Item>
              </Link>
            </>
          )}
        </>
      </SNavDropdown>
    )}
  </>
);

export default SidebarItems;
