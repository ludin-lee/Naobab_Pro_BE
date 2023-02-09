const passport = require('passport');
const { Users } = require('../models');
const Naver = require('passport-naver');
const NaverStrategy = Naver.Strategy;
const logger = require('../config/loggers');
module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await Users.findOne({
            where: {
              email: profile._json.email,
              social: true,
              provider: 'naver',
            },
          });

          if (exUser) {
            await Users.update(
              {
                nickname: profile._json.nickname,
                profileImg: profile._json.profile_image,
              },
              { where: { userId: exUser.userId } },
            );
            done(null, exUser); // 로그인 인증 완료
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const newUser = await Users.create({
              email: profile._json.email,
              nickname: profile._json.nickname,
              profileImg: profile._json.profile_image,
              social: true,
              provider: 'naver',
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
