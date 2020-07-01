/*
    동영상들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";
import {
  getUpload,
  videoDetail,
  editVideo,
  deleteVideo,
  postUpload,
} from "../controllers/videoControllers";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
