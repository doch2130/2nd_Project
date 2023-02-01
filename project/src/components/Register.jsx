import React from 'react';
import { useState, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Footer from './Footer';

export default function Register() {
  const h100 = {
    height: '100%',
  }
  const mid = {
    margin: 'auto',
    textAlign: 'center'
  }

  const navigate = useNavigate();

  const [showPwd, setShowPwd] = useState(false);
  const inputPwd = useRef();
  const phoneDiv = useRef();
  const phoneCertifiDiv = useRef();

  const [count, setCount] = useState(300);
  const [isStart, setIsStart] = useState(false);
  const [repeat, setRepeat] = useState();
  const [isReStart, setIsReStart] = useState(false);

  const certifiResult = useRef();
  const [iscertifiResult, setIscertifiResult] = useState(false);


  
  const isLogin = useSelector((state) => state.loginStatus.isLogin);
  // 임시 방편, 로그인 시 다시 리다이렉트
  useEffect(() => {
    if(isLogin) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // count 1번, count 2번 toggle 실행 함수
  const toggleStart = () => {
    // console.log( "toggleStart : ", isStart );
    if ( isStart ) {
      setIsStart( false );
      setIsReStart( true );
    } else {
      setIsStart( true );
      setIsReStart( false );
    }
  }

  // count 함수 1번 - 2번 이랑 번갈아 실행
  useEffect(() => {
    if ( isStart ) {
      const countInterval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
      setRepeat(countInterval);
    } else {
      clearInterval(repeat);
      setCount(300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart]);

  // count 함수 2번 - 1번 이랑 번갈아 실행
  useEffect(() => {
    if(isReStart) {
      const countInterval = setInterval(() => {
        setCount(count => count - 1);
      }, 1000);
      setRepeat(countInterval);
    } else {
      clearInterval(repeat);
      setCount(300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReStart]);

  // 카운트 0초 되면 인터벌 초기화
  useEffect(() => {
    if (count <= 0) {
      clearInterval(repeat);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);


  // 비밀번호 표시, 숨기기
  function toggleShowPwd() {
    setShowPwd(!showPwd);
  }

  // 인증번호 요청 함수
  async function phoneCertifiRequest() {
    // console.log(getValues('phone'));
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

    if(phoneRegex.test(getValues('phone'))) {
      const chooseMsg = window.confirm('해당 번호로 발송하시겠습니까?');

      if(chooseMsg) {
        const response = await axios.post('/register/certification', {
          phone: getValues('phone')
        });

        if(response.data === 'already_join_phone') {
          alert('이미 가입한 핸드폰 번호입니다.');
        } else {
          phoneCertifiDiv.current.children[0].disabled = false;
          phoneCertifiDiv.current.children[2].disabled = false;
          phoneCertifiDiv.current.children[0].value = '';
          phoneCertifiDiv.current.children[0].focus();
          toggleStart();
        }
      }

    } else {
      alert('핸드폰 번호 양식에 맞게 입력해주세요.');
    }
  }


  // 인증번호 일치 확인 함수
  async function phoneCertifiResult() {
    const response = await axios.post('/register/certification/Check', {
      phone: getValues('phone')
    });

    if(String(response.data) === certifiResult.current.value) {
      alert('인증번호가 일치합니다.');
      // 성공하면 인터벌 초기화 및 false
      setIsStart( false );
      setIsReStart( false );
      setIscertifiResult(true);
      // 성공하면 phone 번호 변경 불가능하게 disabled 설정
      phoneDiv.current.children[0].disabled = true;
      phoneDiv.current.children[2].disabled = true;
    } else if (count <= 0) {
      alert('인증번호가 만료되었습니다. 다시 요청해주세요.');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  }



  // react hook form 사용
  // isSubmitting => form submit 실행 중이지를 체크, 연속 클릭 방지
  // getValues => 이벤트 조건 해당 시 값 가져오기 (pwd 기준, 빈 값, 1글자 입력, 정규식 조건 충족)
  // mode => 기본: submit 실행시에만 발동, onChange 모드로 변경 가능
  const {getValues, register, handleSubmit, formState: { isSubmitting, errors }} = useForm({mode: 'onChange'});
  
  // react hook form submit 함수
  // 회원가입 양식 제출
  const onSubmit = async (data) => {
    if(iscertifiResult) {
      const response = await axios.post('http://localhost:4000/register/complete', {
        id: data.id,
        name: data.name,
        pwd: data.pwd,
        phone: data.phone,
        email: data.email,
      });

      // console.log(response);

      if(response.data === 'id_duplicate') {
        alert('중복된 아이디입니다.');
      } else if (response.data === 'phone_duplicate') {
        alert('중복된 전화번호입니다.');
      } else if (response.data === 'email_duplicate') {
        alert('중복된 이메일입니다.');
      } else if (response.data === true) {
        alert('회원가입에 성공하였습니다.');
        navigate('/login');
      } else {
        alert('실패');
      }
    } else {
      alert('핸드폰 인증을 완료해주세요.');
    }
  }

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
                  {errors.id && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.id.message}</small>}
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}} >
                    {/* <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" /> */}
                    <input type="text" name='name' className="form-control" id="floatingInputName" placeholder="사용자 이름" style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='10'
                    {...register('name', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        value: /^[가-힣a-zA-Z]{2,10}$/g,
                        message: '2~10 글자로 입력해주세요.',
                      }
                    })} />
                    <label htmlFor="floatingInputName" style={{padding: '0.5rem 0.75rem'}}>사용자 이름</label>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {errors.name && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.name.message}</small>}
                </div>

                <div className="form-floating" style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    <input type={showPwd ? "text" : "password"} name='pwd' className="form-control" id="floatingInputPassword" placeholder="비밀번호" ref={inputPwd} style={{height: '40px', padding: '0.7rem 0.75rem 0'}} maxLength='20'
                    {...register('pwd', {
                      required: '필수 작성 칸 입니다.',
                      pattern: {
                        value: /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
                        message: '8~20 글자의 소문자+숫자+특수문자 조합으로 입력해주세요.',
                      }
                    })} 
                    />
                    <label htmlFor="floatingInputPassword" style={{padding: '0.5rem 0.75rem'}} >비밀번호</label>
                    {/* <div style={showPwdDiv ? {display: 'inline'} : {display: 'none'}}> */}
                    <div style={getValues('pwd') ? {display: 'inline'} : {display: 'none'}}>
                        <button type='button' onClick={() => toggleShowPwd()} style={{padding: '0px', backgroundColor: 'white', border: 'none', position: 'absolute', top: '0.5rem', right: '0.75rem'}} >{showPwd ? "숨기기" : "표시"}</button>
                    </div>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {errors.pwd && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.pwd.message}</small>}
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
                  {errors.email && <small role="alert" style={{color: 'red', fontWeight: '700', fontSize: '0.8rem'}}>{errors.email.message}</small>}
                </div>

                <div className="form-floating" ref={phoneDiv} style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
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
                </div>

                <div className="form-floating" ref={phoneCertifiDiv} style={{maxWidth: '260px', margin: 'auto', height: '40px'}}>
                    <input ref={certifiResult} disabled={!isStart && !isReStart} type="text" name='phoneCertifi' className="form-control" id="floatingInputCertifiNum" placeholder="000000" style={{height: '40px', padding: '0.7rem 0.75rem 0', width: '80%', display: 'inline'}} maxLength='10' />
                    <label htmlFor="floatingInputCertifiNum" style={{padding: '0.5rem 0.75rem'}} >인증번호</label>
                    {/* disalbed 를 ||로 하면 onclick 이벤트가 실행이 안되고, &&로 하면 실행이 된다.
                    그리고 &&로 해도 || 랑 동일한 결과가 나온다. 왜인지 이해가 안간다....*/}
                    <Button disabled={!isStart && !isReStart} onClick={() => phoneCertifiResult()} style={{width: '18%', height: '40px', position: 'relative', top: '-8px', fontSize: '0.8rem', padding: '0px', marginLeft: '5px'}} >인증</Button>
                </div>
                <div style={{height: '20px', marginBottom: '5px'}}>
                  {/* 인증번호 시간 표시 - 함수 2개 번갈아가면서 실행 */}
                  {isStart && <small style={{fontSize: '0.75rem', fontWeight: '700'}} >{count}초 이내에 입력해주세요.</small>}
                  {isReStart && <small style={{fontSize: '0.75rem', fontWeight: '700'}} >{count}초 이내에 입력해주세요.</small>}
                  {/* 인증번호 실패 및 성공 문구 */}
                  {iscertifiResult && <small style={{fontSize: '0.75rem', fontWeight: '700'}} >인증번호가 일치합니다.</small>}
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
        
        <Footer />
      </Row>
    </Container>
  )
}
