# START
npm start

# SETTING

# backend/config/.env.js
# Server Port
PORT=4000

# Naver SMS API
NCP_SENS_ACCESS=-
NCP_SENS_SECRET=-
NCP_SENS_ID=ncp:sms:kr:000000000000:xxxx
NCP_SENS_NUMBER=00000000000

# Cloude Redis
REDIS_HOST=redis-xxxxx-xxx.ec2.cloud.redislabs.com
# REDIS_PORT=10790
REDIS_PORT=0000
REDIS_USERNAME=xxxxxx
REDIS_PASSWORD=xxxxxxxxx

# session, cookie secret
COOKIE_SECRET=cookieSecret

# JWT Token
JWT_TOKEN_SECRET=jwt
JWT_ISSUER=test
JWT_ALGORITHM=HS256
ACCESS_TOKEN_SECRET=AccessJWT
REFRESH_TOKEN_SECRET=RefreshJWT

# Server Ip
LOCAL_HOST=http://localhost:3000
NAVER_HOST=http://0.0.0.0:3000
AWS_HOST=http://0.0.0.0:3000
