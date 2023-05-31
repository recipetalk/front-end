import EncryptedStorage from 'react-native-encrypted-storage';

const SearchHistoryKey = 'SearchHistory';

export const addSearchItemToStorage = async searchItem => {
  try {
    let list = await loadSearchHistoryListFromStorage(); //일단 불러와
    //존재한다면 제일 삭제 후 제일 처음으로
    //존재하지 않는다면 제일 처음 으로 더하기
    let newData = list.filter(data => data.searchItem !== searchItem);

    if (list.length >= 30) {
      list.pop();
    }
    const item = {searchItem: searchItem};
    newData = [item, ...newData];
    await EncryptedStorage.setItem(SearchHistoryKey, JSON.stringify(newData));
  } catch (e) {
    console.log(e);
  }
};

export const loadSearchHistoryListFromStorage = async () => {
  try {
    const data = await EncryptedStorage.getItem(SearchHistoryKey);
    return data != null ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
  }
};

export const deleteSearchHistoryToStorage = async searchItem => {
  try {
    let loadData = await loadSearchHistoryListFromStorage();
    const newData = loadData.filter(data => data.searchItem !== searchItem);

    await EncryptedStorage.setItem(SearchHistoryKey, JSON.stringify(newData));
  } catch (e) {
    console.log(e);
  }
};

export const deleteAllSearchHistoryToStorage = async () => {
  try {
    await EncryptedStorage.removeItem(SearchHistoryKey);
  } catch (e) {
    console.log(e);
  }
};
