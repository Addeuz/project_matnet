import { useRouter } from 'next/router';
import { Nav, Col } from 'react-bootstrap';
import styled from 'styled-components';
import useCurrentWidth from '../../utils/hooks/useCurrentWidth';
import SidebarItems from './SidebarItems';
import { SCol, SRow } from '../../styles/styled';

const SNav = styled(Nav)`
  border-radius: 0.25rem;
  border: 1px solid #dee2e6;
  flex-direction: column;

  a {
    color: var(--menu_color);
  }

  a:hover {
    color: var(--green_100);
    background-color: var(--yellow);
  }

  @media only screen and (max-width: 768px) {
    border: 0px;
  }
`;

const ContainerCol = styled(Col)`
  @media only screen and (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

// Component that is used as a sidebar menu
// Depending on what page we are on the sidebar looks different.
// It also depends on what viewport the user has
// props:
//    page - the current page we are on
//    children - the children of the component is showed in a large container beside the sidebar

const Sidebar = ({ page, children }) => {
  const router = useRouter();
  const windowWidth = useCurrentWidth();
  const [viewPort, setViewPort] = React.useState('desktop');
  React.useEffect(() => {
    if (windowWidth < 768) {
      setViewPort('mobile');
    } else {
      setViewPort('desktop');
    }
  }, [router.pathname, viewPort, windowWidth]);

  return (
    <SRow>
      <SCol xs={12} md={2}>
        {viewPort === 'desktop' ? (
          <SNav>
            <SidebarItems page={page} viewPort={viewPort} />
          </SNav>
        ) : (
          <SNav>
            <SidebarItems page={page} viewPort={viewPort} />
          </SNav>
        )}
      </SCol>
      <ContainerCol md={10} xs={12}>
        {children}
      </ContainerCol>
    </SRow>
  );
};

export default Sidebar;
