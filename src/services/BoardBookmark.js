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

export const toggleBoardBookmark = async boardId => {
  const url = `/api/board/${boardId}/bookmark`;

  return await jsonAPI.post(url, null, await config());
};
