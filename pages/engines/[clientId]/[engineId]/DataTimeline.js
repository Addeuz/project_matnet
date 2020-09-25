import styled from 'styled-components';
import GraphItem from './GraphItem';

const Sh4 = styled.h4`
  margin-top: 1.5rem;
`;

const DataDiv = styled.div`
  height: 310px;
  overflow: auto;
  display: flex;
  flex-flow: column wrap;
`;

const SingleDataDiv = styled.div`
  width: 200px;
  height: inherit;
`;

const DataTimeLine = ({ engineData, header }) => {
  React.useEffect(() => {
    console.log(engineData);
  }, [engineData]);

  return engineData[0] ? (
    <div>
      <Sh4>Data för {header}</Sh4>
      <DataDiv>
        {engineData.reverse().map(data => (
          <SingleDataDiv>
            <GraphItem data={data} limit={data.limit} />
          </SingleDataDiv>
        ))}
      </DataDiv>
    </div>
  ) : (
    <div>
      <Sh4>Det finns ingen data för {header}</Sh4>
    </div>
  );
};

export default DataTimeLine;
