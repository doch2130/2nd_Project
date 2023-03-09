import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { success } from '../store/modules/loginStatus';
import { useEffect } from 'react';
import Footer from './Footer/Footer';
import './Login.css';

const h100 = {
  height: '100%',
}
const mid = {
  margin: 'auto',
  textAlign: 'center'
}

export default function Login() {
  
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginCookie = useRef();

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
    console.log('loginCookie', loginCookie.current.checked);
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
      loginCookie: loginCookie.current.checked,
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

  useEffect(() => {
    if(document.cookie.indexOf('loginid') === 0) {
      loginCookie.current.checked = true;
      inputId.current.value = document.cookie.slice(8);
    } else {
      loginCookie.current.checked = false;
    }
  }, []);

  const notAlreadyFunction = () => {
    alert('준비중인 기능입니다.');
  }

  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          <form className='form-floating loginForm' >
            <img src='/images/logo_text.png' alt='logo_text_img' className="loginForm-logo" />
            <br />
            <div className="form-floating loginForm-inputWrap" >
              <input type="text" className="form-control" id="floatingInputID" placeholder="아이디, 전화번호 또는 이메일" ref={inputId} onKeyDown={(e) => enterEvent(e)} maxLength='100' />
              <label htmlFor="floatingInputID" className="loginForm-label" >아이디, 전화번호 또는 이메일</label>
            </div>
            <div className="form-floating loginForm-inputWrap" >
              <input type={showPwd ? "text" : "password"} className="form-control" id="floatingInputPW" placeholder="비밀번호" ref={inputPwd} onChange={() => inputPwdChange()} onKeyDown={(e) => enterEvent(e)} maxLength='20' />
              <label htmlFor="floatingInputPW" className="loginForm-label">비밀번호</label>
              <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}>
                <button type='button' onClick={() => toggleShowPwd()} className="showPwdButton">
                  {showPwd ? "숨기기" : "표시"}
                </button>
              </div>
            </div>
            <div className='loginForm-cookie'>
              <input ref={loginCookie} type='checkbox' name='loginCookie' id='loginCookie' value='true' />
              <label htmlFor='loginCookie'>로그인 정보 저장하기</label>
            </div>
            <Button onClick={() => login()} style={{width: '260px'}}>로그인</Button>
            <br />
            <Row className="loginForm-line">
              <Col span={5}></Col>
              <Col span={2}>또는</Col>
              <Col span={5}></Col>
            </Row>
            <div className='loginForm-FaceBookWrap'>
              <p>
                <img src='/images/logo_facebook.png' alt='Facebook Logo' onClick={notAlreadyFunction} />
                <span onClick={notAlreadyFunction}>Facebook으로 로그인</span>
              </p>
            </div>
            <div className='loginForm-PasswordFind'>
              <span onClick={notAlreadyFunction}>비밀번호를 잊으셨나요?</span>
            </div>
          </form>
          
          <div className="loginForm-Register">
            <div>
              <p>계정이 없으신가요? <Link to="/register">가입하기</Link></p>
            </div>
          </div>

          <Footer />
        </Col>
      </Row>
    </Container>
  )
}
