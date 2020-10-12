/* 
    경로 모음 파일.

    각기 다른 파일에서 동일한 주소로의 접근이 용이하도록 미리 경로를 정하고 작성해둡니다.
*/

// Global routes
const HOME = "/"; // Home Page
const JOIN = "/join"; // 회원 가입
const LOGIN = "/login"; // 로그인
const LOGOUT = "/logout"; // 로그아웃
const SEARCH = "/search"; // 영상 검색

// Users
const USERS = "/users"; // 사용자와 관련된 주소
const USER_DETAIL = "/:id"; // 사용자 Profile
const EDIT_PROFILE = "/edit-profile"; // 사용자 Profile 수정
const CHANGE_PASSWORD = "/change-password"; // 사용자의 계정 비밀번호 수정
const ME = "/me"; // 본인 Profile

// Videos
const VIDEOS = "/videos"; // 영상들과 관련된 주소
const UPLOAD = "/upload"; // Video Upload
const VIDEO_DETAIL = "/:id"; // Video 시청
const EDIT_VIDEO = "/:id/edit"; // Video 제목, 상세 설명 수정
const DELETE_VIDEO = "/:id/delete"; // Video 삭제

// Social Login
const GITHUB = "/auth/github"; // Github 로그인 요청
const GITHUB_CALLBACK = "/auth/github/callback"; // Github 로그인 응답
const KAKAO = "/auth/kakao"; // KakaoTalk 로그인 요청
const KAKAO_CALLBACK = "/auth/kakao/callback"; // KakaoTalk 로그인 응답
const FACEBOOK = "/auth/facebook"; // Facebook 로그인 요청
const FACEBOOK_CALLBACK = "/auth/facebook/callback"; // Facebook 로그인 응답

// API - 서버와 통신하기 위한 URL
const API = "/api"; // API와 관련된 주소
const REGISTER_VIEW = "/:id/view"; // 영상 시청수 증가 처리
const ADD_COMMENT = "/:id/comment"; // 영상 댓글 추가
const DELETE_COMMENT = "/:id/comment/delete"; // 영상 댓글 삭제

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
  gitHub: GITHUB,
  gitHubCallback: GITHUB_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  deleteComment: DELETE_COMMENT,
};

export default routes;
