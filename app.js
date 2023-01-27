const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const router = require('./routers');
const app = express();
const db = require('./models');
const helmet = require('helmet');
const logger = require('./config/loggers');
const cors = require('cors');
const passportConfig = require('./passport');
const port = process.env.PORT;

// 미들웨어 통과하는 순서를 첫 번째로
app.use(
  cors({
    origin: '*',
    credentials: true, // default: false
  }),
);

passportConfig();
app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장

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

app.use('/api', express.urlencoded({ extended: false }));
app.use('/api', router);

module.exports = app;
