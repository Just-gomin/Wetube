import express from "express";

// middlewares
import morgan from "morgan"; // 모든 연결에 대한 로그를 남겨주는 middleware
import helmet from "helmet"; // NodeJS의 보안을 높여주는 middleware
import cookieParser from "cookie-parser"; // 쿠키 분석을 위한 middlewaare
import bodyParser from "body-parser"; // 요청의 본문을 분석하기 위한 middleware

// Routers
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
