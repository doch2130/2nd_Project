import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Register() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const [showPwd, setShowPwd ] = useState(false);
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
            <form className="form-floating" style={{maxWidth: '450px', margin: 'auto', border: '1px solid black', paddingBottom: '2rem'}}>
                <img src='/images/logo_text.png' alt='logo_text_img' style={{width: '100%', maxWidth: '180px'}}/>
                <br />
                <div>
                    <p style={{margin: '0 auto 1rem', width: '260px', color: '#777'}}>친구들의 사진과 동영상을 보려면 가입하세요.</p>
                </div>
                <Button style={{width: '260px'}}>Facebook으로 로그인</Button>
                <br />
                <Row style={{width: '260px', margin: 'auto', marginTop: '15px'}}>
                    <Col span={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
                    <Col span={2} style={{padding: '0px', color: '#777'}}>또는</Col>
                    <Col span={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
                </Row>
                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '5px'}}>
                    {/* <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" /> */}
                    <input type="text" className="form-control" id="floatingInputName" placeholder="사용자 이름" style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
                    <label htmlFor="floatingInputName" style={{padding: '0.5rem 0.75rem'}}>사용자 이름</label>
                </div>
                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '5px'}}>
                    <input type={showPwd ? "text" : "password"} className="form-control" id="floatingInputPassword" placeholder="비밀번호" ref={inputPwd} onChange={() => inputPwdChange()} style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
                    <label htmlFor="floatingInputPassword" style={{padding: '0.5rem 0.75rem'}}>비밀번호</label>
                    <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}>
                        <button type='button' onClick={() => toggleShowPwd()} style={{padding: '0px', backgroundColor: 'white', border: 'none', position: 'absolute', top: '0.5rem', right: '0.75rem'}}>{showPwd ? "표시" : "숨기기"}</button>
                    </div>
                </div>
                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '5px'}}>
                    <input type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
                    <label htmlFor="floatingInputEmail" style={{padding: '0.5rem 0.75rem'}}>이메일 주소</label>
                </div>
                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px', marginBottom: '1rem'}}>
                    <input type="tel" className="form-control" id="floatingInput" placeholder="010-0000-0000" style={{height: '40px', padding: '0.7rem 0.75rem 0'}}/>
                    <label htmlFor="floatingInput" style={{padding: '0.5rem 0.75rem'}}>핸드폰 번호</label>
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <p style={{fontSize: '0.8rem', color: '#777', maxWidth: '260px', margin: 'auto'}}>
                        <span>저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다. </span>
                        <a href='https://www.facebook.com/help/instagram/261704639352628' target='_blank' style={{textDecoration: 'none'}}>더 알아보기</a>
                    </p>
                </div>
                <div>
                    <Button style={{width: '260px'}}>가입</Button>
                </div>
            </form>
            <div style={{maxWidth: '450px', margin: 'auto', border: '1px solid black', marginTop: '15px', height: '60px'}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <p style={{margin: 'auto'}}>계정이 있으신가요? <Link to="/login" style={{textDecoration: 'none', fontWeight: '700'}}>로그인</Link></p>
                </div>
            </div>
        </Col>
      </Row>
    </Container>
  )
}
