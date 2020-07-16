const videoContainer = document.getElementById("jsVideoPlayer");
const video = document.querySelector("video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  if (video.muted) {
    video.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = video.volume;
  } else {
    video.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
};

const goSmallScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  fullScreenButton.innerHTML = '<i class="fas fa-expand "></i>';
  fullScreenButton.removeEventListener("click", goSmallScreen);
  fullScreenButton.addEventListener("click", goFullScreen);
};

const goFullScreen = () => {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    /* Firefox */
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    /* IE/Edge */
    videoContainer.msRequestFullscreen();
  }
  fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenButton.removeEventListener("click", goFullScreen);
  fullScreenButton.addEventListener("click", goSmallScreen);
};

const formatDate = (secondsData) => {
  const totalSeconds = parseInt(secondsData, 10);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  return `${hours > 10 ? hours : `0${hours}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }:${seconds > 10 ? seconds : `0${seconds}`}`;
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(Math.floor(video.currentTime));
};

const setTotalTime = () => {
  totalTime.innerHTML = formatDate(video.duration);
  setInterval(getCurrentTime, 1000);
};

const handleEnded = () => {
  video.currentTime = 0;
  playButton.innerHTML = '<i class="fas fa-play"></i>';
};

const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  video.volume = value;
  if (value >= 0.6) {
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.3) {
    volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value > 0) {
    volumeButton.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
  if (value === 0) {
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const init = () => {
  video.autoplay = true;
  video.addEventListener("click", handlePlayClick);
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  fullScreenButton.addEventListener("click", goFullScreen);
  video.addEventListener("loadedmetadata", setTotalTime);
  video.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeRange);
};

if (videoContainer) {
  init();
}
