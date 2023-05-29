import {jsonAPI, multiPartAPI} from './connect/API';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NjQ4NjQ5NSwidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.H87eLa-E3ANgBOerI6rFvVDHnYmn18KIQpqI-atykts',
  },
};

// 식재료 손질법 등록
export const addIngredientTrimming = async ingredientInfo => {
  const url = `/api/board/ingredient/${ingredientInfo.ingredientId}/trimming`;

  const body = new FormData();

  await body.append('title', ingredientInfo.title);

  if (
    ingredientInfo.img.photo.uri != null &&
    ingredientInfo.img.photo.uri !== ''
  ) {
    const resizedImage = await ImageResizer.createResizedImage(
      ingredientInfo.img.photo.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: ingredientInfo.img.photo.fileName,
    };

    await body.append('thumbnail', image);
  }
  await body.append('description', ingredientInfo.desc);

  return await multiPartAPI.post(url, body, config);
};

// 식재료 손질법 행 등록
export const addRowIngredientTrimming = async rowIngredientInfo => {
  const url = `/api/board/ingredient/${rowIngredientInfo.ingredientId}/trimming/${rowIngredientInfo.trimmingId}`;
  const body = new FormData();

  await body.append('description', rowIngredientInfo.itemList.description);
  await body.append('trimmingSeq', rowIngredientInfo.itemList.id);

  if (
    rowIngredientInfo.itemList.photo.uri != null &&
    rowIngredientInfo.itemList.photo.uri !== ''
  ) {
    const resizedImage = await ImageResizer.createResizedImage(
      rowIngredientInfo.itemList.photo.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: rowIngredientInfo.itemList.photo.fileName,
    };

    await body.append('img', image);
  }

  return await multiPartAPI.post(url, body, config);
};

export const editIngredientTrimming = async ingredientInfo => {
  const url = `/api/board/ingredient/trimming/${ingredientInfo.trimmingId}`;

  const body = new FormData();

  await body.append('title', ingredientInfo.title);
  await body.append('description', ingredientInfo.description);

  if (
    ingredientInfo.thumbnail.photo.uri != null &&
    ingredientInfo.thumbnail.photo.uri !== ''
  ) {
    const resizedImage = await ImageResizer.createResizedImage(
      ingredientInfo.thumbnail.photo.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: ingredientInfo.thumbnail.photo.fileName,
    };

    await body.append('thumbnail', image);
  }

  await body.append('isThumbnailDeleted', ingredientInfo.isThumbnailDeleted);

  return await multiPartAPI.patch(url, body, config);
};

export const editRowIngredientTrimming = async rowIngredientInfo => {
  const url = `/api/board/ingredient/${rowIngredientInfo.ingredientId}/trimming/${rowIngredientInfo.trimmingId}/row`;
  const body = new FormData();

  await body.append('description', rowIngredientInfo.itemList.description);
  await body.append('trimmingSeq', rowIngredientInfo.itemList.trimmingSeq);
  await body.append('id', rowIngredientInfo.itemList.id);

  if (rowIngredientInfo.itemList.photo.fileName !== undefined) {
    const resizedImage = await ImageResizer.createResizedImage(
      rowIngredientInfo.itemList.photo.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: rowIngredientInfo.itemList.photo.fileName,
    };

    await body.append('img', image);
  } else {
    if (
      rowIngredientInfo.itemList.photo.uri !== null &&
      rowIngredientInfo.itemList.photo.uri !== ''
    ) {
      body.append('imgUri', rowIngredientInfo.itemList.photo.uri);
    }
  }
  await body.append('isImgDeleted', false);
  await body.append('isLast', rowIngredientInfo.isLast);

  return await multiPartAPI.patch(url, body, config);
};

// 식재료 손질법 삭제 | delete

export const getIngredientsPrep = async ingredientId => {
  const url = `/api/board/ingredient/${ingredientId}/trimming?page=0`;

  return await jsonAPI.get(url, config);
};
// 식재료 손질법 상세 조회 | get | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}
export const getIngredientsPrepDetail = async trimmingId => {
  const url = `/api/board/ingredient/trimming/${trimmingId}`;

  return await jsonAPI.get(url, config);
};

// 식재료 손질법 hard 삭제
export const hardDelete = async trimmingId => {
  const url = `/api/board/ingredient/trimming/hard/${trimmingId}`;

  return await jsonAPI.delete(url, config);
};

// 효능 조회
export const getEfficacy = async ingredientId => {
  const url = `/api/board/ingredient/${ingredientId}/description/details`;

  return await jsonAPI.get(url, config);
};

// 입력한 이름을 포함하는 식재료 이름 조회 get
export const getSearchIngredient = async searchValue => {
  const url = `/api/ingredient/${searchValue}`;
  return await jsonAPI.get(url, config);
};

export const registerIngredient = async ingredientsList => {
  const url = '/api/user/ingredient';

  return await jsonAPI.post(url, ingredientsList, config);
};

// 내가 소유한 식재료 조회(페이지)
export const getMyIngredientPage = async type => {
  const url = `/api/user/ingredient?page=0&sort=${type}`;

  return await jsonAPI.get(url, config);
};

export const deleteIngredient = async id => {
  const url = `/api/user/ingredient/${id}`;

  return await jsonAPI.delete(url, config);
};

export const editIngredient = async id => {
  const url = `/api/user/ingredient/${id}`;

  const data = {
    state: '다짐',
    quantity: '1봉',
    expirationDate: '2027-05-01',
  };

  return await jsonAPI.patch(url, data, config);
};

export const getIngredientPrepByUsername = async (
  username,
  sortType,
  offset,
  limit,
) => {
  let url = `/api/board/ingredient/trimming/username/${username}?sortType=${sortType}&offset=${offset}&limit=${limit}`;

  return await jsonAPI.get(url, config);
};

export const getBarcode = async barcode => {
  const url = `/api/product/${barcode}`;

  return await jsonAPI.get(url, config);
};
