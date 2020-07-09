import passport from "passport";
import GitHubStrategy from "passport-github";
import dotenv from "dotenv";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userControllers";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/github/callback",
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
