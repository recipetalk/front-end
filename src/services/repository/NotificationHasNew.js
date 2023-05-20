import EncryptedStorage from 'react-native-encrypted-storage';

export const setNotificationHasNew = async bool => {
  try {
    const jsonValue = JSON.stringify({
      hasNew: bool,
    });
    await EncryptedStorage.setItem('Notification-has-new', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const isNotificationHasNew = async () => {
  try {
    const data = await EncryptedStorage.getItem('Notification-has-new');
    return data !== null ? JSON.parse(data) : {hasNew: false};
  } catch (e) {
    console.log(e);
  }
};
