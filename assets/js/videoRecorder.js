const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;

const handleVideoData = (event) => {
  console.log(event.data);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.ondataavailable = handleVideoData;
  videoRecorder.start();
  console.log(videoRecorder);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
    recordButton.innerHTML = "Stop recording";
    recordButton.classList.remove("button-preRecoding");
    recordButton.classList.add("button-inRecoding");
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordButton.innerHTML = "Can't record... 😥";
  } finally {
    recordButton.removeEventListener("clcick", getVideo);
  }
};

const init = () => {
  recordButton.addEventListener("click", getVideo);
};

init();
