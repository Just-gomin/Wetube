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

// Uploads
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
