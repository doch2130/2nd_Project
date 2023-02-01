import React from 'react'
import axios from 'axios';
import { Container, Row, Col, Button, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { logout } from '../store/modules/loginStatus';
import { invert } from '../store/modules/invertColor';
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from './Navbar';

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

  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Navbar />
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
