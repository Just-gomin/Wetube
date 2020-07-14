/*
  사용자 정의 middleware들을 작성한 파일.
*/

import multer from "multer";
import routes from "./routes";

// 비디오 파일을 videos라는 경로에 저장합니다.
const multerVideo = multer({ dest: "uploads/videos/" });
// 프로필 이미지를 avatars 경로상에 저장합니다.
const multerAvatar = multer({ dest: "uploads/avatars/" });

// 템플릿에서 변수들을 이용하기 위한 middleware입니다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

// 파일 한개를 다루는 middleware입니다.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
