import {jsonAPI} from '../connect/API';
import {multiPartAPI} from '../connect/API';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import {loadJwtAccessTokenFromStorage} from '../repository/JwtToken';

const config = async () => {
  const accessToken = await loadJwtAccessTokenFromStorage();

  return {
    headers: {
      Authorization: accessToken,
    },
  };
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
  return await jsonAPI.get(url, await config());
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

  return await multiPartAPI.post(url, data, await config());
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

  return await jsonAPI.post(url, body, await config());
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

  return await multiPartAPI.post(url, data, await config());
};

export const hardRemoveRecipes = async recipeId => {
  const url = `/api/board/recipe/hard/${recipeId}`;

  return await jsonAPI.delete(url, await config());
};

export const getRecipe = async recipeId => {
  const url = `/api/board/recipe/${recipeId}`;

  return await jsonAPI.get(url, await config());
};

export const getRecipeRow = async recipeId => {
  const url = `/api/board/recipe/${recipeId}/recipeRow`;

  return await jsonAPI.get(url, await config());
};

export const getRecipeIngredients = async recipeId => {
  const url = `/api/board/recipe/${recipeId}/recipeIngredient`;

  return await jsonAPI.get(url, await config());
};

export const modifyRecipeBoard = async ({
  title,
  description,
  quantity,
  level,
  time,
  sort,
  secondCategory,
  thumbnail,
  recipeId,
}) => {
  const url = `/api/board/recipe/${recipeId}`;

  let data = new FormData();

  await data.append('title', title);

  if (thumbnail.uri === '') {
    await data.append('isThumbnailDeleted', true);
  } else if (thumbnail.fileName != null) {
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
    await data.append('isThumbnailDeleted', true);
    await data.append('thumbnailImg', image);
  } else {
    await data.append('isThumbnailDeleted', false);
  }

  await data.append('level', level);
  await data.append('durationTime', time);
  await data.append('sort', sort);
  await data.append('description', description);

  await data.append('quantity', quantity);

  if (secondCategory != null) {
    await data.append('situation', secondCategory);
  }
  console.log('modifyRequest : ', data);
  return await multiPartAPI.put(url, data, await config());
};

export const modifyRecipeIngredients = async (recipeId, recipeIngredients) => {
  const url = `/api/board/recipe/${recipeId}/recipeIngredient`;

  const data = recipeIngredients.map(data => ({
    ingredientId: data.ingredientId,
    ingredientName: data.ingredientName,
    quantity: data.quantity,
  }));

  const body = {recipeIngredientRegisterDTOS: data};

  return await jsonAPI.put(url, body, await config());
};

export const modifyRecipeRows = async (recipeId, recipeRow, isLast, index) => {
  const url = `/api/board/recipe/${recipeId}/recipeRow`;

  const body = new FormData();

  body.append('description', recipeRow.description);
  if (recipeRow.photo.fileName !== undefined) {
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

    await body.append('img', image);
  } else {
    if (recipeRow.photo.uri != null && recipeRow.photo.uri != '') {
      body.append('imgUri', recipeRow.photo.uri);
    }
  }

  body.append('isLast', isLast);
  body.append('seqNum', index + 1);
  if (recipeRow.repoId != undefined) {
    body.append('id', recipeRow.repoId);
  }

  console.log('modifyRecipeRow : ', body);
  return await multiPartAPI.patch(url, body, await config());
};

export const RecipeRemoveRequest = async recipeId => {
  const url = `/api/board/recipe/${recipeId}`;

  return await jsonAPI.delete(url, await config());
};

export const getRecipePick = async () => {
  const url = '/api/board/recipe/pick';

  return await jsonAPI.get(url, await config());
};
