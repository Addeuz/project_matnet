import { useRouter } from 'next/router';
import { Nav, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import useCurrentWidth from '../../utils/hooks/useCurrentWidth';
import SidebarItems from './SidebarItems';

const SRow = styled(Row)`
  margin-top: 0.5rem;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0;
  }
`;

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
      <Col>
        {viewPort === 'desktop' ? (
          <SNav>
            <SidebarItems page={page} viewPort={viewPort} />
          </SNav>
        ) : (
          <SNav>
            <SidebarItems page={page} viewPort={viewPort} />
          </SNav>
        )}
      </Col>
      <Col className="px-2" md={9}>
        {children}
      </Col>
    </SRow>
  );
};

export default Sidebar;
