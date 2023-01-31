const express = require('express');
const controllerUser = require('../controller/Cuser');
const controllerLoginStatus = require('../controller/loginStatus');

const router = express.Router();

// const { sendVerificationSMS } = require('../controller/naverSensUtill');
// 나중에 post로 변경하면 됨
// 네이버 SMS API 인증 요청
// router.get('/message/code', sendVerificationSMS);
// router.get('/message/code', isAuth, sendVerificationSMS);

// 로그인 Status 체크
router.post('/auth/login', controllerLoginStatus.loginStatus);

// 로그인
router.post('/login', controllerUser.login);

// 회원가입
router.post('/register/complete', controllerUser.register);

// 회원가입 문자 인증 요청
router.post('/register/certification', controllerUser.registerCertification);

// 회원가입 문자 인증 일치 검사
router.post(
  '/register/certification/Check',
  controllerUser.registerCertificationCheck
);

// 토큰 인증 검사
router.post('/tokenAuth', controllerUser.tokenAuth);

// 로그아웃
router.post('/logout', controllerUser.logout);

// 회원탈퇴
router.post('/unregister', controllerUser.unRegister);

module.exports = router;
