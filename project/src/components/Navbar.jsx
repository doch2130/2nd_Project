import React from 'react'
import axios from 'axios';
import {  Col, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from '../store/modules/loginStatus';
import { invert } from '../store/modules/invertColor';
import { useEffect } from 'react';
import { useState } from 'react';
import SwitchAccountModal from './SwitchAccountModal';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [switchAccountModal, setSwitchAccountModal] = useState(false);
  const invertColor = useSelector((state) => state.invertColor.invertColor);

  // 모드 전환 (색 반전)
  function colorInversion() {
    dispatch(invert(!invertColor));
  }

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

  useEffect(() => {
    const body = document.querySelector('body');
    if(invertColor) {
      body.style.backgroundColor = 'white';
      body.style.color = 'black';
    } else {
      body.style.backgroundColor = 'black';
      body.style.color = 'white';
    }
    // console.log('navBarWrap', navBarWrap.current.clientWidth);
    // console.log('navBarWrap', typeof(navBarWrap.current.clientWidth));
  }, [invertColor]);
    
  return (
    <>
      <Col xs={0} md={2} style={{padding: '0px', borderRight: '1px solid #dbdbdb', maxWidth: '250px'}} className="d-none d-md-block">
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
          {/* <div style={{position: 'absolute', bottom: '30px', width: '100%'}}>
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
          </div> */}
        </div>
        <div style={{position: 'relative', bottom: '50px', width: '100%'}}>
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
        <SwitchAccountModal show={switchAccountModal} onHide={() => setSwitchAccountModal(false)} />
      </Col>
    </>
  )
}
