import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const [showPwd, setShowPwd] = useState(false);
  const [showPwdDiv, setShowPwdDiv] = useState(false);
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

  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          <form className='form-floating' style={{maxWidth: '450px', margin: 'auto', border: '1px solid black'}}>
            <img src='/images/logo_text.png' alt='logo_text_img' style={{marginBottom: '30px', width: '100%', maxWidth: '360px'}}/>
            <br />
            {/* <input type='text' placeholder='전화번호, 사용자 이름 또는 이메일' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}}/> */}
            {/* <br /> */}
            <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '10px'}}>
              {/* <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" /> */}
              <input type="text" className="form-control" id="floatingInputID" placeholder="전화번호, 사용자 이름 또는 이메일" style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
              <label htmlFor="floatingInputID" style={{padding: '0.5rem 0.75rem', fontSize: '0.8rem'}}>전화번호, 사용자 이름 또는 이메일</label>
            </div>
            {/* <input type='password' placeholder='비밀번호' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}} /> */}
            {/* <br /> */}
            <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '10px'}}>
              <input type={showPwd ? "password" : "text"} className="form-control" id="floatingInputPW" placeholder="비밀번호" ref={inputPwd} onChange={() => inputPwdChange()} style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
              <label htmlFor="floatingInputPW" style={{padding: '0.5rem 0.75rem', fontSize: '0.8rem'}}>비밀번호</label>
              <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}>
                <button type='button' onClick={() => toggleShowPwd()} style={{padding: '0px', backgroundColor: 'white', border: 'none', position: 'absolute', top: '0.5rem', right: '0.75rem'}}>{showPwd ? "표시" : "숨기기"}</button>
              </div>
            </div>
            <div style={{width: '260px', textAlign: 'left', margin: 'auto', marginBottom: '10px'}}>
              <input type='checkbox' name='loginCookie' id='lgoinCookie' value='loginCookie' />
              <label htmlFor='lgoinCookie' style={{marginLeft: '5px'}}>로그인 정보 저장하기</label>
            </div>
            <Button style={{width: '260px'}}>로그인</Button>
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
        </Col>
      </Row>
    </Container>
  )
}
