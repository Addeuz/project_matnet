import Link from 'next/link';

import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import {
  formatTime,
  formatYear,
} from '../pages/engines/[clientId]/[engineId]/GraphItem';

const InfoText = styled.aside`
  font-size: 0.7rem;
  line-height: 0.8rem;
`;

const AssemblinYellowLink = styled.a`
  color: var(--menu_color);

  :hover {
    color: var(--menu_color_hover);
    text-decoration: none;
  }
`;

const CenterTextAlignCol = styled(Col)`
  text-align: center;
`;

const AlarmList = ({ data }) => (
  <>
    <InfoText>
      Larmlistan visar de mätvärdena som är i farozonen och borde överses
    </InfoText>
    <Row>
      <CenterTextAlignCol xs={4}>Mätpunkt</CenterTextAlignCol>
      <CenterTextAlignCol xs={2}>Värde</CenterTextAlignCol>
      <CenterTextAlignCol xs={6}>Datum</CenterTextAlignCol>
      {data.map(singleData => (
        <AlarmListItem key={singleData.value.date} data={singleData} />
      ))}
    </Row>
  </>
);

export default AlarmList;

const AlarmListItem = ({ data }) => {
  const date = new Date(data.value.date);

  return (
    <>
      <CenterTextAlignCol xs={4}>
        <Link
          href="/engines/[clientId]/[engineId]/[dataPoint]"
          as={`/engines/${data.clientId}/${data.engineId}/${data.dataPoint}`}
        >
          <AssemblinYellowLink href="">{data.dataPoint}</AssemblinYellowLink>
        </Link>
      </CenterTextAlignCol>
      <CenterTextAlignCol xs={2}>{data.value.value}</CenterTextAlignCol>
      <CenterTextAlignCol xs={6}>{`${formatYear(date)} ${formatTime(
        date
      )}`}</CenterTextAlignCol>
    </>
  );
};
