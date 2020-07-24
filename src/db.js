/*
  MongoDB와 NodeJS의 연결 부분.
*/

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURL =
  process.env.PRODUCTION === "true"
    ? process.env.MONGO_URL_PROD
    : process.env.MONGO_URL_DEV;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB.");
};

const handleError = (error) => {
  console.log(`❌ Error on DB Connection: ${error}`);
};

db.once("open", handleOpen);
db.on("error", handleError);
