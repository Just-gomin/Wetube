/* 
  routes에 따른 Video Controllers
*/

import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import { s3 } from "../middlewares";

// Home
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// Search
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    // Regular Expression을 이용해 해당 단어를 포함한 영상들을 검색
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
    req.flash("error", "Can't find videos.");
  }
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};

// Uploads
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    req.flash("success", "Video uploaded!");
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    req.flash("error", "Can't upload, please retry it.");
    console.log(error);
    res.redirect(routes.upload);
  }
};

// Video Detail
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator", model: "User" },
      });
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    req.flash("error", "Video not found.");
    console.log(error);
    res.redirect(routes.home);
  }
};

// Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    req.flash("error", "Can't edit video");
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    req.flash("success", "Video edited!");
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    req.flash("error", "Can't edit, please retry it.");
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      req.flash("error", "Don't match creator and user.");
      throw Error();
    } else {
      const delVideoName = video.fileUrl.split("/videos/")[1];
      const deleteParams = {
        Bucket: "wetubedorakang612",
        Key: `videos/${delVideoName}`,
      };
      await s3
        .deleteObject(deleteParams, (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } else {
            console.log(`${data}, Successfully deleted!`);
          }
        })
        .promise();
      const user = await User.findById(req.user.id);
      await Video.findOneAndDelete({ _id: id });
      user.videos.remove(id);
      user.save();
      req.flash("success", "Video is deleted.");
    }
  } catch (error) {
    req.flash("error", "Can't delete, please retry it.");
    console.log(error);
  }
  res.redirect(routes.home);
};

// API Controllers
// Register the View of Video
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Register the comments
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const commenter = await User.findById(user.id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    commenter.comments.push(newComment.id);
    video.save();
    commenter.save();
  } catch (error) {
    req.flash("error", "Can't add comment, please retry it.");
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
    user,
  } = req;
  try {
    const comment = await Comment.findById(commentId);
    if (comment.creator.toString() !== user.id) {
      throw Error();
    } else {
      const video = await Video.findById(id);
      video.comments.remove(commentId);
      const creator = await User.findById(user.id);
      creator.comments.remove(commentId);
      await Comment.findByIdAndDelete({ _id: commentId });
      video.save();
      creator.save();
      req.flash("success", "Delete commet!");
    }
  } catch (error) {
    req.flash("error", "Can't delete comment.");
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
