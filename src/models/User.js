/* 
  User Model의 Schema 및 로그인
*/

import mongoose from "mongoose";
import passportlocalMongoose from "passport-local-mongoose"; // Local 로그인을 위한 모듈

// User 데이터의 Schema.
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  kakaoId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

// 사용자를 구분 지을 것이 email임을 알려줍니다.
UserSchema.plugin(passportlocalMongoose, {
  usernameField: "email",
});

const model = mongoose.model("User", UserSchema);

export default model;
