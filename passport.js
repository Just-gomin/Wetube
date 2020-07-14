import passport from "passport";
import GitHubStrategy from "passport-github";
import KakoStrategy from "passport-kakao";
import FacebookStrategy from "passport-facebook";
import dotenv from "dotenv";
import User from "./models/User";
import {
  githubLoginCallback,
  FacebookLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userControllers";
import routes from "./routes";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.gitHubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new KakoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"],
    },
    FacebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
