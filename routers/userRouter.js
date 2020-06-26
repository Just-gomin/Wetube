/*
    사용자들에 대한 처리를 할 Router
*/

import express from "express";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.user_detail, (req, res) => res.send("User_Detail"));

export default userRouter;
