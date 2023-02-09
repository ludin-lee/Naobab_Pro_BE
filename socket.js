const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const fs = require('fs');
const http = require('http');
const https = require('https');
const { Users, Chats, Notifications, Diaries } = require('./models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
const UserInfoService = require('./services/userInfo.service');
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
  socket.on('join', (diaryId) => {
    socket.join(diaryId);
  });
  // 채팅 받아 저장 후, 전달
  socket.on('chat_message', async (data) => {
    let { message, diaryId, userId } = data;
    const today = dayjs().tz().format('YYYY-MM-DD 00:00:00');
    const chatTime = new Date(today).setHours(new Date(today).getHours() - 9);
    const [caseOne, caseTwo] = await Chats.findOrCreate({
      where: { diaryId, createdAt: { [Op.gt]: chatTime } },
      defaults: {
        diaryId,
        userId: ADMIN, //관리자 키
        chat: `${dayjs(today).format('YYYY년 MM월 DD일')}`,
      },
    });

    if (caseTwo) socket.to(diaryId).emit('receiveTime', today);

    // 채팅 보내주기
    const userInfo = await Users.findOne({ where: { userId } });
    let newMessage = {
      diaryId,
      userId,
      message,
      profileImg: userInfo.profileImg,
      nickname: userInfo.nickname,
      time: dayjs(new Date()).format(),
    };
    socket.to(diaryId).emit('receiveMessage', newMessage); //채팅시 채팅방에 알림 생기게 프>론트에서 소켓 콜백함수를 조정해야함
    //채팅 내용 저장
    await Chats.create({ diaryId, userId, chat: message });
  });

  // 초대 알림
  socket.on('invited', async (data) => {
    // invitedUserId = 초대 받은 유저
    //hostUsersId =  초대 보낸 유저
    let { diaryId, hostUserId, invitedUserId } = data;
    /*
    코드
    초대: 1
    상대방 일기씀: 2
    댓글: 3
    초대 수락: 4
    */

    const diary = await Diaries.findOne({ where: { diaryId } }); //해당 다이어리정보 조회
    socket.join(diaryId);
    // if (diary.invitedId) io.to(`canNotInvite`).emit(diary.diaryName);
    if (diary.invitedId)
      socket.to(diaryId).emit(`invite:${invitedUserId}`, false);
    //다이어리에 이미 초대된 사람 있으면 해당 이벤트로 다이어리 이름 과 함께소켓발생
    else {
      //아니면 원래대로
      await Diaries.update(
        { invitedSecureId: invitedUserId },
        { where: { diaryId } },
      );

      const [caseOne, caseTwo] = await Notifications.findOrCreate({
        //이미 있는 알람이면 만들지 않음 없으면 만듬
        where: {
          code: 1,
          userId: invitedUserId,
          audienceId: hostUserId,
          diaryId,
        },
        default: {
          code: 1,
          userId: invitedUserId,
          audienceId: hostUserId,
          diaryId,
          postId: null,
          confirm: false,
        },
      });

      socket
        .to(diaryId)
        .emit(`invite:${invitedUserId}`, true, caseTwo || caseOne);
    }
  });

  //초대 수락시 데이터베이스에서 삭제
  socket.on('invitedAccept', async (data) => {
    // invitedUserId = 초대 받은 유저
    //hostUsersId =  초대 보낸 유저
    let { notification } = data;
    /*
    코드
    초대: 1
    상대방 일기씀: 2
    댓글: 3
    초대 수락: 4
    */
    await Notifications.destrory({
      where: { notificationId: notification.notificationId },
    });

    socket.to(notification.notificationId).emit(notification);
  });
});

module.exports = { server };
