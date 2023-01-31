const express = require('express');
const controllerUser = require('../controller/Cuser');
const controllerStatus = require('../controller/status');

const router = express.Router();

const { sendVerificationSMS } = require('../controller/naverSensUtill');

// 나중에 post로 변경하면 됨
// 네이버 SMS API 인증 요청
router.get('/message/code', sendVerificationSMS);
// router.get('/message/code', isAuth, sendVerificationSMS);

// 로그인
router.post('/login', controllerUser.login);

// 회원가입
router.post('/register/complete', controllerUser.register);

// 회원가입 문자 인증
router.post('/register/certification', controllerUser.registerCertification);

router.post(
  '/register/certification/Check',
  controllerUser.registerCertificationCheck
);

router.post('/test', controllerUser.test);

router.post('/auth/login', controllerStatus.loginStatus);

module.exports = router;
