/*
  서비스의 진입점.

  DB연결, app의 port 지정 등의 역할을 한다.
*/

import "@babel/polyfill";

import app from "./app";
import "./db";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

// Port 번호 지정
const PORT = process.env.PORT || 4000;

// 수신 설정 후 실행 함수
const handleListening = () =>
  console.log(`✅ Listening on : http://localhost:${PORT}`);

// APP 수신 Port 설정
app.listen(PORT, handleListening);
