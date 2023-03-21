import {jsonAPI, multiPartAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4MTcxNzMwMCwidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.moTZHq68gejLizHQJZEn-PzoMWi25lbA0GOf3r0ERow',
  },
};

// 식재료 손질법 등록 | post | /api/board/ingredient/{ingredientId}/trimming
export const addIngredientTrimming = async ingredientId => {
  // const url = `/api/board/ingredient/${ingredientId}/trimming`;

  const url = '/api/board/ingredient/1/trimming';
  const formData = new FormData();

  formData.append('title', 'title');
  formData.append('thumbnail', 'file.png');
  formData.append('description', 'description');

  return await multiPartAPI.post(url, formData, config);
};

// 식재료 손질법 행 등록 | post | /api/board/ingredient/{ingredientId}/trimming/{trimmingId}

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
