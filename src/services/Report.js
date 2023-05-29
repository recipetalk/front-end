import {jsonAPI} from './connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NjUyOTcwMywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.uJM2fdN95TOvgQ5IA9DD12X9jg74TDuocx9TRji0SV8',
  },
};

export const reportComment = async commentId => {
  const url = '/api/user/report';

  const data = {description: `commentId=${commentId}`};

  return await jsonAPI.post(url, data, config);
};

export const reportRecipe = async recipeId => {
  const url = '/api/user/report';

  const data = {description: `recipeId=${recipeId}`};

  return await jsonAPI.post(url, data, config);
};
