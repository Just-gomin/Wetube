/* 
  routes에 따른 Video Controllers
*/

import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  return res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = (req, res) => {
  const {
    body: { file, title, desription },
  } = req;
  // To Do : Upload and Save Video
  res.redirect(routes.videoDetail(23423));
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
