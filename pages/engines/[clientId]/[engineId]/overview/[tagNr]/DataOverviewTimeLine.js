import styled from 'styled-components';
import GraphOverviewItem from './GraphOverviewItem';

const Sh4 = styled.h4`
  margin-top: 1.5rem;
`;

const DataDiv = styled.div`
  height: 350px;
  overflow: auto;
  display: flex;
  flex-flow: column wrap;
`;

const SingleDataDiv = styled.div`
  width: 200px;
  height: inherit;
`;

const DataOverviewTimeLine = ({ engineData, key }) => {
  React.useEffect(() => {
    // console.log(engineData.reverse());
  }, [engineData]);

  return engineData[0] ? (
    <div>
      <DataDiv>
        {engineData.reverse().map(data => {
          const header = Object.keys(data)[0];
          const value = [...Object.values(data)[0]].reverse()[0];
          console.log(header, value);
          return (
            <SingleDataDiv>
              <GraphOverviewItem data={value} header={header} />
            </SingleDataDiv>
          );
        })}
      </DataDiv>
    </div>
  ) : (
    <div>
      <Sh4>Det finns ingen data för {header}</Sh4>
    </div>
  );
};

export default DataOverviewTimeLine;
