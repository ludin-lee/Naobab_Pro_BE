const passport = require('passport');
const kakao = require('./KaKaoStrategy');
const naver = require('./NaverStrategy');

module.exports = (app) => {
  kakao(); // 카카오 등록
  naver(); //네이버 등록
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    if (id) return done(null, true);
    done(null, false);
  });
};
