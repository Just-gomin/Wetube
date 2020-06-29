/* 
  routes에 따른 Video Controllers
*/

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const search = (req, res) => {
  return res.render("search", { pageTitle: "Search" });
};

export const upload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = (req, res) => {
  return res.render("videoDetail", { pageTitle: "Video Detail" });
};

export const editVideo = (req, res) => {
  return res.render("editVideo", { pageTitle: "Edit Video" });
};

export const deleteVideo = (req, res) => {
  return res.render("deleteVideo", { pageTitle: "Delete Video" });
};
