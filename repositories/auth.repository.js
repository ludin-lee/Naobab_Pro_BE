class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  //이메일 중복 체크
  checkId = async (email) => {
    return await this.usersModel.findOne({ where: { email } });
  };

  // 닉네임 중복 체크
  checkNickname = async (nickname) => {
    return await this.usersModel.findOne({ where: { nickname } });
  };

  //회원가입
  signup = async (email, nickname, hashedPassword, profileImg) => {
    await this.usersModel.create({
      email,
      nickname,
      password: hashedPassword,
      profileImg,
    });
  };

  //로그인 정보와 DB 정보 일치 여부 확인
  login = async (email) => {
    return await this.usersModel.findOne({ where: { email } });
  };
}

module.exports = AuthRepository;
