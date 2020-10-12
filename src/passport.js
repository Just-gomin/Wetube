/* 
  OAUTH를 이용하기 위한 파일입니다.

  GitHub, KakaoTalk, Facebook 로그인을 가능케 합니다.
*/

import passport from "passport";
import GitHubStrategy from "passport-github"; // Github를 통한 인증을 위한 strategy 모듈입니다.
import KakoStrategy from "passport-kakao"; // KakaoTalk을 통한 인증을 위한 strategy 모듈입니다.
import FacebookStrategy from "passport-facebook"; // Facebook을 통한 인증을 위한 strategy 모듈입니다.
import dotenv from "dotenv";
import User from "./models/User";
import {
  githubLoginCallback,
  FacebookLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userControllers";
import routes from "./routes";
dotenv.config();

// passport-local-mongoose를 이용해 localStrategy 및 serialization, deserialization을 간단히 하고 있습니다.
passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        process.env.PRODUCTION === "true"
          ? `https://limitless-cliffs-54834.herokuapp.com${routes.gitHubCallback}`
          : `http://localhost:4000${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL:
        process.env.PRODUCTION === "true"
          ? `https://limitless-cliffs-54834.herokuapp.com${routes.kakaoCallback}`
          : `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        process.env.PRODUCTION === "true"
          ? `https://limitless-cliffs-54834.herokuapp.com${routes.facebookCallback}`
          : `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    FacebookLoginCallback
  )
);

// Serialization : 어떤 정보가 Cookie에 담길지 알려주는 역할
passport.serializeUser(User.serializeUser());
// Desirialization : 쿠키의 정보를 어떻게 사용자 정보로 바꿀지 알려주는 역할
passport.deserializeUser(User.deserializeUser());
