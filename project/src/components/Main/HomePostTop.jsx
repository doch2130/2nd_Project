import React from 'react'
import { Row, Col } from 'react-bootstrap';
import './HomePostTop.css';

export default function HomePostTop() {
  return (
    <>
      <Row>
        <Col style={{padding: '0px', maxWidth: '65px', marginRight: '20px'}}>
          <div style={{marginBottom: '8px'}}>
            <div style={{position: 'relative'}}>
              <img src='/logo192.png' alt='images' style={{width: '65px', height: '65px'}} />
              <div className='profileImgCircle'></div>
            </div>
          </div>
          <div>
            <div className='profileImgText'>playstation_korea</div>
          </div>
        </Col>
        <Col style={{padding: '0px', maxWidth: '65px'}}>
          <div style={{marginBottom: '8px'}}>
            <div style={{position: 'relative'}}>
              <img src='/images/ex1.png' alt='images' style={{width: '65px', height: '65px'}} />
              <div className='profileImgCircle'></div>
            </div>
          </div>
          <div>
            <div className='profileImgText'>korea</div>
          </div>
        </Col>
      </Row>
    </>
  )
}
