/* 
  routes에 따른 Video Controllers
*/

import { videos } from "../db";

export const home = (req, res) => {
  return res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  return res.render("search", {
    pageTitle: "Search",
    searchingBy,
  });
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
