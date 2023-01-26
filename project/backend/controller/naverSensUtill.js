const CryptoJS = require('crypto-js');
const axios = require('axios');
const { sens } = require('../config/config');

function RandomNumber() {
  // min ~ max 사이의 임의의 정수 반환
  return Math.floor(Math.random() * (999999 - 100000)) + 100000;
}

module.exports = {
  sendVerificationSMS: async (req, res) => {
    try {
      // SMS 수신할 연락처
      // 한국, 핸드폰 가능
      const tel = '010-9192-5745';
      const userPhoneNumber = tel.split('-').join('');
      // 인증 코드 (랜덤 6자리 숫자)
      const verificationCode = RandomNumber();
      // console.log('랜덤코드', verificationCode);
      // 날짜 string
      const date = Date.now().toString();

      // env 파일에서 데이터를 가져오는 도중에 비동기라서 promise로 걸려있어서
      // 이후에 데이터를 제대로 읽지 못하는 현상이 발견되어
      // 데이터를 각 변수에 저장할 때 await를 적용하여 데이터가 정상적으로 적용될 수 있도록 하였습니다.
      // 환경 변수
      const sensServiceId = await sens.serviceId;
      const sensAccessKey = await sens.accessKey;
      const sensSecretKey = await sens.secretKey;
      const sensCallNumber = await sens.callNumber;

      // awiat를 안쓰면 Promise {} 로 데이터가 걸려있어서 이후 CryptoJS에서 Type Error가 발생하는 것을 확인 할 수 있습니다.
      // console.log('sensSecretKey', typeof sensSecretKey);

      // 기본 API 설정 정보 (method만 get에서 post로 변경)
      // url 관련 변수 선언
      const method = 'POST';
      const space = ' ';
      const newLine = '\n';
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sensServiceId}/messages`;
      // 도메인 뒷부분은 암호화 작업이 필요하여 url2로 한 번더 작성
      const url2 = `/sms/v2/services/${sensServiceId}/messages`;

      // signature 작성 : crypto-js 모듈을 이용하여 암호화
      // console.log(1);

      const hmac = CryptoJS.algo.HMAC.create(
        CryptoJS.algo.SHA256,
        // eslint-disable-next-line comma-dangle
        sensSecretKey
      );

      // console.log('hmac', hmac);

      // console.log(2);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      // console.log(sensAccessKey);
      hmac.update(sensAccessKey);
      const hash = hmac.finalize();
      // console.log(4);
      const signature = hash.toString(CryptoJS.enc.Base64);
      // console.log(5);

      // sens 서버로 요청 전송
      const smsRes = await axios({
        method,
        url,
        headers: {
          'Contenc-type': 'application/json; charset=utf-8',
          'x-ncp-iam-access-key': sensAccessKey,
          'x-ncp-apigw-timestamp': date,
          'x-ncp-apigw-signature-v2': signature,
        },
        data: {
          type: 'SMS',
          countryCode: '82',
          from: sensCallNumber,
          content: `인증번호는 [${verificationCode}] 입니다.`,
          messages: [{ to: `${userPhoneNumber}` }],
        },
      });
      console.log('response', smsRes.data);
      return res.status(200).json({ message: 'SMS sent' });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: 'SMS not sent' });
    }
  },
};
