const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  videoPreview.pause();
  recordButton.removeEventListener("click", stopRecording);
  recordButton.innerHTML = "Start Recording";
  recordButton.classList.remove("button-inRecoding");
  recordButton.classList.add("button-preRecoding");
  recordButton.addEventListener("click", getVideo);
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordButton.addEventListener("click", stopRecording);
  recordButton.innerHTML = "Stop recording";
  recordButton.classList.remove("button-preRecoding");
  recordButton.classList.add("button-inRecoding");
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordButton.innerHTML = "Can't record... 😥";
  } finally {
    recordButton.removeEventListener("click", getVideo);
  }
};

const init = () => {
  recordButton.addEventListener("click", getVideo);
};

if (recordContainer) {
  init();
}
