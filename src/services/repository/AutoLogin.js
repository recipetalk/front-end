import EncryptedStorage from 'react-native-encrypted-storage';

export const saveLoginToStorage = async (username, password, isAutoLogin) => {
  try {
    const jsonValue = JSON.stringify({
      username: username,
      password: password,
      isAutoLogin: isAutoLogin,
    });
    await EncryptedStorage.setItem('Login', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadLoginFromStorage = async () => {
  try {
    const data = await EncryptedStorage.getItem('Login');
    return data !== null
      ? JSON.parse(data)
      : {username: '', password: '', isAutoLogin: ''};
  } catch (e) {
    console.log(e);
  }
};

export const deleteLoginToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('Login');
  } catch (e) {
    console.log(e);
  }
};
