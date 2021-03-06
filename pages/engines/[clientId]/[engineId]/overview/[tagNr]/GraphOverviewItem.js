import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { formatTime, formatYear } from '../../GraphItem';

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

const NoDataDiv = styled.div`
  height: 335px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  :hover {
    cursor: pointer;
    background-color: var(--green_10);
  }
`;

const NoBlueTextLink = styled.a`
  color: #212529;
  height: inherit;
  :hover {
    cursor: pointer;
    background-color: var(--green_10);
  }
`;

const GraphOverviewItem = ({ data, header, extra }) => {
  const router = useRouter();

  const [date, setDate] = React.useState(null);
  React.useEffect(() => {
    if (data) {
      setDate(new Date(data.date));
    }
  }, [data]);

  if (extra) {
    if (date) {
      return (
        <WrapperDiv>
          <Link
            href="/engines/[clientId]/[engineId]/extra/[dataPoint]"
            as={`/engines/${router.query.clientId}/${router.query.engineId}/extra/${header}`}
          >
            <NoBlueTextLink>
              <DataDiv>{header}</DataDiv>
              <BarDiv>
                {data.limit === 'green' && <GreenBar />}
                {data.limit === 'yellow' && <YellowBar />}
                {data.limit === 'red' && <RedBar />}
              </BarDiv>
              <DataDiv>{data.value}</DataDiv>
              <DateDiv>
                <span>{formatYear(date)}</span>
                <span>{formatTime(date)}</span>
              </DateDiv>
            </NoBlueTextLink>
          </Link>
        </WrapperDiv>
      );
    }
    return (
      <Link
        href="/engines/[clientId]/[engineId]/extra/[dataPoint]"
        as={`/engines/${router.query.clientId}/${router.query.engineId}/extra/${header}`}
      >
        <NoBlueTextLink>
          <NoDataDiv>Det finns ingen data för {header}</NoDataDiv>
        </NoBlueTextLink>
      </Link>
    );
  }

  if (data && date) {
    return (
      <WrapperDiv>
        <Link
          href="/engines/[clientId]/[engineId]/[dataPoint]"
          as={`/engines/${router.query.clientId}/${router.query.engineId}/${header}`}
        >
          <NoBlueTextLink>
            <DataDiv>{header}</DataDiv>
            <BarDiv>
              {data.limit === 'green' && <GreenBar />}
              {data.limit === 'yellow' && <YellowBar />}
              {data.limit === 'red' && <RedBar />}
            </BarDiv>
            <DataDiv>{data.value}</DataDiv>
            <DateDiv>
              <span>{formatYear(date)}</span>
              <span>{formatTime(date)}</span>
            </DateDiv>
          </NoBlueTextLink>
        </Link>
      </WrapperDiv>
    );
  }

  return (
    <Link
      href="/engines/[clientId]/[engineId]/[dataPoint]"
      as={`/engines/${router.query.clientId}/${router.query.engineId}/${header}`}
    >
      <NoBlueTextLink>
        <NoDataDiv>Det finns ingen data för {header}</NoDataDiv>
      </NoBlueTextLink>
    </Link>
  );
};

export default GraphOverviewItem;
