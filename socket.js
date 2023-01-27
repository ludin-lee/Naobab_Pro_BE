const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { Users, Chat, Notification } = require('./models');
const { Op } = require('sequelize');
// const admin = require('firebase-admin');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const ADMIN = process.env.ADMIN;
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

let server = '';
if (process.env.NODE_ENV == 'production' && process.env.HTTPSPORT) {
  try {
    const privateKey = fs.readFileSync(
      '/etc/letsencrypt/live/mylee.site/privkey.pem',
      'utf8',
    );
    const certificate = fs.readFileSync(
      '/etc/letsencrypt/live/mylee.site/cert.pem',
      'utf8',
    );
    const ca = fs.readFileSync(
      '/etc/letsencrypt/live/mylee.site/chain.pem',
      'utf8',
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    server = https.createServer(credentials, app);
  } catch (err) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(err);
  }
} else {
  server = http.createServer(app);
}

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

// 소켓 연결
io.on('connection', (socket) => {
  // 채팅 받아 저장 후, 전달
  socket.on('chat_message', async (data) => {
    let { message, roomId, userId, nickname } = data;

    const today = dayjs().tz().format('YYYY-MM-DD 00:00:00');
    const chatTime = new Date(today).setHours(new Date(today).getHours() - 9);

    const todayChat = await Chat.findOne({
      where: {
        roomId,
        createdAt: { [Op.gt]: chatTime },
      },
    });

    //오늘 대화가 없었다면 오늘 날짜 나오게
    if (!todayChat) {
      await Chat.create({
        roomId,
        userId: ADMIN, //관리자 키
        chat: `${dayjs(today).format('YYYY년 MM월 DD일')}`,
      });
    }
    //채팅 내용 저장
    await Chat.create({ roomId, userId, chat: message });

    // 채팅 보내주기
    let newMessage = {
      roomId,
      message,
      userId,
      nickname,
      time: dayjs(new Date()).format(),
    };
    io.to(`room:${roomId}`).emit(newMessage);
  });

  // 초대 알림
  socket.on('invited', async (data) => {
    // userId = 추천 받은 유저
    let { diaryId, hostUserId, invitedUserId } = data;
    /*
    코드
    초대:1
    상대방 일기씀:2
    댓글 알림:3
    */

    const notification = await Notification.create({
      code: 1,
      userId: invitedUserId,
      audienceId: hostUserId,
      diaryId,
      postId: null,
    });

    io.to(`notification:${invitedUserId}`).emit(notification);
  });
});

module.exports = { server };
