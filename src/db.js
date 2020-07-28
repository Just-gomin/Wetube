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

const dbLocation =
  process.env.PRODUCTION === "true" ? "Mongo Atlas" : "Local DB";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log(`✅ Connected to ${dbLocation}.`);
};

const handleError = (error) => {
  console.log(`❌ Error on ${dbLocation} Connection: ${error}`);
};

db.once("open", handleOpen);
db.on("error", handleError);
