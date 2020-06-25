import express from "express";
import morgan from "morgan"; // 모든 연결에 대한 로그를 남겨주는 middleware
import helmet from "helmet"; // NodeJS의 보안을 높여주는 middleware
import cookieParser from "cookie-parser"; // 쿠키 분석을 위한 middlewaare
import bodyParser from "body-parser"; // 요청의 본문을 분석하기 위한 middleware

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on: http://localhost:${PORT}`);
};

const handleHome = (req, res) => {
  res.send("Hi, from Home");
};

const handleProfile = (req, res) => {
  res.send("You're in my profile");
};

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
