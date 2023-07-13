import axios from 'axios';
import React, { useRef, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postInit } from '../../store/modules/postData';
import HomePostTop from './HomePostTop';
import './HomePost.css';

export default function HomePost() {
  const fullH_Mid = {
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
  }

  const commentTextareaList = useRef([]);
  const commentTextareaHeightAuto = (commentInputRef) => {
    commentInputRef.target.style.height = 'auto';
    commentInputRef.target.style.height = commentInputRef.target.scrollHeight + 'px';
  }

  const dispatch = useDispatch();
  const postDataList = useSelector((state) => state.postData.list);
  // console.log(postDataList);

  useEffect(() => {
    async function postDataInit() {
      const result = await axios.post('/post/data');
      console.log('result ', result);
      for (let i = result.data.length-1; i >= 0; i--) {
        dispatch(postInit(result.data[i]));
      }
    }
    postDataInit();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rendering() {
    // console.log('render');
    const result = [];
    for (let i = postDataList.length-1; i >= 0; i--) {
      result.push(
      <div key={postDataList[i].number}>
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
                            <span style={{fontWeight: '700'}}>{postDataList[i].id}</span>
                            <div style={{margin: '0px 5px 2px', border: '1px solid #777', borderRadius: '50px', width: '3px', height: '3px', display: 'inline-block'}}></div>
                            <span style={{color: '#777'}}>{postDataList[i].date}</span>
                          </div>
                          <div>{postDataList[i].category}</div>
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
                <img src={postDataList[i].filename} alt='images' style={{position: 'absolute', top: '0px', left: '0px', width: '100%', zIndex: '-1'}}/>
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
                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  <div style={{fontWeight: '700', display: 'inline'}}>{postDataList[i].id} </div>
                    {postDataList[i].content}
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
              <textarea ref={(el) => (commentTextareaList.current[i] = el)}
              onChange={(i) => commentTextareaHeightAuto(i)}
              className='commentTextarea' rows={1} placeholder='댓글 달기' />
              <div style={{cursor: 'pointer', color: '#47afff', display: 'inline'}}>게시</div>
            </Col>
          </Row>
          </div>
      );
    }
    return result;
  }

  return (
    <>
    <Col xs={12} lg={6} style={fullH_Mid} >
      {/* <h3>991px 이하 Center Align</h3> */}
      {/* 본문 Wrap */}
      <Row className='HomeSubMainChange' style={{justifyContent: 'flex-end'}}>
        <Col style={{padiing: '0px', minWidth: '470px', maxWidth: '470px'}}>
          {/* 최상단 신규 소식? */}
          <HomePostTop />
          {/* 본문 */}
          {/* 이미지, 아이디, 작성 경과시간 */}
          {
            rendering()
          }
          
        </Col>
      </Row>
      {/* 본문 Wrap 끝 */}
    </Col>
    </>
  )
}
