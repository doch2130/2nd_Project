import React from 'react'
import axios from 'axios';
import { Container, Row, Col, Button, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from '../store/modules/loginStatus';
import { invert } from '../store/modules/invertColor';
import { useEffect } from 'react';
import { useState } from 'react';
import SwitchAccountModal from './SwitchAccountModal';

export default function Home() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }
  const fullH_Mid = {
    height: '100%',
    margin: 'auto',
    textAlign: 'center',
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logoutRequest() {
    const chooseMsg = window.confirm('로그아웃 하시겠습니까?');
    if(chooseMsg) {
      await axios.post('/logout');
      axios.defaults.headers.common['Authorization'] = ``;
      dispatch(logout());
      alert('정상적으로 로그아웃되었습니다.');
      navigate('/login');
    }
  }

  const invertColor = useSelector((state) => state.invertColor.invertColor);

  // true white
  // false black
  // 모드 전환 (색 반전)
  function colorInversion() {
    dispatch(invert(!invertColor));
  }

  useEffect(() => {
    const body = document.querySelector('body');
    if(invertColor) {
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
    } else {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    }
  }, [invertColor]);

  const [switchAccountModal, setSwitchAccountModal] = useState(false);

  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col xs={0} md={2} style={{height: '100%', margin: 'auto', textAlign: 'center', padding: '0px'}} className="d-none d-md-block">
          <div style={{height: '100%', margin: 'auto', textAlign: 'left'}} >
            <img src='/images/logo_text.png' alt='logo_text_img' style={{margin: '30px 0', width: '100%', maxWidth: '130px'}}/>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link to="/home">홈</Nav.Link>
              <Nav.Link eventKey="link-1">검색</Nav.Link>
              <Nav.Link eventKey="link-2">탐색 탭</Nav.Link>
              <Nav.Link eventKey="link-3">릴스</Nav.Link>
              <Nav.Link eventKey="link-4">메시지</Nav.Link>
              <Nav.Link eventKey="link-5">알림</Nav.Link>
              <Nav.Link eventKey="link-6">만들기</Nav.Link>
              <Nav.Link eventKey="link-7">프로필</Nav.Link>
              {/* <Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link> */}
            </Nav>
            <div style={{position: 'absolute', bottom: '30px', width: '100%'}}>
              <DropdownButton id="dropdown-item-button-up" drop='up' title='' style={{display: 'inline-block'}}>
                <Dropdown.Item as="button">설정</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button">저장됨</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={() => colorInversion()}>모드 전환</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button">내 활동</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button">문제 신고</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={() => {
                  setSwitchAccountModal(true);
                }}>계정 전환</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={() => logoutRequest()}>로그아웃</Dropdown.Item>
              </DropdownButton>
              <span style={{marginLeft: '15px'}}>더 보기</span>
            </div>
          </div>
          <SwitchAccountModal show={switchAccountModal} onHide={() => setSwitchAccountModal(false)} />
        </Col>
        <Col xs={12} md={10} style={fullH_Mid}>
          <Row>
            <h1>Section</h1>
            <Col xs={12} lg={6} style={fullH_Mid} >
              <h2>Main Right Align</h2>
              <h3>991px 이하 Center Align</h3>
            </Col>
            <Col xs={0} lg={6} style={fullH_Mid} className="d-none d-md-block" >
              <h2>Sub_Main Left Align</h2>
            </Col>
          </Row>
        </Col>
      </Row>
      
    </Container>
  )
}
