import {jsonAPI} from '../connect/API';
import {loadJwtAccessTokenFromStorage} from '../repository/JwtToken';

const config = async () => {
  const accessToken = await loadJwtAccessTokenFromStorage();

  return {
    headers: {
      Authorization: accessToken,
    },
  };
};

export const RequestFcmConnect = async (fcmToken, isListenable) => {
  const url = '/api/connect';
  const data = {fcmToken: fcmToken, isListenable: isListenable};
  console.log(data);
  return await jsonAPI.post(url, data, await config());
};

export const RemoveFcmConnect = async () => {
  const url = '/api/connect';

  return await jsonAPI.delete(url, await config());
};
