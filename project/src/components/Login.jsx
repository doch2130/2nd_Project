import React from 'react';
import {Container , Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Login() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    height: '700px',
    margin: 'auto',
    textAlign: 'center'
  }
  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
          <form style={{maxWidth: '450px', margin: 'auto', border: '1px solid black'}}>
            <img src='/images/logo_text.png' alt='logo_text_img' style={{marginBottom: '30px'}}/>
            <br />
            <input type='text' placeholder='전화번호, 사용자 이름 또는 이메일' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}}/>
            <br />
            <input type='password' placeholder='비밀번호' style={{height: '30px', minWidth: '260px', fontSize: '0.8rem', marginBottom: '10px'}} />
            <br />
            <Button style={{width: '260px'}}>로그인</Button>
            <br />
            <Row style={{width: '260px', margin: 'auto', marginTop: '15px'}}>
              <Col sm={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
              <Col sm={2} style={{padding: '0px', color: '#777'}}>또는</Col>
              <Col sm={5} style={{border: '1px solid #777', height: '1px', position: 'relative', top: '10px'}}></Col>
            </Row>
            <div style={{marginTop: '20px'}}>
              <span style={{color: '#385185', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem'}}>Facebook으로 로그인</span>
            </div>
            <div style={{marginTop: '10px', marginBottom: '20px'}}>
              <span style={{color: '#385185', cursor: 'pinter', fontSize: '0.75rem'}}>비밀번호를 잊으셨나요?</span>
            </div>
          </form>
          
          <div style={{maxWidth: '450px', margin: 'auto', border: '1px solid black', marginTop: '15px', height: '60px'}}>
            <div style={{display: 'flex', height: '100%'}}>
              <p style={{margin: 'auto'}}>계정이 없으신가요? <Link to="#" style={{textDecoration: 'none', fontWeight: '700'}}>가입하기</Link></p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
