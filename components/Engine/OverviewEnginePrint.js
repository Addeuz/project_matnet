/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

const PrintContainer = styled.div`
  margin: 5rem;
  height: 10rem;
`;

const SP = styled.p`
  color: blue;
`;

class OverviewEnginePrint extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.engineData };
    console.log(this.state.data);
  }

  render() {
    return (
      <PrintContainer>
        <Row>
          <Col>
            <h1>Översikt för motor</h1>
          </Col>
          <Col>
            <img
              src="/Assemblin_Wordmark_Yellow_RGB.svg"
              style={{ width: 200 }}
              alt=""
            />
          </Col>
        </Row>
        {/* {this.state.data.map(data => ( */}
        {/*  <SP>{data}</SP> */}
        {/* ))} */}
      </PrintContainer>
    );
  }
}

export default OverviewEnginePrint;
