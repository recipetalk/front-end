import {jsonAPI} from './connect/API';
import {loadJwtAccessTokenFromStorage} from './repository/JwtToken';

const config = async () => {
  const accessToken = await loadJwtAccessTokenFromStorage();

  return {
    headers: {
      Authorization: accessToken,
    },
  };
};

export const reportComment = async commentId => {
  const url = '/api/user/report';

  const data = {description: `commentId=${commentId}`};

  return await jsonAPI.post(url, data, await config());
};

export const reportRecipe = async recipeId => {
  const url = '/api/user/report';

  const data = {description: `recipeId=${recipeId}`};

  return await jsonAPI.post(url, data, await config());
};

export const reportPreps = async trimmingId => {
  const url = '/api/user/report';

  const data = {description: `trimmingId=${trimmingId}`};

  return await jsonAPI.post(url, data, await config());
};

export const reportUser = async username => {
  const url = '/api/user/report';

  const data = {description: `username=${username}`};

  return await jsonAPI.post(url, data, await config());
};
