const { server } = require('./socket');
const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV == 'production' && process.env.HTTPSPORT) {
  const HTTPSPORT = process.env.HTTPSPORT;

  server.listen(HTTPSPORT, () => {
    console.log(HTTPSPORT, '포트로 https 서버가 열렸어요!');
  });
} else {
  const PORT = process.env.PORT;

  server.listen(PORT, () => {
    console.log(PORT, '포트로 http 서버가 열렸어요!');
  });
}
