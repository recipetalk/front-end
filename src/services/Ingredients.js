import {jsonAPI, multiPartAPI} from './connect/API';

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

  body.append('title', ingredientInfo.title);
  // body.append('thumbnail', ingredientInfo.img);
  body.append('description', ingredientInfo.desc);

  return await multiPartAPI.post(url, body, config);
};

// 식재료 손질법 행 등록
export const addRowIngredientTrimming = async rowIngredientInfo => {
  const url = `/api/board/ingredient/${rowIngredientInfo.ingredientId}/trimming/${rowIngredientInfo.trimmingId}`;
  const body = new FormData();

  body.append('description', rowIngredientInfo.itemList.description);
  body.append('trimmingSeq', rowIngredientInfo.itemList.id);

  return await multiPartAPI.post(url, body, config);
};

// 식재료 손질법 수정 | patch | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}

// 식재료 손질법 행 수정 | patch | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}/row

// 식재료 손질법 삭제 | delete

// 식재료 통한 식재료 손질법 조회
export const getIngredientsPrep = async ingredientId => {
  const url = `/api/board/ingredient/${ingredientId}/trimming?page=0`;

  return await jsonAPI.get(url, config);
};
// 식재료 손질법 상세 조회 | get | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}

// 효능 조회
export const getEfficacy = async ingredientId => {
  const url = `/api/board/ingredient/${ingredientId}/description/details`;

  return await jsonAPI.get(url, config);
};

// 입력한 이름을 포함하는 식재료 이름 조회 get
export const getSearchIngredient = async searchValue => {
  const url = `/api/ingredient/search/${searchValue}`;
  return await jsonAPI.get(url, config);
};

export const registerIngredient = async ingredientsList => {
  const url = '/api/user/ingredient';
  console.log('data is :::', ingredientsList);

  return await jsonAPI.post(url, ingredientsList, config);
};

// 내가 소유한 식재료 조회(페이지)
export const getMyIngredientPage = async () => {
  const url = '/api/user/ingredient?page=0&sort=new';

  return await jsonAPI.get(url, config);
};

export const deleteIngredient = async id => {
  const url = `/api/user/ingredient/${id}`;

  return await jsonAPI.delete(url, config);
};
