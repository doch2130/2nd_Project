const express = require('express');
const controllerUser = require('../controller/Cuser');
const controllerLoginStatus = require('../controller/loginStatus');
const controllerPostData = require('../controller/postDataList');

const router = express.Router();

const { ImageFileHandler } = require('../middle/multer');

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
  // eslint-disable-next-line comma-dangle
  controllerUser.registerCertificationCheck
);

// 토큰 인증 검사
router.post('/tokenAuth', controllerUser.tokenAuth);

// 로그아웃
router.post('/logout', controllerUser.logout);

// 회원탈퇴
router.post('/unregister', controllerUser.unRegister);

// 포스트 데이터 불러오기 (기본 값 5개)
router.post('/post/data', controllerPostData.defaultData);

// 포스트 데이터 추가하기 (테스트용)
router.post('/post/data/add', controllerPostData.testAddData);
router.post(
  '/post/data/add2',
  ImageFileHandler('postImage').single('postImage'),
  controllerPostData.postAdd
);

module.exports = router;
