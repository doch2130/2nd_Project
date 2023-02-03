import React, { useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import HomePostTop from './HomePostTop';
import './HomePost.css';

export default function HomePost() {
  const fullH_Mid = {
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
  }

  const commentTextarea = useRef();

  const commentTextareaHeightAuto = () => {
    commentTextarea.current.style.height = 'auto';
    commentTextarea.current.style.height = commentTextarea.current.scrollHeight + 'px';
  }

  return (
    <>
    <Col xs={12} lg={6} style={fullH_Mid} >
      {/* <h2>Main Right Align</h2> */}
      {/* <h3>991px 이하 Center Align</h3> */}
      {/* 본문 Wrap */}
      <Row className='HomeSubMainChange' style={{justifyContent: 'flex-end'}}>
        <Col style={{padiing: '0px', minWidth: '470px', maxWidth: '470px'}}>
          {/* 최상단 신규 소식? */}
          <HomePostTop />

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
              <div className='HomePostImg'>
                <img src='/images/HomeImg1.png' alt='images' style={{position: 'absolute', top: '0px', left: '0px', width: '100%', zIndex: '-1'}}/>
              </div>
            </Col>
          </Row>
          {/* 좋아요, 댓글, 공유, 찜 */}
          <Row style={{marginTop: '10px'}}>
            <Col style={{padding: '0px', display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                  <img src='/images/emptyHeart.png' alt='images' style={{width: '24px', cursor: 'pointer'}}  />
                </div>
                <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                  <img src='/images/message.png' alt='images' style={{width: '24px', cursor: 'pointer'}} />
                </div>
                <div style={{width: '24px', height: '24px', marginRight: '20px'}}>
                  <img src='/images/share.png' alt='images' style={{width: '24px', cursor: 'pointer'}}  />
                </div>
              </div>
              <div style={{width: '24px', height: '24px'}}>
                <img src='/images/check.png' alt='images' style={{width: '24px' , cursor: 'pointer'}} />
              </div>
            </Col>
          </Row>
          {/* 좋아요 Count */}
          <Row style={{marginTop: '15px'}}>
            <Col style={{padding: '0px', textAlign: 'left'}}>
              <div style={{fontWeight: '700', fontSize: '0.85rem'}}>좋아요 30개</div>
            </Col>
          </Row>
          {/* 본문 */}
          <Row style={{marginTop: '5px'}}>
            <Col style={{padding: '0px', textAlign: 'left'}}>
              <div style={{display: 'flex', fontSize: '0.85rem', maxWidth: '310px'}}>
                {/* <div style={{fontWeight: '700'}}>닉네임</div> */}
                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  <div style={{fontWeight: '700', display: 'inline'}}>아이디 </div>
                  본문 내용이 들어가야 합니다. 본문 내용이 들어가야 합니다.
                </div>
                <div style={{cursor: 'pointer', color: '#777', minWidth: '46px'}}>더 보기</div>
                <pre>
                </pre>
              </div>
            </Col>
          </Row>
          {/* 댓글 개수 */}
          <Row style={{marginTop: '5px', textAlign: 'left'}}>
            <Col style={{padding: '0px', fontSize: '0.85rem'}}>
              <div style={{cursor: 'pointer', color: '#777'}}>댓글 110개 모두 보기</div>
            </Col>
          </Row>
          {/* 댓글 입력 */}
          <Row style={{marginTop: '5px', marginBottom: '70px'}}>
            <Col style={{padding: '0px', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between'}}>
              <textarea ref={commentTextarea} className='commentTextarea' rows={1} placeholder='댓글 달기' onChange={() => commentTextareaHeightAuto()} />
              <div style={{cursor: 'pointer', color: '#47afff', display: 'inline'}}>게시</div>
            </Col>
          </Row>
          {/* 본문 끝 */}
        </Col>
      </Row>
      {/* 본문 Wrap 끝 */}
    </Col>
    </>
  )
}
