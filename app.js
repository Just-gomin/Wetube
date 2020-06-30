/*
    서비스의 중심부.

    express서버에 대한 설정파일이다.
*/

import express from "express";

// middlewares
import morgan from "morgan"; // 모든 연결에 대한 로그를 남겨주는 middleware
import helmet from "helmet"; // NodeJS의 보안을 높여주는 middleware
import cookieParser from "cookie-parser"; // 쿠키 분석을 위한 middlewaare
import bodyParser from "body-parser"; // 요청의 본문을 분석하기 위한 middleware
import { localsMiddleware } from "./middlewares";

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

// Routes
import routes from "./routes";

const app = express();

// app의 보안을 향상 시켜줄 middleware
app.use(helmet());

// express app setting
app.set("view engine", "pug"); // View Engine을 pug로 설정

// middlewares 사용
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);

// routers 사용
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
