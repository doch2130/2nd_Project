import React from 'react'
import { Row, Col } from 'react-bootstrap';
import './Footer.css'

export default function Footer() {

    const footerList = [ 'Meta', '소개', '블로그', '채용 정보', '도움말', 'API', '개인정보처리방침',
'약관', '인기 계정', '위치', 'Instagram Lite', '연락처 업로드 & 비사용자' ];

  return (
    <>
    <div id='footer_wrap'>
        <Row style={{justifyContent: 'center'}}>
            {footerList.map((el, index) => {
                return (
                <Col xs='auto' className='footer_col' key={index}>
                    <a href={process.env.REACT_APP_BACK} rel="noreferrer">
                        <span>{el}</span>
                    </a>
                </Col>
                )
            })}
        </Row>
        <Row style={{marginTop: '15px', textAlign: 'center'}}>
            <Col xs={12} style={{marginBottom: '30px'}}>
            <select>
                <option value='korea'>한국어</option>
            </select>
                <span style={{marginLeft: '20px'}}>© 2023 Instagram from Meta</span>
            </Col>
        </Row>
    </div>
    </>
  )
}
