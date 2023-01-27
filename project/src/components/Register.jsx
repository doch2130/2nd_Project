import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';

export default function Register() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  // const [msgPwd, setMsgPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdDiv, setShowPwdDiv] = useState(false);
  const inputPwd = useRef();
  const phoneCertifiDiv = useRef();

  function toggleShowPwd() {
    setShowPwd(!showPwd);
  }

  function inputPwdChange() {
    // console.log(inputPwd);
    if(inputPwd.current.value === '') {
      setShowPwdDiv(false);
    } else {
      setShowPwdDiv(true);
    }
  }

  function inputPwdChangeRegex() {
    const pwdRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/;
    if(inputPwd.current.value === '') {
      inputPwd.current.message = '필수 작성 칸 입니다.'
      console.log('유효성검사 null');
      return false;
    } else if (pwdRegex.test(inputPwd.current.value)) {
      inputPwd.current.message = '8~20 글자의 소문자+숫자+특수문자 조합으로 입력해주세요.'
      console.log('유효성검사 성공');
      return {...register('pwd')};
      // return true;
    } else {
      console.log('유효성 검사 실패');
      return false;
    }
  }

  function phoneCertifiRequest() {
    phoneCertifiDiv.current.style.visibility = 'visible';
    phoneCertifiDiv.current.children[0].focus();
    phoneCertifiDiv.current.children[2].disabled = false;
  }

  // react hook form 사용
  // isSubmitting => form submit 실행 중이지를 체크, 연속 클릭 방지
  const {register, handleSubmit, formState: { isSubmitting, errors }} = useForm();
  // const {register, handleSubmit, formState, reset} =  useForm();

  const onSubmit = data => console.log(data);

  // useEffect(() => {
  //   console.log('1', errors.pwd);
  // }, [errors.pwd])
  console.log(errors.pwd);

  // {...register('pwd', {
  //   required: '필수 작성 칸 입니다.',
  //   pattern: {
  //     value: /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
  //     message: '8~20 글자의 소문자+숫자+특수문자 조합으로 입력해주세요.',
  //   }
  // })} 
  



  return (
    <Container fluid style={h100}>
      <Row style={h100}>
        <Col style={mid}>
            <form className="form-floating" style={{maxWidth: '450px', margin: 'auto', border: '1px solid black', paddingBottom: '2rem'}} onSubmit={handleSubmit(onSubmit)} >
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
                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    {/* <input type="text" name='id' className="form-control" id="floatingInputId" placeholder="아이디" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} /> */}
                    <input type="text" name='id' className="form-control" id="floatingInputId" placeholder="아이디" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='10'
                    {...register('id', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        value: /^[a-z][a-z0-9]{4,9}$/g,
                        message: '5~10 글자의 소문자, 숫자로 입력해주세요.',
                      }
                    })} />
                    <label htmlFor="floatingInputId" style={{padding: '0.5rem 0.75rem'}} >아이디</label>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* {errors.id && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.id.message}</small>} */}
                  {errors.id ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.id.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>5~10 글자의 소문자, 숫자로 입력해주세요.</small>}
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}} >
                    {/* <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" /> */}
                    <input type="text" name='name' className="form-control" id="floatingInputName" placeholder="사용자 이름" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='10'
                    {...register('name', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        value: /^[가-힣a-zA-Z]{2,10}$/g,
                        message: '10글자 이하로 입력하여주세요.',
                      }
                    })} />
                    <label htmlFor="floatingInputName" style={{padding: '0.5rem 0.75rem'}}>사용자 이름</label>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* {errors.name && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.name.message}</small>} */}
                  {errors.name ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.name.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>10글자 이하로 입력하여주세요.</small> }
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    <input type={showPwd ? "text" : "password"} name='pwd' className="form-control" id="floatingInputPassword" placeholder="비밀번호" ref={inputPwd} style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='20'
                    onChange={() => {
                      inputPwdChangeRegex();
                      inputPwdChange();
                    }} />
                    <label htmlFor="floatingInputPassword" style={{padding: '0.5rem 0.75rem'}} >비밀번호</label>
                    <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}>
                        <button type='button' onClick={() => toggleShowPwd()} style={{padding: '0px', backgroundColor: 'white', border: 'none', position: 'absolute', top: '0.5rem', right: '0.75rem'}} >{showPwd ? "표시" : "숨기기"}</button>
                    </div>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* {errors.pwd && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.pwd.message}</small>} */}
                  {/* {errors.pwd ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.pwd.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>8~20 글자의 소문자+숫자+특수문자 조합으로 입력해주세요.</small>} */}
                  {errors.pwd ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.pwd.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>8~20 글자의 소문자+숫자+특수문자 조합으로 입력해주세요.</small>}
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    <input type="email" name='email' className="form-control" id="floatingInputEmail" placeholder="name@example.com" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='100'
                    {...register('email', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        // eslint-disable-next-line no-useless-escape
                        value: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/,
                        message: 'exam@exam.com, 형식에 맞게 입력해주세요.',
                      }
                    })} />
                    <label htmlFor="floatingInputEmail" style={{padding: '0.5rem 0.75rem'}} >이메일 주소</label>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* {errors.email && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.email.message}</small>} */}
                  {errors.email ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.email.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>exam@exam.com, 형식에 맞게 입력해주세요.</small> }
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    <input type="tel" name='phone' className="form-control" id="floatingInputPhone" placeholder="010-0000-0000" style={{height: '40px', padding: '0.7rem 0.75rem 0', width: '80%', display: 'inline'}} maxLength='15'
                    {...register('phone', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        value: /^\d{3}-\d{3,4}-\d{4}$/,
                        message: '000-0000-0000, 형식에 맞게 입력해주세요.',
                      }
                    })} />
                    <label htmlFor="floatingInputPhone" style={{padding: '0.5rem 0.75rem'}} >핸드폰 번호</label>
                    <Button onClick={() => phoneCertifiRequest()} style={{width: '18%', height: '40px', position: 'relative', top: '-8px', fontSize: '0.8rem', padding: '0px', marginLeft: '5px'}}>요청</Button>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {errors.phone && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.phone.message}</small>}
                  {/* {errors.phone ? <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.phone.message}</small> : <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>000-0000-0000, 형식에 맞게 입력해주세요.</small>} */}
                </div>

                <div className="form-floating" ref={phoneCertifiDiv} style={{maxWidth: '260px', margin: 'auto', height: '40px', visibility: 'hidden'}}>
                    <input type="text" name='phoneCertifi' className="form-control" id="floatingInputCertifiNum" placeholder="000000" style={{height: '40px', padding: '0.7rem 0.75rem 0', width: '80%', display: 'inline'}} maxLength='10' />
                    <label htmlFor="floatingInputCertifiNum" style={{padding: '0.5rem 0.75rem'}} >인증번호</label>
                    <Button disabled style={{width: '18%', height: '40px', position: 'relative', top: '-8px', fontSize: '0.8rem', padding: '0px', marginLeft: '5px'}}>인증</Button>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* 인증 완료 문구 넣을 예정 */}
                  {/* {errors.phone && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.phone.message}</small>} */}
                </div>

                <div style={{marginBottom: '1rem'}}>
                    <p style={{fontSize: '0.8rem', color: '#777', maxWidth: '260px', margin: 'auto'}}>
                        <span>저희 서비스를 이용하는 사람이 회원님의 연락처 정보를 Instagram에 업로드했을 수도 있습니다. </span>
                        {/* a 태그 및 target blank 사용 시 url 변조의 위험이 있기 때문에 rel="noreferrer" 속성을 추가해서 링크 말고는 아무것도 못하게 막는다. */}
                        <a href='https://www.facebook.com/help/instagram/261704639352628' target='_blank' rel="noreferrer" style={{textDecoration: 'none'}}>더 알아보기</a>
                    </p>
                </div>
                <div>
                    {/* <Button style={{width: '260px'}}>가입</Button> */}
                    <Button type="submit" style={{width: '260px'}} disabled={isSubmitting ? true : false}>가입</Button>
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
