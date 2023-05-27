import {jsonAPI, multiPartAPI} from './connect/API';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {customImageResizer} from '../utils/CustomIamgeResizer';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NjUyOTcwMywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.uJM2fdN95TOvgQ5IA9DD12X9jg74TDuocx9TRji0SV8',
  },
};

// 프로필 조회
export const getProfile = async username => {
  const url = `/api/user/profile/${username}`;

  return await jsonAPI.get(url, config);
};

export const getMyProfile = async () => {
  const url = '/api/user/profile';

  return await jsonAPI.get(url, config);
};

export const editProfile = async (nickname, description, profileImg) => {
  const url = '/api/user/profile';

  const formdata = new FormData();

  if (nickname != null) {
    await formdata.append('nickname', nickname);
  }

  if (profileImg.uri !== null) {
    const resizedImage = await ImageResizer.createResizedImage(
      profileImg.uri,
      200,
      200,
      'JPEG',
      100,
    );

    var photo = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: profileImg.fileName,
    };
    await formdata.append('profileImg', photo);
  }

  if (description != null) {
    await formdata.append('description', description);
  }

  return await multiPartAPI.patch(url, formdata, config);
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

export const getBoardLikeList = async pageNum => {
  const url = `/api/user/BoardLike?page=${pageNum}`;

  return await jsonAPI.get(url, config);
};

export const getBoardBookmarkList = async (pageNum, sortType) => {
  const url = `/api/user/bookmark/boardList?page=${pageNum}&sortType=${sortType}`;

  return await jsonAPI.get(url, config);
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
