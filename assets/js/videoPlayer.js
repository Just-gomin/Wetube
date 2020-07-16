const videoContainer = document.getElementById("jsVideoPlayer");
const video = document.querySelector("video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");

function handlePlayClick() {
  if (video.paused) {
    video.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (video.muted) {
    video.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    video.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function goSmallScreen() {
  document.exitFullscreen();
  fullScreenButton.innerHTML = '<i class="fas fa-expand "></i>';
  fullScreenButton.removeEventListener("click", goSmallScreen);
  fullScreenButton.addEventListener("click", goFullScreen);
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenButton.removeEventListener("click", goFullScreen);
  fullScreenButton.addEventListener("click", goSmallScreen);
}

function init() {
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  fullScreenButton.addEventListener("click", goFullScreen);
}

if (videoContainer) {
  init();
}
