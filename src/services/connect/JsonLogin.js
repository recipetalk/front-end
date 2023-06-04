import {jsonAPI, multiPartAPI} from './API';
import {
  loadJwtAccessTokenFromStorage,
  saveJwtAccessTokenToStorage,
} from '../repository/JwtToken';
import {loadLoginFromStorage} from '../repository/AutoLogin';

export const jsonLogin = async (username, password) => {
  try {
    const response = await jsonAPI.post('/auth/login', {
      username: username,
      password: password,
    });
    const accessToken = response.headers.authorization;
    await saveJwtAccessTokenToStorage(accessToken);
    return accessToken;
  } catch (error) {
    // JSON 로그인 에러 처리
    throw error;
  }
};
