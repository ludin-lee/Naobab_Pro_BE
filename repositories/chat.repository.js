const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class ChatRepository {
  constructor(ChatsModel, UsersModel) {
    this.chatsModel = ChatsModel;
    this.usersModel = UsersModel;
  }
  //대화내용 불러오기
  showChat = async (diaryId) => {
    return await this.chatsModel.findAll({
      include: [
        {
          model: this.usersModel,
          attributes: ['profileImg', 'nickname'],
        },
      ],
      where: { diaryId },
      order: [['createdAt', 'DESC']],
    });
  };
}

module.exports = ChatRepository;
