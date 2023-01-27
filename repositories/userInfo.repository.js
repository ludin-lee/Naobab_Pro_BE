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
    if (profileImg !== null)
      await this.userModel.update(
        { profileImg, nickname },
        { where: { userId } },
      );
    else await this.userModel.update({ nickname }, { where: { userId } });
  };

  //비밀번호 변경
  updatePassWord = async (userId, changePassword) => {
    await this.userModel.update(
      { password: changePassword },
      { where: { userId } },
    );
  };

  //회원탈퇴
  unregisterUser = async (userId) => {
    await this.userModel.destroy({ where: { userId } });
  };

  //닉네임으로 회원정보 조회
  findUserNickname = async (nickname) => {
    return await this.userModel.findOne({
      where: { nickname },
      attributes: {
        exclude: [
          'email',
          'password',
          'social',
          'provider',
          'createdAt',
          'updatedAt',
        ],
      },
    });
  };
}

module.exports = UserInfoRepository;
