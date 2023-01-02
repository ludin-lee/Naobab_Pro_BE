const { Users } = require('../models');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const logger = require('../config/loggers');

// authorization에 토큰 유무 확인
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (!authorization) {
      return res
        .status(401)
        .json({ error: '로그인 후 이용 가능한 기능입니다.' });
    }

    // 해당하는 jwt 가 유효한가에 대한 검증과 복호화
    const { userId } = jwt.verify(tokenValue, SECRET_KEY);
    Users.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(401).json({ error: '로그인 후 이용 가능한 기능입니다.' });
  }
};
