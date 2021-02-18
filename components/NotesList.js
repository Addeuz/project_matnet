import { Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { InfoText } from './AlarmList';
import { formatYear } from '../pages/engines/[clientId]/[engineId]/GraphItem';
import NoteModal from './NoteModal';

const CenterTextAlignCol = styled(Col)`
  text-align: center;
`;

const NoteCol = styled(Col)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`;

const NoteButton = styled(Button)`
  white-space: nowrap;
  color: inherit;
  overflow: inherit;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`;

const ScrollRow = styled(Row)`
  height: 50vh;
  overflow: auto;
`;

const NotesList = ({ data }) => {
  const [modalShow, setModalShow] = React.useState(null);

  return (
    <>
      <InfoText>
        Här visas noteringar som din serviceteknikar har lagt till på någon av
        era motorer
      </InfoText>
      <Row>
        <CenterTextAlignCol xs={8}>Notering</CenterTextAlignCol>
        <CenterTextAlignCol xs={4}>Datum</CenterTextAlignCol>
      </Row>
      <ScrollRow>
        {data.map(singleData => (
          <React.Fragment key={singleData.date}>
            <NotesListItem
              data={singleData}
              setShow={() => {
                setModalShow(singleData.date);
              }}
            />
            <NoteModal
              show={modalShow === singleData.date}
              onHide={() => setModalShow(null)}
              data={singleData}
            />
          </React.Fragment>
        ))}
      </ScrollRow>
    </>
  );
};

export default NotesList;

const NotesListItem = ({ data, setShow }) => {
  const date = new Date(data.date);

  return (
    <>
      <NoteCol xs={8}>
        <NoteButton
          onClick={() => {
            setShow();
          }}
          variant="link"
        >
          {data.note}
        </NoteButton>
      </NoteCol>
      <Col className="text-center" xs={4}>{`${formatYear(date)}`}</Col>
    </>
  );
};

// const AlarmListItem = ({ data }) => {
//   const date = new Date(data.value.date);
//
//   if (data.extra) {
//     return (
//       <>
//         <CenterTextAlignCol xs={4}>
//           <Link
//             href="/engines/[clientId]/[engineId]/extra/[dataPoint]"
//             as={`/engines/${data.clientId}/${data.engineId}/extra/${data.dataPoint}`}
//           >
//             <AssemblinYellowLink href="">{data.dataPoint}</AssemblinYellowLink>
//           </Link>
//         </CenterTextAlignCol>
//         <CenterTextAlignCol xs={2}>{data.value.value}</CenterTextAlignCol>
//         <CenterTextAlignCol xs={6}>{`${formatYear(date)} ${formatTime(
//           date
//         )}`}</CenterTextAlignCol>
//       </>
//     );
//   }
//
//   return (
//     <>
//       <CenterTextAlignCol xs={4}>
//         <Link
//           href="/engines/[clientId]/[engineId]/[dataPoint]"
//           as={`/engines/${data.clientId}/${data.engineId}/${data.dataPoint}`}
//         >
//           <AssemblinYellowLink href="">{data.dataPoint}</AssemblinYellowLink>
//         </Link>
//       </CenterTextAlignCol>
//       <CenterTextAlignCol xs={2}>{data.value.value}</CenterTextAlignCol>
//       <CenterTextAlignCol xs={6}>{`${formatYear(date)} ${formatTime(
//         date
//       )}`}</CenterTextAlignCol>
//     </>
//   );
// };
