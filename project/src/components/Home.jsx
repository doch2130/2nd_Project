import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import HomeSubMain from './HomeSubMain';
import './Home.css';
import HomePost from './HomePost';
import NavbarSmall from './NavbarSmall';

export default function Home() {
  const h100 = {
    height: '100%',
  }

  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  // 임시 방편, 로그아웃 상태 경우 다시 리다이렉트
  useEffect(() => {
    if(!isLogin) {
      navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid style={h100}>
    {/* // <Container fluid> */}
      <Row style={h100}>
        <Navbar />
        <Col xs={12} md={10} style={{marginTop: '50px'}}>
          <Row style={h100}>
            {/* Main */}
            <HomePost />
            {/* SubMain */}
            <HomeSubMain />

            {/* 빈 값, Col 균형 맞추기 */}
            <Col className='HomeSubMainNone'>
              <span></span>
            </Col>
          </Row>
        </Col>
        {/* 작은 화면에서는 Navbar Footer 고정 Fixed */}
        <NavbarSmall />
      </Row>
    </Container>
  )
}
