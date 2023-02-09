const ChatRepository = require('../repositories/chat.repository');
const DiaryRepository = require('../repositories/diary.repository');
const { Chats, Diaries, Users } = require('../models');
const {
  ValidationError,
  AuthorizationError,
} = require('../exceptions/index.exception');

class ChatService {
  chatRepository = new ChatRepository(Chats, Users);
  diaryRepository = new DiaryRepository(Diaries);
  //대화내용 호출
  showChat = async (diaryId, userId, page) => {
    const room = await this.diaryRepository.exDiary(diaryId);
    const audienceId = room.userId === userId ? room.invitedId : room.userId;

    if (!room) throw new ValidationError('존재하지 않는 대화창입니다.');
    if (room.userId !== userId && room.invitedId !== userId)
      throw new AuthorizationError('권한이 없습니다');

    const chatInfo = await this.chatRepository.showChat(diaryId, page);
    const isLast = chatInfo.length === 0 ? false : true;

    chatInfo.audienceId = audienceId;

    return { chatInfo, isLast };
  };
}

module.exports = ChatService;
