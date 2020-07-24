/*
  사용자 정의 middleware들을 작성한 파일.
*/

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

// S3 유저와 관련된 것들의 초기화.
export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

// 비디오 파일을 AWS의 S3 bucket에 저장합니다.
const multerVideo = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "wetubedorakang612/videos",
  }),
});
// 프로필 이미지를 AWS의 S3 bucket에 저장합니다.
const multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "wetubedorakang612/avatars",
  }),
});

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
