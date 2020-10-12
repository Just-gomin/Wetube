/*
    동영상들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";
import {
  getUpload,
  videoDetail,
  deleteVideo,
  postUpload,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoControllers";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload); // Video Upload 페이지 요청
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); // Video Upload 처리

videoRouter.get(routes.videoDetail(), videoDetail); // Video 시청 및 댓글 페이지.

videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo); // Video 수정 페이지 요청
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo); // Video 수정 처리

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo); // Video 삭제 처리

export default videoRouter;
