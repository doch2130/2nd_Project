const express = require('express');
const controllerUser = require('../controller/Cuser');

const router = express.Router();
// const { isAuth } = require('../middlewares');
const { sendVerificationSMS } = require('../controller/naverSensUtill');

// 나중에 post로 변경하면 됨
// 네이버 SMS API 인증 요청
router.get('/message/code', sendVerificationSMS);
// router.get('/message/code', isAuth, sendVerificationSMS);

// 로그인
router.post('/login', controllerUser.login);

// 회원가입
router.post('/register/complete', controllerUser.register);

module.exports = router;
