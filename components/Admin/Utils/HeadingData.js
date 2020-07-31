import styled from 'styled-components';

const NoMarginH6 = styled.h6`
  margin-bottom: 0;
  color: var(--link_color_hover);
  font-weight: 600;
`;

const SDiv = styled.div`
  margin-bottom: 0.5rem;
`;

// Component used to in ...Data.js components to show of the data
// props:
//    header - the header of the data
//    children - the children of the component when it is used is usually the data itself
const HeadingData = ({ header, children }) => (
  <SDiv>
    <NoMarginH6>{header}</NoMarginH6>
    {children}
  </SDiv>
);

export default HeadingData;
