/* 
  routes에 따른 User Controllers
*/

export const join = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const login = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const logout = (req, res) => {
  return res.render("logout", { pageTitle: "Logout" });
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
