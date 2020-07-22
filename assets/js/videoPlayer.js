/*
  영상 시청시 동작할 JavaScript들입니다.

  Controller에서 재생과 잠시멈춤, 총 영상 길이 및 현재 시청 길이, 소리 크기 조절, 화면확대를 동작하게 합니다.

  또한 영상 시청시 조회수를 올립니다.
*/

import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const video = document.querySelector("video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

// 조회수 증가를 위한 fetch
const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

// 재생 및 멈춤 조작
const handlePlayClick = () => {
  if (video.paused) {
    video.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }
};

// 음소거 조작
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

// 확대 화면에서 본래 화면으로의 복귀
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

// 화면 확대
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

// 주어진 시간(초)을 시:분:초의 형식으로 전환
const formatDate = (secondsData) => {
  const totalSeconds = parseInt(secondsData, 10);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;

  return `${hours > 10 ? hours : `0${hours}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }:${seconds > 10 ? seconds : `0${seconds}`}`;
};

// 현재 시청한 시간 표시 및, 30초 이상 시청시 조회수 증가
const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(Math.floor(video.currentTime));
  if (
    parseInt(video.currentTime, 10) >= 30 &&
    parseInt(video.currentTime, 10) < 31
  ) {
    registerView();
  }
};

// 영상의 총길이 표시
const setTotalTime = async () => {
  const blob = await fetch(video.src).then((response) => response.blob());
  let duration;
  if (blob) {
    duration = await getBlobDuration(blob);
  } else {
    duration = video.duration;
  }
  totalTime.innerHTML = formatDate(duration);
  setInterval(getCurrentTime, 1000);
};

// 영상 재생이 끝났을 때의 동작, 영상의 길이가 30초 미만일 때 조회수 증가
const handleEnded = () => {
  video.currentTime = 0;
  playButton.innerHTML = '<i class="fas fa-play"></i>';

  if (parseInt(video.duration, 10) < 30) {
    registerView();
  }
};

// 소리 크기 조작
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

// 최초 시행 함수
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
