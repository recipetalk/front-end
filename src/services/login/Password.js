import {jsonAPI} from '../connect/API';

export const requestFindPassword = async (email, username, fcmToken) => {
  const url = '/auth/find/pw';

  const data = {
    email: email,
    username: username,
    fcmToken: fcmToken,
  };

  return await jsonAPI.post(url, data, null);
};

export const requestUpdatePassword = async (email, username, password) => {
  const url = `/auth/reset/pw`;

  const data = {
    email: email,
    username: username,
    password: password,
  };

  return await jsonAPI.patch(url, data, null);
};
