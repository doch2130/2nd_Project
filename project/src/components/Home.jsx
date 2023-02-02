import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import HomeSubMain from './HomeSubMain';
import './Home.css';

export default function Home() {
  const h100 = {
    height: '100%',
  }
  const fullH_Mid = {
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
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
      <Row style={h100}>
        <Navbar />
        <Col xs={12} md={10} style={{marginTop: '50px'}}>
          <Row style={h100}>
            {/* Main */}
            <Col xs={12} lg={6} style={fullH_Mid} >
              {/* <h2>Main Right Align</h2> */}
              {/* <h3>991px 이하 Center Align</h3> */}
              <Row>
                <Col style={{padding: '0px', maxWidth: '65px'}}>
                  <div style={{marginBottom: '8px'}}>
                    <div style={{position: 'relative'}}>
                      <img src='/logo192.png' alt='images' style={{width: '65px', height: '65px'}} />
                      <div className='profileImgCircle'></div>
                    </div>
                  </div>
                  <div style={{marginTop: '-8px'}}>
                    <div>power</div>
                  </div>
                </Col>
              </Row>

              {/* <Row>
                <Col style={{padding: '0px', maxWidth: '65px'}}>
                  <img src='/logo192.png' alt='images' style={{width: '65px', height: '65px'}} />
                </Col>
                <Col style={{padding: '0px 6px', display: 'flex', alignItems: 'center'}}>
                  <div>
                    <div style={{fontSize: '0.8rem'}}>ID-ID-ID</div>
                    <div style={{color: '#777', fontSize: '0.9rem'}}>Name</div>
                  </div>
                </Col>
                <Col style={{padding: '0px', maxWidth: '35px', color: '#47afff', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                  <div style={{cursor: 'pointer'}}>전환</div>
                </Col>
              </Row> */}
            </Col>
            {/* SubMain */}
            <HomeSubMain />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
