const passport = require('passport');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { SECRET_KEY, SECRET_SUM } = process.env;

class SocialLogin {
  //? /kakao로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
  // router.get("/kakao", passport.authenticate("kakao"));
  Kakao = passport.authenticate('kakao');

  //? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
  // router.get("/kakao/callback", passport.authenticate("kakao",{option}));
  KakaoCallBack = passport.authenticate('kakao', {
    // successRedirect: 'https://finale-omega.vercel.app', // kakaoStrategy에서 성공한다면 이 주소로 이동
    failureRedirect: 'http://127.0.0.1:3000', // kakaoStrategy에서 실패한다면 이 주소로 이동
    // successFlash: "성공적", // 성공시 플래시 메시지 출력
    // failureFlash: true, //실패시 플래시 메시지 출력여부
  });

  Naver = passport.authenticate('naver');

  NaverCallBack = passport.authenticate('naver', {
    // successRedirect: "/", // kakaoStrategy에서 성공한다면 이 주소로 이동
    failureRedirect: 'http://127.0.0.1:3000', // kakaoStrategy에서 실패한다면 이 주소로 이동
    // successFlash: "성공적", // 성공시 플래시 메시지 출력
    // failureFlash: true, //실패시 플래시 메시지 출력여부
  });

  ResponseToken = async (req, res) => {
    if (req.user) {
      const userId = req.user.dataValues.userId;
      const email = req.user.dataValues.email;
      const nickname = req.user.dataValues.nickname;
      const exUser = req.user;
      const accessToken = jwt.sign(
        { userId: userId + parseInt(SECRET_SUM), email, nickname },
        SECRET_KEY,
        {
          expiresIn: '1h',
        },
      );

      res.header('token', `Bearer ${accessToken}`);
      return res
        .status(200)
        .json({ result: true, message: '로그인 성공', token: accessToken });
    } else {
      res.redirect('http://127.0.0.1:3000');
    }
  };
}

module.exports = new SocialLogin();
