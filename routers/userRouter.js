/*
    사용자들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  changePassword,
  postEditProfile,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
