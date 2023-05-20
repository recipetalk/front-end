import {jsonAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NjUyOTcwMywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.uJM2fdN95TOvgQ5IA9DD12X9jg74TDuocx9TRji0SV8',
  },
};

export const getParentComment = async (boardId, page) => {
  const url = `/api/board/${boardId}/comment?page=${page}`;

  return await jsonAPI.get(url, config);
};

export const getChildComment = async (boardId, parentId, page) => {
  const url = `/api/board/${boardId}/comment/${parentId}?page=${page}`;

  return await jsonAPI.get(url, config);
};

export const getComment = async commentId => {
  const url = `/api/user/comment/${commentId}`;

  return await jsonAPI.get(url, config);
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
  return await jsonAPI.post(url, data, config);
};

export const removeComment = async (boardId, commentId) => {
  const url = `/api/board/${boardId}/comment/${commentId}`;

  return await jsonAPI.delete(url, config);
};

export const modifyComment = async (boardId, commentId, description) => {
  const url = `/api/board/${boardId}/comment/${commentId}`;

  const data = {
    description: description,
  };

  return await jsonAPI.patch(url, data, config);
};
