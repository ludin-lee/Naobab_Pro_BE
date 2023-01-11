class UserInfoRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  //기본 정보 조회
  findUserBasicInfo = async (userId) => {
    return await this.userModel.findOne({
      where: { userId },
      attributes: { exclude: ['password', 'social', 'provider'] },
    });
  };
  //상세 정보 조회
  findUserInfo = async (userId) => {
    return await this.userModel.findOne({ where: { userId } });
  };
  //회원정보 수정
  updateUser = async (userId, profileImg, nickname) => {
    await this.userModel.update(
      { profileImg, nickname },
      { where: { userId } },
    );
  };

  //비밀번호 변경
  updatePassWord = async (userId, changePassword) => {
    await this.userModel.update(
      { password: changePassword },
      { where: { userId } },
    );
  };

  //회원탈퇴
  unregisterUSer = async (userId) => {
    await this.userModel.destroy({ where: { userId } });
  };
}

module.exports = UserInfoRepository;
