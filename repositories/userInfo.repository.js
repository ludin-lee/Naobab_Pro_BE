const { Users } = require('../models');
const { Sequelize } = require('sequelize');

class UserInfoRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }
  //회원정보 수정
  updateUser = async (userId, profileImg, nickname) => {
    await this.userModel.update({ nickname }, { where: { userId } });
  };

  //비밀번호 변경
  updatePassWord = async (userId, changePassword) => {
    // console.log(changePassword);
    await this.userModel.update(
      { password: changePassword },
      { where: { userId } },
    );
  };

  //회원탈퇴
  unregisterUSer = async (userId, currentPassword) => {
    await this.userModel.destroy({ currentPassword }, { where: { userId } });
  };
}

module.exports = UserInfoRepository;
