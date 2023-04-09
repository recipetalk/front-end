import {jsonAPI, multiPartAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4MjE3NzcwNCwidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.GBhX0BBqh2zrNeBkMx-ceSUtqN5K4nP0JNPv5BvQsio',
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

// 식재료 손질법 행 등록 | post | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}
export const addRowIngredientTrimming = async itemList => {
  const url = '/api/board/ingredient/1/trimming/2';

  const body = new FormData();
  body.append('dtos', {
    dtos: itemList,
  });

  return await multiPartAPI.post(url, body, config);
};

// 식재료 손질법 수정 | patch | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}

// 식재료 손질법 행 수정 | patch | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}/row

// 식재료 손질법 삭제 | delete

// 식재료 통한 식재료 손질법 조회 | get | /api/board/ingredient/{ingredientId}/trimming
export const getTest = async ingredientId => {
  const url = `/api/board/ingredient/${ingredientId}/trimming`;

  return await jsonAPI.post(url, config);
};
// 식재료 손질법 상세 조회 | get | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}

// 효능 조회 | get | /api/board/ingredient/{ingredientId}/description/details
