import {jsonAPI} from '../connect/API';
import {multiPartAPI} from '../connect/API';
import ImageResizer from '@bam.tech/react-native-image-resizer';

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

export const requestRegisterRecipe = async ({
  title,
  description,
  quantity,
  level,
  time,
  sort,
  secondCategory,
  thumbnail,
}) => {
  let url = '/api/board/recipe';

  let data = new FormData();

  await data.append('title', title);
  console.log(thumbnail);

  if (thumbnail.uri != null && thumbnail.uri !== '') {
    const resizedImage = await ImageResizer.createResizedImage(
      thumbnail.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: thumbnail.fileName,
    };

    await data.append('thumbnail', image);
  }

  await data.append('level', level);
  await data.append('durationTime', time);
  await data.append('sort', sort);
  await data.append('description', description);

  await data.append('quantity', quantity);

  if (secondCategory != null) {
    await data.append('situationCategory', secondCategory);
  }

  return await multiPartAPI.post(url, data, config);
};

export const requestRegisterRecipeIngredients = async (
  recipeId,
  recipeIngredients,
) => {
  const url = `/api/board/recipe/${recipeId}/recipeIngredient`;

  const data = recipeIngredients.map(data => ({
    ingredientId: data.ingredientId,
    ingredientName: data.ingredientName,
    quantity: data.quantity,
  }));

  const body = {recipeIngredientRegisterDTOS: data};

  return await jsonAPI.post(url, body, config);
};

export const requestRegisterRecipeRows = async (recipeId, recipeRow) => {
  const url = `/api/board/recipe/${recipeId}/recipeRow`;

  const data = new FormData();

  await data.append('description', recipeRow.description);

  if (recipeRow.photo.uri !== '') {
    const resizedImage = await ImageResizer.createResizedImage(
      recipeRow.photo.uri,
      1000,
      1000,
      'JPEG',
      100,
    );

    const image = {
      uri: resizedImage.uri,
      type: 'image/jpeg',
      name: recipeRow.photo.fileName,
    };

    await data.append('img', image);
  }
  await data.append('seqNum', recipeRow.id);

  console.log('request: ', data);

  return await multiPartAPI.post(url, data, config);
};

export const hardRemoveRecipes = async recipeId => {
  const url = `/api/board/recipe/hard/${recipeId}`;

  return await jsonAPI.delete(url, config);
};

export const getRecipe = async recipeId => {
  const url = `/api/board/recipe/${recipeId}`;

  return await jsonAPI.get(url, config);
};

export const getRecipeRow = async recipeId => {
  const url = `/api/board/recipe/${recipeId}/recipeRow`;

  return await jsonAPI.get(url, config);
};

export const getRecipeIngredients = async recipeId => {
  const url = `/api/board/recipe/${recipeId}/recipeIngredient`;

  return await jsonAPI.get(url, config);
};
