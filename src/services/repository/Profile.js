import EncryptedStorage from 'react-native-encrypted-storage';

export const saveProfileToStorage = async (
  nickname,
  description,
  profileImageURI,
) => {
  try {
    const jsonValue = JSON.stringify({
      nickname: nickname,
      description: description,
      profileImageURI: profileImageURI,
    });
    await EncryptedStorage.setItem('ProfileInfo', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadProfileToStorage = async () => {
  try {
    const data = await EncryptedStorage.getItem('ProfileInfo');
    return data !== null
      ? JSON.parse(data)
      : {nickname: '', description: '', profileImageURI: null};
  } catch (e) {
    console.log(e);
  }
};

export const deleteProfileToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('ProfileInfo');
  } catch (e) {
    console.log(e);
  }
};
