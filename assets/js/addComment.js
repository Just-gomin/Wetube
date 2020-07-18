import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const addCommentButton = document.getElementById("jsAddCommentButton");

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1].replace("?", "");
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  console.log(response);
};

const handleSubmint = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmint);
  addCommentButton.addEventListener("click", handleSubmint);
}

if (addCommentForm) {
  init();
}
