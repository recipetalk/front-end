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

export const toggleBoardLikeAction = async boardId => {
  const url = `/api/board/${boardId}/boardLike`;

  return await jsonAPI.post(url, null, await config());
};
