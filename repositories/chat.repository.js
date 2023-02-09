const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class ChatRepository {
  constructor(ChatsModel, UsersModel) {
    this.chatsModel = ChatsModel;
    this.usersModel = UsersModel;
  }
  //대화내용 불러오기
  showChat = async (diaryId, page) => {
    return await this.chatsModel.findAll({
      include: [
        {
          model: this.usersModel,
          attributes: ['profileImg', 'nickname'],
        },
      ],
      where: { diaryId },
      order: [['ChatId', 'DESC']],
      limit: 10,
      offset: 10 * (page - 1),
    });
  };

  showLastChat = async (diaryId) => {
    const chat = await this.chatsModel.findAll({
      include: [
        {
          model: this.usersModel,
          attributes: ['profileImg', 'nickname'],
        },
      ],
      where: { diaryId },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    return chat[0];
  };
}

module.exports = ChatRepository;
