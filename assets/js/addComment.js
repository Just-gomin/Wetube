import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const addCommentButton = document.getElementById("jsAddCommentButton");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentUserAvatar = document.getElementById("jsAddCommentUserAvatar");
const commentUserName = document.getElementById("jsAddCommentUserName");

//댓글 추가시 댓글의 숫자를 늘리는 함수
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

// 댓글을 달았은 때 가짜로 화면에 보이게 해주는 함수
const addComment = (comment) => {
  const li = document.createElement("li");

  const image = document.createElement("img");
  image.classList.add("comment-user__avatar");
  image.setAttribute("src", commentUserAvatar.getAttribute("src"));

  const comment_main = document.createElement("div");
  comment_main.classList.add("comment-main");
  comment_main.innerHTML;

  const user_name = document.createElement("div");
  user_name.classList.add("comment-user__name");
  user_name.innerHTML = commentUserName.innerHTML;

  const comment_text = document.createElement("div");
  comment_text.classList.add("comment-text");
  comment_text.innerHTML = comment;

  comment_main.appendChild(user_name);
  comment_main.appendChild(comment_text);
  li.appendChild(image);
  li.appendChild(comment_main);
  commentList.prepend(li);
  increaseNumber();
};

// DB에 저장하도록 api에 접근하게 하는 함수
const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1].replace("?", "");
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
  console.log(response);
};

// form 에서 submit 했을 때 처리하는 함수
const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("textarea");
  const comment = commentInput.value;
  if (comment[comment.length - 1] === "\n") {
    comment[comment.length - 1].replace("\n", "");
  }
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  addCommentButton.addEventListener("click", handleSubmit);
}

if (addCommentForm) {
  init();
}
