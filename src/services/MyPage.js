import {jsonAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4MTcxNzMwMCwidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.moTZHq68gejLizHQJZEn-PzoMWi25lbA0GOf3r0ERow',
  },
};

// 프로필 조회
export const getProfile = async username => {
  const url = `/api/user/profile/${username}`;

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

// 사용자 차단 등록
export const blockUser = async () => {
  const url = '/api/user/block';

  return await jsonAPI.post(
    url,
    {
      blockUsername: 'test',
    },
    config,
  );
};

// 차단한 사용자 조회
export const getBlockUser = async () => {
  const url = '/api/user/block?page=0';

  return await jsonAPI.get(url, config);
};

// 사용자 차단 삭제
export const deleteBlockUser = async () => {
  const url = '/api/user/block';

  return await jsonAPI.delete(
    url,
    {
      blockUsername: 'test',
    },
    config,
  );
};
