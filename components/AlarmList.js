import Link from 'next/link';

import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import {
  formatTime,
  formatYear,
} from '../pages/engines/[clientId]/[engineId]/GraphItem';

export const InfoText = styled.aside`
  font-size: 0.7rem;
  line-height: 0.8rem;
`;

const ScrollRow = styled(Row)`
  height: 50vh;
  overflow: auto;
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
    </Row>
    <ScrollRow>
      {data.map(singleData => (
        <AlarmListItem key={singleData.value.date} data={singleData} />
      ))}
    </ScrollRow>
  </>
);

export default AlarmList;

const AlarmListItem = ({ data }) => {
  const date = new Date(data.value.date);

  if (data.extra) {
    return (
      <>
        <CenterTextAlignCol xs={4}>
          <Link
            href="/engines/[clientId]/[engineId]/extra/[dataPoint]"
            as={`/engines/${data.clientId}/${data.engineId}/extra/${data.dataPoint}`}
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
  }

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
