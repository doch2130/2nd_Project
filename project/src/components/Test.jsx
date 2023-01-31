import axios from 'axios';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { logout, unRegister } from '../store/modules/loginStatus';

export default function Test() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.loginStatus.id);

  // 사용자 요청 시 Token 검사 값에 따른 실행 함수
  async function tokenAuth() {
    alert('클릭');
    const result = await axios.post('/tokenAuth');
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

  async function logoutRequest() {
    const chooseMsg = window.confirm('로그아웃 하시겠습니까?');
    if(chooseMsg) {
      await axios.post('/logout');
      axios.defaults.headers.common['Authorization'] = ``;
      dispatch(logout());
      alert('정상적으로 로그아웃되었습니다.');
      navigate('/login');
    }
  }

  async function unRegisterRequest() {
    const chooseMsg = window.confirm('회원탈퇴 하시겠습니까?');
    if(chooseMsg) {
      const result = await axios.post('/unregister', {
        id: userId
      });
      
      if(result.data === false) {
        alert('오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.');
        return;
      }

      axios.defaults.headers.common['Authorization'] = ``;
      dispatch(unRegister());
      alert('회원탈퇴가 정상적으로 완료되었습니다.');
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
          <button type="button" onClick={() => tokenAuth()}>토큰 인증 테스트</button>
          <br />
          <br />
          <button type="button" onClick={() => logoutRequest()}>로그아웃</button>
          <br />
          <br />
          <button type="button" onClick={() => unRegisterRequest()}>회원탈퇴</button>
        </Col>
      </Row>
    </Container>
  )
}
