import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const NoMarginH6 = styled.h6`
  margin-bottom: 0.25rem;
  color: var(--link_color_hover);
  font-weight: 600;
  vertical-align: middle;
  display: inline-block;
  /* height: 100%; */
`;

const SCol = styled(Col)`
  padding-left: 0;
`;

// Because of the magnitude of data that is displayed in an engine this component is made so save up some space compared to 'HeadingData.js' component
// props:
//    header - the header of the data
//    children - the children of the component when it is used is usually the data itself

const EngineHeadingData = ({ header, children }) => (
  // React.useEffect(() => {
  //   console.log(children);
  //   if (!children) {
  //     console.log('Hello');
  //   }
  // }, [children]);

  <Row>
    <Col xs={5}>
      <NoMarginH6>{header}</NoMarginH6>
    </Col>
    <SCol xs={7}>
      {children ? <span>{children}</span> : <span>Ingen data</span>}
    </SCol>
  </Row>
);
export default EngineHeadingData;
