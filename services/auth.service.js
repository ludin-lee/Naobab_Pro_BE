const bcrypt = require('bcryptjs');
const { SECRET_KEY, SECRET_SUM, PASSWORD_SALT } = process.env;
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const {
  ValidationError,
  DuplicateError,
  BadRequestError,
  NotFoundError,
} = require('../exceptions/index.exception');
const AuthRepository = require('../repositories/auth.repository');

class AuthService {
  authRepository = new AuthRepository(Users);

  //중복 이메일 체크
  checkId = async (email) => {
    const checkId = await this.authRepository.checkId(email);

    if (checkId) throw new ValidationError('이미 사용중인 이메일 입니다.');
    else return true;
  };

  //중복 닉네임 체크
  checkNickname = async (nickname) => {
    const nicknameVal = await this.authRepository.checkNickname(nickname);

    if (nicknameVal) throw new ValidationError('이미 사용중인 닉네임 입니다.');
    else return true;
  };

  //회원가입
  signup = async (email, nickname, password, profileImg) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(PASSWORD_SALT)); //비밀번호 암호화

    const isExistEmail = await this.authRepository.checkId(email);
    if (isExistEmail) throw new DuplicateError('이미 사용중인 이메일입니다.');

    const isExistNickname = await this.authRepository.checkNickname(nickname);
    if (isExistNickname)
      throw new DuplicateError('이미 사용중인 닉네임입니다.');

    if (!email || !nickname || !password)
      throw new ValidationError('필수 항목을 입력해주세요');

    await this.authRepository.signup(
      email,
      nickname,
      hashedPassword,
      profileImg,
    );
  };

  //로그인
  login = async (email, password) => {
    const loginVal = await this.authRepository.login(email);
    if (loginVal === null)
      throw new ValidationError('이메일 또는 패스워드를 확인해주세요.');
    if (loginVal.social !== true) {
      const checkPassword = await bcrypt.compare(password, loginVal.password);
      if (!checkPassword)
        throw new ValidationError('이메일 또는 패스워드를 확인해주세요.');
    } else
      throw new BadRequestError('해당 아이디는 소셜로그인으로 시도해주세요.');

    const accessToken = jwt.sign(
      {
        userId: loginVal.userId + parseInt(SECRET_SUM),
        email: loginVal.email,
        nickname: loginVal.nickname,
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    );
    return accessToken;
  };
}

module.exports = AuthService;
