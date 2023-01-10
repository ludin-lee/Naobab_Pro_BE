const { ValidationError } = require('sequelize');
const { Users } = require('../models');
const UserInfoRepository = require('../repositories/userInfo.repository');

class UserInfoService {
  userInfoRepository = new UserInfoRepository(Users);

  //회원정보 수정
  updateUser = async (userId, profileImg, nickname) => {
    // console.log(image);
    if (!profileImg || !nickname)
      throw new ValidationError('모든 항목을 입력해주세요');

    await this.userInfoRepository.updateUser(userId, profileImg, nickname);
  };

  //비밀번호 변경
  updatePassWord = async (userId, currentPassword, changePassword) => {
    await this.userInfoRepository.updatePassWord(userId, changePassword);
  };

  //회원탈퇴
  unregisterUSer = async (userId, currentPassword) => {
    if (!userId) {
      throw new ValidationError('유저가 존재하지 않습니다.');
    }
    if (currentPassword !== currentPassword) {
      throw new ValidationError('비밀번호가 일치하지 않습니다.');
    }
    await this.userInfoRepository.unregisterUSer(
      { currentPassword },
      { where: { userId } },
    );
  };
}

module.exports = UserInfoService;
