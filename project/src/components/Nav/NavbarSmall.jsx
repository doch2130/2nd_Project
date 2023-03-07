import React from 'react'
import { Col, Nav } from 'react-bootstrap';

export default function NavbarSmall() {
  return (
    <>
    {/* 작은 화면에서는 Navbar Footer 고정 Fixed */}
    <Col xs={12} className="d-block d-md-none" style={{position: 'fixed', bottom: '0', borderTop: '1px solid #777', borderBottom: '1px solid #777', backgroundColor: 'white'}}>
      <Nav defaultActiveKey="/home" style={{justifyContent: 'space-evenly'}}>
        <Nav.Link to="/home">홈</Nav.Link>
        <Nav.Link eventKey="link-1">검색</Nav.Link>
        <Nav.Link eventKey="link-2">탐색</Nav.Link>
        <Nav.Link eventKey="link-4">메시지</Nav.Link>
        <Nav.Link eventKey="link-7">프로필</Nav.Link>
      </Nav>
    </Col>
    </>
  )
}
