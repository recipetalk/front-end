import EncryptedStorage from 'react-native-encrypted-storage';

export const saveJwtAccessTokenToStorage = async accessToken => {
  try {
    const jsonValue = JSON.stringify(accessToken);
    await EncryptedStorage.setItem('jwtAccess', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadJwtAccessTokenFromStorage = async () => {
  try {
    const data = await EncryptedStorage.getItem('jwtAccess');
    return data != null ? JSON.parse(data) : null;
  } catch (e) {
    console.log(e);
  }
};

export const deleteJwtAccessTokenToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('jwtAccess');
  } catch (e) {
    console.log(e);
  }
};

export const saveJwtRefreshToStorage = async refreshToken => {
  try {
    const jsonValue = JSON.stringify(refreshToken);
    await EncryptedStorage.setItem('jwtRefresh', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadJwtRefreshTokenFromStorage = async () => {
  try {
    return await EncryptedStorage.getItem('jwtRefresh');
  } catch (e) {
    console.log(e);
  }
};

export const deleteJwtRefreshTokenToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('jwtRefresh');
  } catch (e) {
    console.log(e);
  }
};
