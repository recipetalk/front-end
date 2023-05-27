import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClicked';
import SecondFilterIsClickedReducer from './RecipeHome/SecondFilterClicked';
import FcmToken from './fcmToken/FcmToken';
import Signup from './signup/Signup';
import IngredientsSlice from './Ingredients/IngredientsSlice';
import PrepSlice from './Ingredients/PrepSlice';
import notificationStateSlice from './notification/NotificationStateSlice';
import SelectedByFindIngredientSlice from './Ingredients/SelectedByFindIngredientSlice';
import TempRecipeEditInfoSlice from './RecipeEdit/TempRecipeEditInfoSlice';

export const store = configureStore({
  reducer: {
    firstFilterClicked: FirstFilterIsClickedReducer,
    secondFilterClicked: SecondFilterIsClickedReducer,
    fcmToken: FcmToken,
    signUp: Signup,
    ingredients: IngredientsSlice,
    prep: PrepSlice,
    notificationState: notificationStateSlice,
    findIngredientsSelector: SelectedByFindIngredientSlice,
    editRecipeInfo: TempRecipeEditInfoSlice,
  },
  enhancers: [reactotron.createEnhancer()], //
});
