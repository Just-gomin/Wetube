/*
  사용자 정의 middleware들을 작성한 파일.
*/

import multer from "multer"; // 파일 저장을 위한 모듈
import multerS3 from "multer-s3"; // Amazon Web Service 중 S3에 파일을 저장하기 위한 모듈
import aws from "aws-sdk"; // Amazon Web Service를 이용하는 코드를 작성하기 위한 도구 모듈
import routes from "./routes";

// Bucket 지정
const bucket =
  process.env.PRODUCTION === "true"
    ? "wetubedorakang612"
    : "devwetubedorakang612";

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
    bucket: `${bucket}/videos`,
  }),
});

// 프로필 이미지를 AWS의 S3 bucket에 저장합니다.
const multerAvatar = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: `${bucket}/avatars`,
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

// 로그인 하지 않은 사용자들만 사용할 수 있는 부분을 위한 미들웨어입니다.
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

// 로그인 한 사용자들만 사용할 수 있는 부분을 위한 미들웨어입니다.
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
