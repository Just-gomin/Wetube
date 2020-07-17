/*
    서버단에서 처리할 일들을 위한 Router
*/

import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoControllers";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);

export default apiRouter;
