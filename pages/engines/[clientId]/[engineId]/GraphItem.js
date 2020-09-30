import styled from 'styled-components';

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BarDiv = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const DataDiv = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
`;

const DateDiv = styled.div`
  height: 65px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const GreenBar = styled.div`
  background-color: var(--success);
  height: 100%;
  width: 40px;
`;
const YellowBar = styled.div`
  background-color: var(--warning);
  height: 50%;
  width: 40px;
`;

const RedBar = styled.div`
  background-color: var(--danger);
  height: 10%;
  width: 40px;
`;

const GraphItem = ({ data, limit }) => {
  const date = new Date(data.date);

  return (
    <WrapperDiv>
      <BarDiv>
        {limit === 'green' && <GreenBar />}
        {limit === 'yellow' && <YellowBar />}
        {limit === 'red' && <RedBar />}
      </BarDiv>
      <DataDiv>{data.value}</DataDiv>
      <DateDiv>
        <span>{formatYear(date)}</span>
        <span>{formatTime(date)}</span>
      </DateDiv>
    </WrapperDiv>
  );
};

function formatYear(date) {
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

function formatTime(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}
export default GraphItem;
