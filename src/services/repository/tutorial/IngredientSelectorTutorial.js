import EncryptedStorage from 'react-native-encrypted-storage';

export const saveIngredientTutorial = async isPass => {
  try {
    const jsonValue = JSON.stringify({
      isValid: isPass,
    });
    await EncryptedStorage.setItem('ingredient_tutorial', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadIngredientTutorial = async () => {
  try {
    const data = await EncryptedStorage.getItem('ingredient_tutorial');
    return data != null ? JSON.parse(data) : {isValid: false};
  } catch (e) {
    console.log(e);
  }
};

export const deleteIngredientToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('ingredient_tutorial');
  } catch (e) {
    console.log(e);
  }
};

export const saveIngredientRecipeTutorial = async isPass => {
  try {
    const jsonValue = JSON.stringify({
      isValid: isPass,
    });
    await EncryptedStorage.setItem('ingredient_recipe_tutorial', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const loadIngredientRecipeTutorial = async () => {
  try {
    const data = await EncryptedStorage.getItem('ingredient_recipe_tutorial');
    return data != null ? JSON.parse(data) : {isValid: false};
  } catch (e) {
    console.log(e);
  }
};

export const deleteIngredientRecipeToStorage = async () => {
  try {
    await EncryptedStorage.removeItem('ingredient_recipe_tutorial');
  } catch (e) {
    console.log(e);
  }
};
