/* 
  routes에 따른 User Controllers
*/

import passport from "passport";

import routes from "../routes";
import User from "../models/User";

// 회원가입 페이지
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

// 회원 가입 처리
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    req.flash("error", "Passwords don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = new User({
        name,
        email,
      });
      await User.register(user, password);
      req.flash("success", "Welcome to wetube!");
      next();
    } catch (error) {
      console.log(error);
      req.flash("error", "Can't join, check your email or password.");
      res.redirect(routes.home);
    }
  }
};

// 로그인 페이지 요청
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

// 로그인 요청 처리
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  failureFlash: "Can't login, please check your email or password.",
  successFlash: "Welcome!",
});

// Github 로그인 요청
export const githubLogin = passport.authenticate("github", {
  failureFlash: "Can't login, please check your email or password.",
  successFlash: "Welcome!",
});

// Github 로그인 요청 응답 처리
export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl: avatar_url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

// Github 로그인 성공시 홈으로 이동
export const postGitHubLogin = (req, res) => {
  res.redirect(routes.home);
};

// Kakao 로그인 요청
export const kakaoLogin = passport.authenticate("kakao", {
  failureFlash: "Can't login, please check your email or password.",
  successFlash: "Welcome!",
});

// Kakao 로그인 요청 응답 처리
export const kakaoLoginCallback = async (
  accessToken,
  refreshToken,
  kakao_profile,
  done
) => {
  const {
    _json: {
      id,
      username,
      properties: { nickname },
      kakao_account: { email, profile },
    },
  } = kakao_profile;
  try {
    const user = await User.findOne({ email });
    console.log(nickname, profile);
    if (user) {
      user.kakaoId = id;
      user.avatarUrl = profile.profile_image_url;
      user.save();
      return done(null, user);
    } else {
      const newUser = User.create({
        email,
        name: username,
        kakaoId: id,
        avatarUrl: profile.profile_image_url,
      });
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
};

// Kakao 로그인 성공시 처리
export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

// Facebook 로그인 요청
export const FacebookLogin = passport.authenticate("facebook", {
  failureFlash: "Can't login, please check your email or password.",
  successFlash: "Welcome!",
});

// Facebook 로그인 요청 응답 처리
export const FacebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        email,
        name,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};

// Facebook 로그인 성공시 처리
export const postFacebookLogin = (req, res) => res.redirect(routes.home);

// 로그아웃 처리
export const logout = (req, res) => {
  req.flash("info", `Logged out!`);
  req.logout();
  res.redirect(routes.home);
};

// 본인 Profile 페이지 요청
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  return res.render("userDetail", { pageTitle: "User Detail", user: user });
};

// 사용자 Profile 페이지 요청
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user: user });
  } catch (error) {
    req.flash("error", "User not found :(");
    console.log(error);
    res.redirect(routes.home);
  }
};

// Profile 수정 페이지 요청
export const getEditProfile = (req, res) => {
  return res.render("editProfile", { pageTitle: "Edit Profile" });
};

// Profile 수정 처리
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("sucess", "Profile updated!");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update your profile. Please retry it.");
    res.redirect("editProfile", { pageTitle: "Edit Profile" });
  }
};

// 계정 비밀번호 변경 페이지 요청
export const getChangePassword = (req, res) => {
  return res.render("changePassword", { pageTitle: "Change Password" });
};

// 계정 비밀번호 변경 처리
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      return res.redirect(`/users${routes.changePassword}`);
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
      req.flash("sucess", "Password is successfully changed!");
    }
  } catch (error) {
    req.flash("error", "Can't change the password. Please retry it.");
    res.status(400);
    return res.redirect(`/users${routes.changePassword}`);
  }
};
