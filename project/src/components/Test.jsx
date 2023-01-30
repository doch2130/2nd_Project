import axios from 'axios';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Test() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  function test() {
    axios.post('/test');
  }


  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          {/* 테스트 */}
          <h1>Login Session Success</h1>
          <Link to='/login'>로그인 페이지로 이동, 기능없음</Link>
          <button type="button" onClick={test()}>테스트</button>
        </Col>
      </Row>
    </Container>
  )
}
