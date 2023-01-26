const express = require('express');

const router = express.Router();
// const { isAuth } = require('../middlewares');
const { sendVerificationSMS } = require('../controller/naverSensUtill');

// 네이버 SMS API 인증 요청
router.get('/message/code', sendVerificationSMS);
// router.get('/message/code', isAuth, sendVerificationSMS);

module.exports = router;
