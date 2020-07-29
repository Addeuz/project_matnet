import styled from 'styled-components';

const NoMarginH6 = styled.h6`
  margin-bottom: 0;
  color: var(--link_color_hover);
  font-weight: 600;
`;

const SDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const HeadingData = ({ header, children }) => (
  <SDiv>
    <NoMarginH6>{header}</NoMarginH6>
    {children}
  </SDiv>
);

export default HeadingData;
