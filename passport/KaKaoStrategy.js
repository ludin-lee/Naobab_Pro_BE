const passport = require('passport');
const { Users } = require('../models');
const Kakao = require('passport-kakao');
const KakaoStrategy = Kakao.Strategy;
const logger = require('../config/loggers');

module.exports = () => {
  // passport를 초기화 하기 위해서 passport.initialize 미들웨어 사용
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
        callbackURL: process.env.KAKAO_URL, // 카카오 로그인 Redirect URI 경로
      },
      // clientID에 카카오 앱 아이디 추가
      // callbackURL: 카카오 로그인 후 카카오가 결과를 전송해줄 URL
      // accessToken, refreshToken : 로그인 성공 후 카카오가 보내준 토큰
      // profile: 카카오가 보내준 유저 정보. profile의 정보를 바탕으로 회원가입
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: {
              email: profile._json.kakao_account.email,
              social: true,
              provider: 'kakao',
            },
          });
          // 이미 가입된 카카오 프로필이면 성공
          if (exUser) {
            await Users.update(
              {
                nickname: profile._json.properties.nickname,
                profileImg: profile._json.properties.profile_image,
              },
              { where: { userId: exUser.userId } },
            );
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await Users.create({
              email: profile._json.kakao_account.email,
              nickname: profile._json.properties.nickname,
              profileImg: profile._json.properties.profile_image,
              social: true,
              provider: 'kakao',
            });
            done(null, newUser); // 회원가입하고 로그인 인증 완료
          }
        } catch (err) {
          logger.error(err.message);
          done(err);
        }
      },
    ),
  );
};
