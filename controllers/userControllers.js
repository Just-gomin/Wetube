/* 
  routes에 따른 User Controllers
*/

import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = new User({
        name,
        email,
      });
      await User.register(user, password);
    } catch (error) {
      console.log(error);
    }
    // To Do : Log User In
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = (req, res) => {
  // To Do : Check User In DB
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do : Process Logout
  res.redirect(routes.home);
};

export const userDetail = (req, res) => {
  return res.render("userDetail", { pageTitle: "User Detail" });
};

export const editProfile = (req, res) => {
  return res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const changePassword = (req, res) => {
  return res.render("changePassword", { pageTitle: "Change Password" });
};
