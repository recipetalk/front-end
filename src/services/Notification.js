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

export const getNotifications = async pagingNum => {
  const url = `/api/notification?page=${pagingNum}`;

  return await jsonAPI.get(url, await config());
};
