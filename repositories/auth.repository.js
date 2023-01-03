const { Users } = require('../models');

class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  //이메일 중복 체크
  checkId = async (email) => {
    const emailVal = await this.usersModel.findOne({ where: { email } });
    return emailVal;
  };

  // 닉네임 중복 체크
  checkNickname = async (nickname) => {
    const nicknameVal = await this.usersModel.findOne({ where: { nickname } });

    return nicknameVal;
  };

  //회원가입
  signup = async (email, nickname, hashedPassword, profileImg) => {
    const signupCreate = await this.usersModel.create({
      email,
      nickname,
      password: hashedPassword,
      profileImg,
    });
  };

  //로그인 정보와 DB 정보 일치 여부 확인
  login = async (email) => {
    const loginVal = await this.usersModel.findOne({ where: { email } });
    return loginVal;
  };
}

module.exports = AuthRepository;
