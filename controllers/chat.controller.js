const ChatService = require('../services/chat.service');
const SECRET_SUM = parseInt(process.env.SECRET_SUM);
const logger = require('../config/loggers');
class ChatController {
  chatService = new ChatService();

  // 대화내용 가져오기
  showChat = async (req, res) => {
    const { diaryId, page } = req.params;
    const userId = res.locals.userId - SECRET_SUM;

    try {
      const { chatInfo, isLast } = await this.chatService.showChat(
        diaryId,
        userId,
        page,
      );

      return res.status(200).json({ Chats: chatInfo, isLast });
    } catch (err) {
      logger.error(err.message || err);
      return res.status(err.status || 500).json({
        result: false,
        message: err.message || '이전 채팅 기록 조회에 실패하였습니다.',
      });
    }
  };
}
module.exports = ChatController;
