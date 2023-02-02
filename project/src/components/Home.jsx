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
              {/* 본문 Wrap */}
              <Row style={{justifyContent: 'flex-end'}}>
                <Col style={{padiing: '0px', minWidth: '470px', maxWidth: '470px'}}>
                  {/* 최상단 신규 소식? */}
                  <Row>
                    <Col style={{padding: '0px', maxWidth: '65px', marginRight: '20px'}}>
                      <div style={{marginBottom: '8px'}}>
                        <div style={{position: 'relative'}}>
                          <img src='/logo192.png' alt='images' style={{width: '65px', height: '65px'}} />
                          <div className='profileImgCircle'></div>
                        </div>
                      </div>
                      <div>
                        <div className='profileImgText'>playstation_korea</div>
                      </div>
                    </Col>
                    <Col style={{padding: '0px', maxWidth: '65px'}}>
                      <div style={{marginBottom: '8px'}}>
                        <div style={{position: 'relative'}}>
                          <img src='/images/ex1.png' alt='images' style={{width: '65px', height: '65px'}} />
                          <div className='profileImgCircle'></div>
                        </div>
                      </div>
                      <div>
                        <div className='profileImgText'>korea</div>
                      </div>
                    </Col>
                  </Row>

                  {/* 본문 */}
                  {/* 이미지, 아이디, 작성 경과시간 */}
                  <Row style={{marginTop: '30px'}}>
                    <Col style={{padding: '0px'}}>
                      <Row style={{maxWidth: '470px', margin: '0px'}}>
                        <Col style={{padding: '0px', display: 'flex', justifyContent: 'space-between'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{position: 'relative', textAlign: 'left'}}>
                              <img src='/logo192.png' alt='images' style={{width: '32px', height: '32px'}} />
                              <div style={{position: 'absolute', top: '0px', border: '1px solid black', borderRadius: '50px', width: '32px', height: '32px'}}></div>
                            </div>
                            <div style={{marginLeft: '10px', textAlign: 'left', fontSize: '0.8rem'}}>
                              <div>
                                <div>
                                  <div>
                                    <span style={{fontWeight: '700'}}>raon</span>
                                    {/* <span style={{margin: '0 5px'}}>*</span> */}
                                    <div style={{margin: '0px 5px 2px', border: '1px solid #777', borderRadius: '50px', width: '3px', height: '3px', display: 'inline-block'}}></div>
                                    <span style={{color: '#777'}}>7시간</span>
                                  </div>
                                  {/* 광고는 없는 경우도 있음 */}
                                  <div>광고</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>***</div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* 사진, 동영상 */}
                  <Row style={{marginTop: '10px'}}>
                    <Col style={{padding: '0px'}}>
                      <div style={{border: '1px solid #E9E9E9', borderRadius: '5px', position: 'relative', width: '470px', height: '470px'}}>
                        <img src='/images/HomeImg1.png' alt='images' style={{position: 'absolute', top: '0px', left: '0px', width: '100%', zIndex: '-1'}}/>
                      </div>
                    </Col>
                  </Row>
                  {/* 좋아요, 댓글, 공유, 찜 */}
                  <Row style={{marginTop: '10px'}}>
                    <Col style={{padding: '0px', display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                          <img src='/images/emptyHeart.png' alt='images' style={{width: '24px'}}  />
                        </div>
                        <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                          <img src='/images/message.png' alt='images' style={{width: '24px'}} />
                        </div>
                        <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                          <img src='/images/share.png' alt='images' style={{width: '24px'}}  />
                        </div>
                      </div>
                      <div style={{width: '24px', height: '24px'}}>
                        <img src='/images/check.png' alt='images' style={{width: '24px'}} />
                      </div>
                    </Col>
                  </Row>
                  {/* 좋아요 Count */}
                  <Row></Row>
                  {/* 본문 */}
                  <Row></Row>
                  {/* 댓글 */}
                  <Row></Row>
                  {/* 본문 끝 */}
                </Col>
              </Row>
              {/* 본문 Wrap 끝 */}
            </Col>
            {/* SubMain */}
            <HomeSubMain />
            <Col>
              <span></span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
