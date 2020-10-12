/*
  MongoDB와 NodeJS의 연결 부분.
*/

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// DB URL 설정
const mongoURL =
  process.env.PRODUCTION === "true"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_DEV;

// DB 위치 설명 변수
const dbLocation =
  process.env.PRODUCTION === "true" ? "Mongo Atlas" : "Local DB";

// Mongoose와 DB 연결
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// mongoose를 통해 연결된 DB
const db = mongoose.connection;

// 처음 연결되었을 때 실행될 함수
const handleOpen = () => {
  console.log(`✅ Connected to ${dbLocation}.`);
};

// DB 이용 중 Error 발생시 실행될 함수
const handleError = (error) => {
  console.log(`❌ Error on ${dbLocation} Connection: ${error}`);
};

db.once("open", handleOpen);
db.on("error", handleError);
