/*
    동영상들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";
import {
  upload,
  videoDetail,
  editVideo,
  deleteVideo,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
