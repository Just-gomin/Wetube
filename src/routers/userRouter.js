/*
    사용자들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  getChangePassword,
  postEditProfile,
  postChangePassword,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); // Profile 수정 페이지 요청
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile); // Profile 수정 처리

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword); // 계정의 비밀번호 수정 페이지 요청
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword); // 계정의 비밀번호 수정 처리

userRouter.get(routes.userDetail(), userDetail); // 다른 사용자의 Profile 페이지 요청

export default userRouter;
