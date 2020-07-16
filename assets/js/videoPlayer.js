const videoContainer = document.getElementById("jsVideoPlayer");
const video = videoContainer.querySelector("video");
const playButton = document.getElementById("jsPlayButton");

function handlePlayClick() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function init() {
  playButton.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
