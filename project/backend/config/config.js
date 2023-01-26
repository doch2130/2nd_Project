const dotenv = require('dotenv');

dotenv.config();

async function smsEnv(key, defaultValue = undefined) {
  // console.log(process.env[key]);
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

// console.log(process.env.NCP_SENS_ACCESS);
// console.log(smsEnv('NCP_SENS_ACCESS'));
// console.log(process.env['NCP_SENS_SECRET']);

module.exports = {
  sens: {
    accessKey: smsEnv('NCP_SENS_ACCESS'),
    secretKey: smsEnv('NCP_SENS_SECRET'),
    serviceId: smsEnv('NCP_SENS_ID'),
    callNumber: smsEnv('NCP_SENS_NUMBER'),
  },
};
