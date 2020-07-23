/*
    Video Schema File.
    DB에 저장할 Video들의 정보 형태 정의.
    직접 Video를 DB에 저장하는 것이 아닌 영상의 링크를 저장한다.(Text DataBase).
*/

import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required!",
  },
  title: {
    type: String,
    required: "Title is required.",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Video", VideoSchema);
export default model;
