const crypto = require('crypto');
const { User } = require('../model/index');
const { Op } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env',
});

// Salt 생성
const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });
}

// User 비밀번호 + Salt로 암호화
exports.createHashedPassword = (plainPassword) => {
    return new Promise( async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9304, 64, 'sha512', (err, key) => {
            if (err) reject(err);

            resolve({ password: key.toString('base64'), salt });
        });
    });
}

// 임시용 Refresh Token 암호화
exports.createRefreshToken = (userId) => {
    return new Promise( async (resolve, reject) => {
        const secret = process.env.JWT_TOKEN_SECRET;
        crypto.pbkdf2(userId, secret, 9304, 64, 'sha512', (err, key) => {
            if (err) reject(err);

            // base64로 넘겨서 mysql에 저장하면 varchar 형식을 사용하지 못하고
            // bolb, text 형식을 사용해야 한다. 그러나 2개 형식은 primary key 설정이 안되고,
            // MySQL에서 좋은 형식은 아니라고 해서 base64 인코딩 한거 맨뒤에 임의 문자를 붙여서
            // Varchar 형식으로 저장이 되게 설정하였습니다.
            const data = key.toString('base64') + 'txet';
            resolve(data);
        });
    });
}

// 로그인을 위한 디코딩 작업
exports.makePasswordHashed = (userId, plainPassword) => {
    return new Promise( async (resolve, reject) => {
        // userId인자로 해당 유저 salt를 가져오는 부분
        const salt = await User.findOne({
            attributes: ['pwsalt'],
            raw: true,
            where: {
                [Op.or]: [
                    {id: userId},
                    {phone: userId},
                    {email: userId},
                ],
            },
        });

        // 일치하는 ID 없으면 notFound Return
        if(!salt) {
            return resolve('notFound');
        }

        const pwSalt = salt.pwsalt;
        
        // 위에서 가져온 salt와 plainPassword를 다시 해시 암호화 시킴. (비교하기 위해)
        crypto.pbkdf2(plainPassword, pwSalt, 9304, 64, 'sha512', (err, key) => {
            if (err) reject(err);

            resolve(key.toString('base64'));
        });

    });
}
