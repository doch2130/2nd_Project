import axios from 'axios';
import React, { useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postAdd } from '../../store/modules/postData';
import './HomeSubMain.css';

export default function HomeSubMain() {
  const recomendData = [
    {
      id: 'sun',
      profileImg: '/images/ex1.png'
    },
    {
      id: 'graphe',
      profileImg: '/images/ex2.png'
    },
    {
      id: 'apple',
      profileImg: '/images/ex3.png'
    },
    {
      id: 'moon',
      profileImg: '/images/ex4.png'
    },
    {
      id: 'react',
      profileImg: '/images/ex5.png'
    }
  ];

  const subMainFooter = [
    '소개', '도움말', '홍보 센터', 'API', '채용 정보', '개인정보처리방침', '약관', '위치', '언어'
  ];

  const postAddForm = useRef();
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const userID = useSelector((state) => state.loginStatus.id);
  const dispatch = useDispatch();

  async function testAdd() {
    console.log('isLogin', isLogin);
    console.log('userID', userID);
    console.log('postAddForm.current.content.value', postAddForm.current.content.value);

    const result = await axios.post('/post/data/add', {
      id: userID,
      content: postAddForm.current.content.value,
      filename: postAddForm.current.filename.value,
      category: postAddForm.current.category.value,
    });
    console.log('result', result);

    dispatch(postAdd(result.data));

  }

  return (
    <>
    <Col xs={0} lg={3} style={{height: '100%', marginLeft: '64px'}} className="d-none d-md-block HomeSubMainNone" >
      <div style={{textAlign: 'left', minWidth: '320px', maxWidth: '320px'}}>
        {/* 프로필 1줄 */}
        <Row>
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
        </Row>

        <Row style={{marginTop: '10px'}}>
          <Col style={{padding: '0px'}}>
            <div style={{fontWeight: '700', display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'inline', color: '#777', fontSize: '0.9rem'}}>회원님을 위한 추천</div>
              <div style={{display: 'inline', cursor: 'pointer', fontSize: '0.8rem'}}>모두 보기</div>
            </div>
          </Col>
        </Row>


        {recomendData.map((el) => {
          return (
            <Row style={{marginTop: '10px'}} key={el.id}>
              <Col style={{padding: '0px', maxWidth: '35px'}}>
                <img src={el.profileImg} alt='images' style={{width: '35px', height: '35px'}} />
              </Col>
              <Col style={{padding: '0px 6px', display: 'flex', alignItems: 'center'}}>
                <div style={{paddingLeft: '5px'}}>
                  <div style={{fontSize: '0.8rem'}}>{el.id}</div>
                  <div style={{color: '#777', fontSize: '0.8rem'}}>회원님을 팔로우합니다.</div>
                </div>
              </Col>
              <Col style={{padding: '0px', maxWidth: '45px', color: '#47afff', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                <div style={{cursor: 'pointer'}}>팔로우</div>
              </Col>
            </Row>
          );
        })}

        <Row style={{marginTop: '12px'}}>
          <Col style={{padding: '0px'}}>
            <ul type='none' style={{padding: '0px', fontSize: '0.7rem', maxWidth: '300px', color: '#b0b0b0'}}>

              {subMainFooter.map((el, index) => {
                return (
                  <span key={index}>
                  <li className='subMainFooterList' style={{float: 'left'}}>{el}</li>
                  </span>
                );
              })}
              
            </ul>
            <br />
            <div style={{fontSize: '0.7rem', color: '#b0b0b0', marginTop: '16px'}}>© 2023 INSTAGRAM FROM META</div>
            <div style={{marginTop: '30px'}}>
              <form ref={postAddForm}>
                <input type='text' name='content' placeholder='content' />
                <input type='text' name='filename' placeholder='filename' />
                <input type='text' name='category' placeholder='category' />
                <br /><br />
                <button type="button" onClick={() => {testAdd()}}>데이터 넣기</button>
              </form>
              
            </div>
          </Col>
        </Row>
      </div>
    </Col>
    </>
  )
}
