const crypto = require('crypto');
const { User } = require('../model/index');
const { Op } = require('sequelize');

const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });
}

exports.createHashedPassword = (plainPassword) => {
    return new Promise( async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9304, 64, 'sha512', (err, key) => {
            if (err) reject(err);

            resolve({ password: key.toString('base64'), salt });
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

        if(salt) {
            // console.log('salt', salt);
            const pwsalt = salt.pwsalt;
            // console.log(saltTest);
            // console.log(plainPassword);
            
            // 위에서 가져온 salt와 plainPassword를 다시 해시 암호화 시킴. (비교하기 위해)
            crypto.pbkdf2(plainPassword, pwsalt, 9304, 64, 'sha512', (err, key) => {
                if (err) reject(err);

                resolve(key.toString('base64'));
            });

        } else {
            resolve('notFound');
        }
    });
}
