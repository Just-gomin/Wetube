const recordContainer = document.getElementById("jsRecordContainer");
const recordButton = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
  } catch (error) {
    recordButton.innerHTML = "Can't record... 😥";
    recordButton.removeEventListener("clcick", startRecording);
  }
};

const init = () => {
  recordButton.addEventListener("click", startRecording);
};

init();
