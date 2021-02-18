/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import { formatYear } from '../../../pages/engines/[clientId]/[engineId]/GraphItem';

const PrintContainer = styled.div`
  @media print {
    margin-top: 1rem;
    display: block;
    page-break-before: auto;
  }
  @page {
    size: auto;
    margin: 20mm;
  }
`;

const PrintRow = styled(Row)`
  justify-content: space-between;
`;

const PrintCol = styled(Col)`
  /* align-self: center; */
  overflow-wrap: break-word;
`;

const HeaderCol = styled(Col)`
  font-weight: bold;
`;

const MeasureHeaderCol = styled(Col)`
  font-weight: 500;
`;

const PrintLogo = styled(Col)`
  align-self: center;
`;

const VGSpan = styled.span`
  color: var(--success);
`;
const GSpan = styled.span`
  color: var(--warning);
`;
const EGSpan = styled.span`
  color: var(--danger);
`;

class OverviewEnginePrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineInfo: this.props.engineInfo,
      engineInfoKeys: Object.keys(this.props.engineInfo),
      engineData: this.props.engineData,
      engineExtraData: this.props.extraEngineData,
    };

    console.log(this.state.engineExtraData);
  }

  componentDidMount() {
    console.log('MOUNTED');
  }

  render() {
    return (
      <PrintContainer>
        <PrintRow>
          <PrintCol>
            <h2>Översikt för tag nr: {this.state.engineInfo.tagNr}</h2>
          </PrintCol>
          <PrintLogo xs={3}>
            <img
              src="/Assemblin_Wordmark_Yellow_RGB.svg"
              style={{ width: 200 }}
              alt=""
            />
          </PrintLogo>
        </PrintRow>
        {/* EngineInfo */}
        <PrintRow>
          <PrintCol>
            <h4>Motorinformation</h4>
          </PrintCol>
        </PrintRow>
        <PrintRow>
          <PrintCol>
            {this.state.engineInfoKeys.map((key, index) => {
              if (index < 9) {
                // drivsystem
                if (key === 'strömR' && this.state.engineInfo[key] === true) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Ja</PrintCol>
                    </PrintRow>
                  );
                }
                if (key === 'strömR' && this.state.engineInfo[key] === false) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Nej</PrintCol>
                    </PrintRow>
                  );
                }

                if (key === 'fromR' && this.state.engineInfo[key] === true) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Ja</PrintCol>
                    </PrintRow>
                  );
                }
                if (key === 'fromR' && this.state.engineInfo[key] === false) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Nej</PrintCol>
                    </PrintRow>
                  );
                }
                return (
                  <PrintRow>
                    <PrintCol>{key}</PrintCol>
                    <PrintCol>{this.state.engineInfo[key]}</PrintCol>
                  </PrintRow>
                );
              }
              return null;
            })}
          </PrintCol>
          <PrintCol>
            {this.state.engineInfoKeys.map((key, index) => {
              console.log(key);
              if (index > 9) {
                if (
                  key === 'lagerIsolerad' &&
                  this.state.engineInfo[key] === true
                ) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Ja</PrintCol>
                    </PrintRow>
                  );
                }
                if (
                  key === 'lagerIsolerad' &&
                  this.state.engineInfo[key] === false
                ) {
                  return (
                    <PrintRow>
                      <PrintCol>{key}</PrintCol>
                      <PrintCol>Nej</PrintCol>
                    </PrintRow>
                  );
                }

                return (
                  <PrintRow>
                    <PrintCol>{key}</PrintCol>
                    <PrintCol>{this.state.engineInfo[key]}</PrintCol>
                  </PrintRow>
                );
              }
              return null;
            })}
          </PrintCol>
        </PrintRow>
        {/* EngineData */}
        <PrintRow className="mt-3">
          <PrintCol>
            <h4>Motordata</h4>
          </PrintCol>
        </PrintRow>
        <PrintRow>
          <HeaderCol>Mätpunkt</HeaderCol>
          <HeaderCol>Mätvärde</HeaderCol>
          <HeaderCol>Gränsvärde</HeaderCol>
          <HeaderCol>Datum</HeaderCol>
        </PrintRow>

        {this.state.engineData.map(data => {
          const header = Object.keys(data)[0];
          const presentableDate = formatYear(new Date(data[header][0]?.date));
          return (
            <PrintRow>
              <MeasureHeaderCol>{header}</MeasureHeaderCol>
              <PrintCol>
                {data[header][0]?.value
                  ? data[header][0]?.value
                  : 'Inget värde'}
              </PrintCol>
              <PrintCol>
                {data[header][0]?.limit === 'green' ? (
                  <span>Väl godkänt</span>
                ) : data[header][0]?.limit === 'yellow' ? (
                  <span>Godkänt</span>
                ) : data[header][0]?.limit === 'red' ? (
                  <span>Ej godkänt</span>
                ) : (
                  ''
                )}
              </PrintCol>
              <PrintCol>{data[header][0] ? presentableDate : ''}</PrintCol>
            </PrintRow>
          );
        })}
        {this.state.engineExtraData.length === 0 ? null : (
          <>
            <PrintRow className="mt-3">
              <PrintCol>
                <h4>Extra mätvärden</h4>
              </PrintCol>
            </PrintRow>
            <PrintRow>
              <HeaderCol>Mätpunkt</HeaderCol>
              <HeaderCol>Mätvärde</HeaderCol>
              <HeaderCol>Gränsvärde</HeaderCol>
              <HeaderCol>Datum</HeaderCol>
            </PrintRow>
            {this.state.engineExtraData.map(data => {
              const header = Object.keys(data)[0];
              const presentableDate = formatYear(
                new Date(data[header][0]?.date)
              );
              return (
                <PrintRow>
                  <MeasureHeaderCol>{header}</MeasureHeaderCol>
                  <PrintCol>
                    {data[header][0]?.value
                      ? data[header][0]?.value
                      : 'Inget värde'}
                  </PrintCol>
                  <PrintCol>
                    {data[header][0]?.limit === 'green' ? (
                      <span>Väl godkänt</span>
                    ) : data[header][0]?.limit === 'yellow' ? (
                      <span>Godkänt</span>
                    ) : data[header][0]?.limit === 'red' ? (
                      <span>Ej godkänt</span>
                    ) : (
                      ''
                    )}
                  </PrintCol>
                  <PrintCol>{data[header][0] ? presentableDate : ''}</PrintCol>
                </PrintRow>
              );
            })}
          </>
        )}
      </PrintContainer>
    );
  }
}

export default OverviewEnginePrint;
