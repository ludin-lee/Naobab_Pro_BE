const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/loggers');
const { loginRequestSchema } = require('../utils/auth.validation');
const AuthService = require('../services/auth.service.js');

class AuthController {
  constructor() {
    this.authService = new AuthService(bcrypt, jwt);
  }

  //이메일 중복 체크
  checkId = async (req, res, next) => {
    try {
      const { email } = req.body;
      const checkId = await this.authService.checkId(email);

      return res
        .status(201)
        .json({ result: true, messeage: '이메일 중복 체크 성공' });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '이메일 중복 체크에 실패하였습니다.',
      });
    }
  };
  //닉네임 중복 체크
  checkNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;
      const checkNickname = await this.authService.checkNickname(nickname);

      return res
        .status(201)
        .json({ result: true, messeage: '닉네임 중복 체크 성공' });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '닉네임 중복 체크에 실패하였습니다.',
      });
    }
  };
  //회원가입
  signup = async (req, res, next) => {
    try {
      const { email, nickname, password } = req.body;

      if (req.file === undefined) {
        req.file = {};
        req.file.location =
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
      }

      const profileImg = req.file.location;

      await this.authService.signup(email, nickname, password, profileImg);

      return res.status(201).json({ result: true, messeage: '회원가입 성공' });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '회원가입에 실패했습니다.',
      });
    }
  };
  //로그인
  login = async (req, res, next) => {
    try {
      const { email, password } = await loginRequestSchema.validateAsync(
        req.body,
      );
      const accessToken = await this.authService.login(email, password); // 토큰 받아오기

      res.header('token', `Bearer ${accessToken}`);
      return res
        .status(200)
        .json({ result: true, message: '로그인 성공', token: accessToken });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '로그인에 실패했습니다.',
      });
    }
  };
}

module.exports = AuthController;
