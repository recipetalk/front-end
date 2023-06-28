import {jsonAPI} from './connect/API';
import {loadJwtAccessTokenFromStorage} from './repository/JwtToken';

const config = async () => {
  const accessToken = await loadJwtAccessTokenFromStorage();

  return {
    headers: {
      Authorization: accessToken,
    },
  };
};

export const getParentComment = async (boardId, page) => {
  const url = `/api/board/${boardId}/comment?page=${page}`;

  return await jsonAPI.get(url, await config());
};

export const getChildComment = async (boardId, parentId, page) => {
  const url = `/api/board/${boardId}/comment/${parentId}?page=${page}`;

  return await jsonAPI.get(url, await config());
};

export const getComment = async commentId => {
  const url = `/api/user/comment/${commentId}`;

  return await jsonAPI.get(url, await config());
};

export const registerComment = async (
  boardId,
  description,
  parentCommentId,
) => {
  const url = `/api/board/${boardId}/comment`;
  const data = {
    description: description,
    parentCommentId: parentCommentId === undefined ? 'null' : parentCommentId,
  };
  return await jsonAPI.post(url, data, await config());
};

export const removeComment = async (boardId, commentId) => {
  const url = `/api/board/${boardId}/comment/${commentId}`;

  return await jsonAPI.delete(url, await config());
};

export const modifyComment = async (boardId, commentId, description) => {
  const url = `/api/board/${boardId}/comment/${commentId}`;

  const data = {
    description: description,
  };

  return await jsonAPI.patch(url, data, await config());
};
