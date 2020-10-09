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

const SH5 = styled.h5`
  margin-top: 1rem;
`;

const DataOverviewTimeLine = ({
  engineData,
  extraEngineData,
  engineValues,
}) => {
  const lowerCaseEngineValues = convertKeysToLowerCase(engineValues);

  return (
    <div>
      <DataDiv>
        {engineData.map(data => {
          const header = Object.keys(data)[0];
          const displayData = lowerCaseEngineValues[header];
          const value = [...Object.values(data)[0]].reverse()[0]; // Get only the first value in the array of added values
          return displayData ? (
            <SingleDataDiv key={header}>
              <GraphOverviewItem data={value} header={header} />
            </SingleDataDiv>
          ) : null;
        })}
      </DataDiv>
      {/** TODO: Add extra inputs here */}
      <SH5>Data för extra mätpunkter</SH5>
      <DataDiv>
        {extraEngineData.map(data => {
          const header = Object.keys(data)[0];
          const value = [...Object.values(data)[0]].reverse()[0]; // Get only the first value in the array of added values
          return (
            <SingleDataDiv key={header}>
              <GraphOverviewItem data={value} header={header} extra />
            </SingleDataDiv>
          );
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
