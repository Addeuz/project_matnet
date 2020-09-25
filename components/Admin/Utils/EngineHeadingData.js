import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Link from 'next/link';
import { camelize } from '../../../utils/stringManipulation';

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

const GreenSpan = styled.span`
  /* display: inline-block; */
  /* vertical-align: middle; */
  color: var(--green);
`;
const RedSpan = styled.span`
  /* display: inline-block; */
  /* vertical-align: middle; */
  color: var(--red);
`;

// Because of the magnitude of data that is displayed in an engine this component is made so save up some space compared to 'HeadingData.js' component
// props:
//    header - the header of the data
//    children - the children of the component when it is used is usually the data itself

export const EngineHeadingData = ({ header, children }) => {
  // React.useEffect(() => {
  //   console.log(children);
  //   if (!children) {
  //     console.log('Hello');
  //   }
  // }, [children]);
  const [boolHeader, setBoolHeader] = React.useState(false);

  React.useEffect(() => {
    if (
      header === 'Lager isolerad' ||
      header === 'Strömr.' ||
      header === 'Fr.omr.'
    )
      setBoolHeader(true);
  }, [header]);

  return boolHeader ? (
    <Row>
      <Col xs={5}>
        <NoMarginH6>{header}</NoMarginH6>
      </Col>
      <SCol xs={7}>
        {children ? <GreenSpan>Ja</GreenSpan> : <RedSpan>Nej</RedSpan>}
      </SCol>
    </Row>
  ) : (
    <Row>
      <Col xs={5}>
        <NoMarginH6>{header}</NoMarginH6>
      </Col>
      <SCol xs={7}>
        {children ? <span>{children}</span> : <span>Ingen data</span>}
      </SCol>
    </Row>
  );
};

export const EngineHeadingValueData = ({
  header,
  value,
  engineId,
  clientId,
}) => {
  const camelCaseHeader = camelize(header);
  if (value) {
    return (
      <Row>
        <Col xs={8}>
          <Link
            href="/engines/[clientId]/[engineId]/[dataPoint]"
            as={`/engines/${clientId}/${engineId}/${camelCaseHeader}`}
          >
            <a>
              <NoMarginH6>{header}</NoMarginH6>
            </a>
          </Link>
        </Col>
        <SCol xs={4}>
          <GreenSpan>Ja</GreenSpan>
        </SCol>
      </Row>
    );
  }
  return (
    <Row>
      <Col xs={8}>
        <NoMarginH6>{header}</NoMarginH6>
      </Col>
      <SCol xs={4}>
        <RedSpan>Nej</RedSpan>
      </SCol>
    </Row>
  );
};

export const UserEditingRight = ({ header, canEdit }) => {
  if (canEdit) {
    return (
      <Row>
        <Col xs={8}>
          <NoMarginH6>{header}</NoMarginH6>
        </Col>
        <SCol xs={4}>
          <GreenSpan>Ja</GreenSpan>
        </SCol>
      </Row>
    );
  }
  return (
    <Row>
      <Col xs={8}>
        <NoMarginH6>{header}</NoMarginH6>
      </Col>
      <SCol xs={4}>
        <RedSpan>Nej</RedSpan>
      </SCol>
    </Row>
  );
};
