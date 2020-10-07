import styled from 'styled-components';
import GraphOverviewItem from './GraphOverviewItem';

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

const DataOverviewTimeLine = ({ engineData, engineValues }) => {
  const lowerCaseEngineValues = convertKeysToLowerCase(engineValues);

  return (
    <div>
      <DataDiv>
        {engineData.map(data => {
          const header = Object.keys(data)[0];
          const displayData = lowerCaseEngineValues[header];
          const value = [...Object.values(data)[0]].reverse()[0];
          return displayData ? (
            <SingleDataDiv key={header}>
              <GraphOverviewItem data={value} header={header} />
            </SingleDataDiv>
          ) : null;
        })}
      </DataDiv>
    </div>
  );
};

function convertKeysToLowerCase(obj) {
  const output = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const i in obj) {
    if (Object.prototype.toString.apply(obj[i]) === '[object Object]') {
      output[i.toLowerCase()] = convertKeysToLowerCase(obj[i]);
    } else if (Object.prototype.toString.apply(obj[i]) === '[object Array]') {
      output[i.toLowerCase()] = [];
      output[i.toLowerCase()].push(convertKeysToLowerCase(obj[i][0]));
    } else {
      output[i.toLowerCase()] = obj[i];
    }
  }
  return output;
}

export default DataOverviewTimeLine;
