import {jsonAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4Mzg4MDg3MywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.T85g3E3LYQB_xsigXVsdsqN-MbY1yNX90qNOEmCyd70',
  },
};

// 프로필 조회
export const getProfile = async username => {
  const url = `/api/user/profile/${username}`;

  return await jsonAPI.get(url, config);
};

export const getCommentHistory = async page => {
  const url = `/api/user/comment?page=${page}`;

  return await jsonAPI.get(url, config);
};

export const getFollowing = async (username, page) => {
  const url = `/api/user/following/${username}?page=${page}`;

  return await jsonAPI.get(url, config);
};

export const getBlockedUser = async page => {
  const url = `/api/user/block?page=${page}`;

  return await jsonAPI.get(url, config);
};

export const requestRegisterBlockedUser = async username => {
  const url = '/api/user/block';
  const data = {blockUsername: username};

  return await jsonAPI.post(url, data, config);
};

export const requestRemoveBlockUser = async username => {
  const url = `/api/user/block/${username}`;

  return await jsonAPI.delete(url, config);
};

export const getSingleFollowing = async username => {
  const url = `/api/user/follow/${username}`;

  return await jsonAPI.get(url, config);
};

export const requestRegisterFollowing = async username => {
  const url = `/api/user/follow/${username}`;

  return await jsonAPI.post(url, undefined, config);
};

export const requestRemoveFollowing = async username => {
  const url = `/api/user/follow/${username}`;

  return await jsonAPI.delete(url, config);
};

export const getFollower = async (username, page) => {
  const url = `/api/user/follower/${username}?page=${page}`;

  return await jsonAPI.get(url, config);
};

// 프로필 수정
export const editProfile = async ({
  nickname,
  username,
  description,
  profileImg,
}) => {
  const url = '/api/user/profile';

  return await jsonAPI.patch(
    url,
    {nickname, username, description, profileImg},
    config,
  );
};

// 회원 탈퇴
export const deleteUser = async () => {
  const url = '/api/user';
};

// 유저 팔로우 등록
export const followUser = async username => {
  const url = '/api/user/follow/test';

  return await jsonAPI.post(url, config);
};

// 유저 팔로우 삭제
export const unFollowUser = async username => {
  const url = `/api/user/follow/${username}`;

  return await jsonAPI.delete(url, config);
};

// 유저 팔로우 조회
export const getFollowUser = async username => {
  const url = `/api/user/follow/${username}?page=0`;

  return await jsonAPI.get(url, config);
};
