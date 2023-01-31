import axios from 'axios';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';

export default function Test() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const navigate = useNavigate();

  // 사용자 요청 시 Token 검사 값에 따른 실행 함수
  async function test() {
    alert('클릭');
    const result = await axios.post('/test');
    console.log('result', result);

    if(result.data.msg === 'Access Token Excellent') {
      console.log('Access 토큰 정상');
      alert('Excellent');
    } else if(result.data.msg === 'Access Token Success') {
      console.log('Access 토큰 재생성');
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		  axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
      alert('Good');
    } else if(result.data.msg === 'AccessToken Invalid') {
      console.log('로그인 재요청');
      navigate('/login');
    } else if (result.data.msg === 'Access, Refresh NotFound') {
      console.log('로그인 재요청, Access Expired or NotFound, Refresh NotFound');
      navigate('/login');
    } else {
      console.log('error');
      navigate('/login');
    }

  }


  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          {/* 테스트 */}
          <h1>Login Session Success</h1>
          <Link to='/login'>로그인 페이지로 이동, 기능없음</Link>
          <br />
          <button type="button" onClick={() => test()}>테스트</button>
        </Col>
      </Row>
    </Container>
  )
}
