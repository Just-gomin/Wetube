/*
    홈 화면, 회원가입 등에 대한 처리를 할 Router
*/

import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoControllers";
import {
  getJoin,
  getLogin,
  getMe,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGitHubLogin,
  FacebookLogin,
  postFacebookLogin,
  kakaoLogin,
  postKakaoLogin,
} from "../controllers/userControllers";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home); // 홈페이지 처리
globalRouter.get(routes.search, search); // 검색 처리

globalRouter.get(routes.join, onlyPublic, getJoin); // 회원가입 페이지 요청
globalRouter.post(routes.join, postJoin, onlyPublic, postLogin); // 회원가입 처리

globalRouter.get(routes.login, onlyPublic, getLogin); // 로그인 페이지 요청
globalRouter.post(routes.login, onlyPublic, postLogin); // 로그인 처리
globalRouter.get(routes.logout, onlyPrivate, logout); // 로그아웃 처리

globalRouter.get(routes.me, onlyPrivate, getMe); // 해당 유저의 프로필 페이지 요청

globalRouter.get(routes.gitHub, githubLogin); // GitHub 로그인 요청
globalRouter.get(
  routes.gitHubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGitHubLogin
); // GitHub의 로그인 요청에 대한 응답 처리

globalRouter.get(routes.kakao, kakaoLogin); // KakaoTalk 로그인 요청
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postKakaoLogin
); // KakaoTalk의 로그인 요청에 대한 응답 처리

globalRouter.get(routes.facebook, FacebookLogin); // Facebook 로그인 요청
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postFacebookLogin
); // Facebook의 로그인 요청에 대한 응답 처리

export default globalRouter;
