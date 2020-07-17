/*
    서버단에서 처리할 일들을 위한 Router
*/

import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
} from "../controllers/videoControllers";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, onlyPrivate, postAddComment);

export default apiRouter;
