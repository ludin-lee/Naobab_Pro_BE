const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const passport = require('passport');
const router = require('./routers');
const app = express();
const db = require('./models');
const helmet = require('helmet');
const logger = require('./config/loggers');
const cors = require('cors');
const passportConfig = require('./passport');

// const https = require('https');
// const fs = require('fs');

// const privateKey = fs.readFileSync(
//   '/etc/letsencrypt/live/mylee.site/privkey.pem',
//   'utf8',
// );
// const certificate = fs.readFileSync(
//   '/etc/letsencrypt/live/mylee.site/cert.pem',
//   'utf8',
// );
// const ca = fs.readFileSync(
//   '/etc/letsencrypt/live/mylee.site/chain.pem',
//   'utf8',
// );

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

// 미들웨어 통과하는 순서를 첫 번째로
app.use(
  cors({
    origin: '*',
    credentials: true, // default: false
  }),
);

passportConfig();

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }),
);

// db 연결 확인
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

// sequelize model sync() 수정하기
db.sequelize.sync({
  force: false,
});

// XSS 공격 방어
app.use(helmet());
app.use(helmet.xssFilter());

//CSRF

const port = process.env.PORT;
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

app.use('/api', express.urlencoded({ extended: false }));
app.use('/api', router);

app.listen(port, () => {
  console.log(port, ' server is opened');
});

// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(process.env.HTTPSPORT, () => {
//   console.log('HTTPS Server running on port 4433');
// });
