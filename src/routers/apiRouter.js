/*
    서버단에서 처리할 일들을 위한 Router
*/

import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  postDeleteComment,
} from "../controllers/videoControllers";
import { onlyPrivate } from "../middlewares";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView); // 조회수 증가 처리
apiRouter.post(routes.addComment, onlyPrivate, postAddComment); // 댓글 추가 처리
apiRouter.post(routes.deleteComment, onlyPrivate, postDeleteComment); //댓글 삭제 처리

export default apiRouter;
