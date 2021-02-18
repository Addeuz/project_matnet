/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import {
  formatTime,
  formatYear,
} from '../../../pages/engines/[clientId]/[engineId]/GraphItem';

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

const PrintLogo = styled(Col)`
  align-self: center;
`;

class SingleMeasurePointPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValues: this.props.dataValues,
      engineInfo: this.props.engineInfo,
      engineInfoKeys: Object.keys(this.props.engineInfo),
      dataPoint: this.props.dataPoint,
      tagNr: this.props.tagNr,
    };
    console.log(this.state.engineInfo);
    console.log(this.state.dataValues);
    console.log(this.state.dataPoint);
    console.log(this.state.tagNr);
  }

  componentDidMount() {
    console.log('MOUNTED');
  }

  render() {
    return (
      <PrintContainer>
        <PrintRow>
          <PrintCol>
            <h2>Översikt för tag nr: {this.state.tagNr}</h2>
            <h4>Mätpunkt: {this.state.dataPoint}</h4>
          </PrintCol>
          <PrintLogo xs={3}>
            <img
              src="/Assemblin_Wordmark_Yellow_RGB.svg"
              style={{ width: 200 }}
              alt=""
            />
          </PrintLogo>
        </PrintRow>
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
        <PrintRow>
          <PrintCol className="mt-3">
            <h5>Mätvärden</h5>
          </PrintCol>
        </PrintRow>
        <PrintRow>
          <HeaderCol>Värde</HeaderCol>
          <HeaderCol>Gränsvärde</HeaderCol>
          <HeaderCol>Datum</HeaderCol>
          <HeaderCol>Tid</HeaderCol>
        </PrintRow>
        {this.state.dataValues.map(data => {
          const presentableDate = formatYear(new Date(data.date));
          const presentableTime = formatTime(new Date(data.date));

          console.log(data);
          return (
            <PrintRow>
              <PrintCol>{data.value}</PrintCol>
              <PrintCol>
                {data.limit === 'green' ? (
                  <span>Väl godkänt</span>
                ) : data.limit === 'yellow' ? (
                  <span>Godkänt</span>
                ) : data.limit === 'red' ? (
                  <span>Ej godkänt</span>
                ) : (
                  ''
                )}
              </PrintCol>
              <PrintCol>{presentableDate}</PrintCol>
              <PrintCol>{presentableTime}</PrintCol>
            </PrintRow>
          );
        })}
      </PrintContainer>
    );
  }
}

export default SingleMeasurePointPrint;
