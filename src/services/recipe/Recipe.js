import {jsonAPI} from '../connect/API';

const config = {
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiREVWIiwiaXNzIjoic29sdXRpb24ucmVjaXBldGFsayIsImV4cCI6MTY4NjUyOTcwMywidXNlcm5hbWUiOiJraGo3NDU3MDAifQ.uJM2fdN95TOvgQ5IA9DD12X9jg74TDuocx9TRji0SV8',
  },
};

export const getDynamicRecipes = async (
  title,
  sortType,
  sortCategory,
  situationCategory,
  offset,
  limit,
  username,
) => {
  let url = `/api/board/recipe/list?sortType=${sortType}&offset=${offset}&limit=${limit}`;
  if (username != null) {
    url += `&targetUsername=${username}`;
  }

  if (title != null) {
    url += `&title=${title}`;
  }

  if (sortCategory != null) {
    url += `&sortCategory=${sortCategory}`;
  }

  if (situationCategory != null) {
    url += `&situationCategory=${situationCategory}`;
  }

  console.log(url);
  return await jsonAPI.get(url, config);
};
