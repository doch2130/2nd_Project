import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { success } from '../store/modules/loginStatus';
import { useEffect } from 'react';
import Footer from './Footer';

export default function Login() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 임시 방편, 로그인 상태인 경우 다시 리다이렉트
  useEffect(() => {
    if(isLogin) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showPwd, setShowPwd] = useState(false);
  const [showPwdDiv, setShowPwdDiv] = useState(false);
  const inputId = useRef();
  const inputPwd = useRef();

  function toggleShowPwd() {
    setShowPwd(!showPwd);
  }
  
  function inputPwdChange() {
    // console.log(inputPwd.current.value);
    if(inputPwd.current.value === '') {
      setShowPwdDiv(false);
    } else {
      setShowPwdDiv(true);
    }
  }

  function enterEvent(e) {
    if(e.key === 'Enter') {
      login();
    }
  }

  async function login() {
    // console.log(inputId.current.value);
    if(inputId.current.value.trim() === '') {
      inputId.current.focus();
      return alert('아이디를 입력해주세요.');
    } else if(inputPwd.current.value.trim() === '') {
      inputPwd.current.focus();
      return alert('패스워드를 입력해주세요.');
    }

    const response = await axios.post('/login', {
      id: inputId.current.value,
      pwd: inputPwd.current.value,
    });

    if(response.data.msg === true) {
      alert('로그인 성공');
      const { accessToken } = response.data;
      // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
		  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // 로그인 정보 reducer로 전달
      dispatch(success({id: response.data.id}));
      navigate('/home');

      // console.log(response);
      // console.log(accessToken);
    } else {
      inputId.current.value = '';
      inputPwd.current.value = '';
      alert('정보가 일치하지 않습니다.');
      inputId.current.focus();
    }
  }

  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          <form className='form-floating' style={{maxWidth: '450px', margin: 'auto', border: '1px solid black'}}>
            <img src='/images/logo_text.png' alt='logo_text_img' style={{marginBottom: '30px', width: '100%', maxWidth: '360px'}}/>
            <br />
            {/* <input type='text' placeholder='전화번호, 사용자 이름 또는 이메일' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}}/> */}
            <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '10px'}}>
              {/* <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" /> */}
              <input type="text" className="form-control" id="floatingInputID" placeholder="아이디, 전화번호 또는 이메일" ref={inputId} style={{height: '40px', padding: '0.7rem 0.75rem 0'}} 
              onKeyDown={(e) => enterEvent(e)} maxLength='100' />
              <label htmlFor="floatingInputID" style={{padding: '0.5rem 0.75rem', fontSize: '0.8rem'}}>아이디, 전화번호 또는 이메일</label>
            </div>
            {/* <input type='password' placeholder='비밀번호' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}} /> */}
            <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '10px'}}>
              <input type={showPwd ? "text" : "password"} className="form-control" id="floatingInputPW" placeholder="비밀번호" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} ref={inputPwd} onChange={() => inputPwdChange()} 
              onKeyDown={(e) => enterEvent(e)} maxLength='20' />
              <label htmlFor="floatingInputPW" style={{padding: '0.5rem 0.75rem', fontSize: '0.8rem'}}>비밀번호</label>
              <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}>
                <button type='button' onClick={() => toggleShowPwd()} style={{padding: '0px', backgroundColor: 'white', border: 'none', position: 'absolute', top: '0.5rem', right: '0.75rem'}}>{showPwd ? "숨기기" : "표시"}</button>
              </div>
            </div>
            <div style={{width: '260px', textAlign: 'left', margin: 'auto', marginBottom: '10px'}}>
              <input type='checkbox' name='loginCookie' id='lgoinCookie' value='loginCookie' />
              <label htmlFor='lgoinCookie' style={{marginLeft: '5px'}}>로그인 정보 저장하기</label>
            </div>
            <Button onClick={() => login()} style={{width: '260px'}}>로그인</Button>
            <br />
            <Row style={{width: '260px', margin: 'auto', marginTop: '15px'}}>
              <Col span={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
              <Col span={2} style={{padding: '0px', color: '#777'}}>또는</Col>
              <Col span={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
            </Row>
            <div style={{marginTop: '20px'}}>
              <p style={{cursor: 'pointer', maxWidth: '260px', margin: '0 auto 1rem'}}>
                <img src='/images/logo_facebook.png' alt='Facebook Logo' style={{width: '20px', height: '20px', marginRight: '5px'}} />
                <span style={{color: '#385185', fontWeight: '700', fontSize: '0.95rem'}}>Facebook으로 로그인</span>
              </p>
            </div>
            <div style={{marginBottom: '20px'}}>
              <span style={{color: '#385185', cursor: 'pointer', fontSize: '0.75rem'}}>비밀번호를 잊으셨나요?</span>
            </div>
          </form>
          
          <div style={{maxWidth: '450px', margin: 'auto', border: '1px solid black', marginTop: '15px', height: '60px'}}>
            <div style={{display: 'flex', height: '100%'}}>
              <p style={{margin: 'auto'}}>계정이 없으신가요? <Link to="/register" style={{textDecoration: 'none', fontWeight: '700'}}>가입하기</Link></p>
            </div>
          </div>

          <Footer />
        </Col>
      </Row>
    </Container>
  )
}
