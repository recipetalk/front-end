import EncryptedStorage from 'react-native-encrypted-storage';

export const saveLoginToStorage = async (username, password) => {
  try {
    const jsonValue = JSON.stringify({
      username: username,
      password: password,
    });
    await EncryptedStorage.setItem('Login', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadLoginFromStorage = async () => {
  try {
    const data = await EncryptedStorage.getItem('Login');
    return data !== null ? JSON.parse(data) : {username: '', password: ''};
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
