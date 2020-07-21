/*
    댓글 삭제 수행.

    삭제버튼을 누르면, 서버로 삭제 요청을 보냅니다.
    삭제 요청이 문제 없이 이루어지면, 화면에서 해당 댓글을 없앱니다.
*/

import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentDeleteButton = document.getElementById("jsDeleteCommentButton");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (comment) => {
  const li = comment.closest("li");
  li.remove();
};

const handleDelete = async (event) => {
  const videoId = window.location.href.split("/videos/")[1].replace("?", "");
  const comment = event.target;
  const commentId = comment.value;
  const response = await axios({
    url: `/api/${videoId}/comment/delete`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    deleteComment(comment);
    decreaseNumber();
  }
  console.log(response);
};

const init = () => {
  commentDeleteButton.addEventListener("click", handleDelete);
};

if (commentList) {
  init();
}
