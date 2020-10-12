/*
    서비스의 중심부.

    express서버에 대한 설정파일이다.
*/

import express from "express";

// middlewares
import bodyParser from "body-parser"; // 요청의 본문을 분석하기 위한 middleware
import cookieParser from "cookie-parser"; // 쿠키 분석을 위한 middlewaare
import flash from "express-flash"; // 1회성 메세지를 위한 모듈
import helmet from "helmet"; // NodeJS의 보안을 높여주는 middleware
import mongoose from "mongoose"; // Mongo DB를 이용하기 위한 모듈
import MongoStore from "connect-mongo"; // session을 mongoDB에 저장하기 위한 모듈
import morgan from "morgan"; // 모든 연결에 대한 로그를 남겨주는 middleware
import passport from "passport"; // 사용자 인증을 위한 middleware
import "./passport"; // passport middleware에 대한 strategies 모음
import path from "path"; // 파일 경로를 위한 모듈
import session from "express-session"; // Session 사용을 위한 express의 session 모듈

import { localsMiddleware } from "./middlewares"; // 사용자 정의 middlewares

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

// Routes
import routes from "./routes";

const app = express();
const CookieStore = MongoStore(session);

// app의 보안을 향상 시켜줄 middleware
app.use(helmet());

// express app setting
app.set("view engine", "pug"); // View Engine을 pug로 설정
app.set("views", path.join(__dirname, "views"));

// middlewares 사용
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: `${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: true,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
      collection: "sessions",
    }),
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// routers 사용
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
