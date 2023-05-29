import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClicked';
import FcmToken from './fcmToken/FcmToken';
import Signup from './signup/Signup';
import IngredientsSlice from './Ingredients/IngredientsSlice';
import PrepSlice from './Ingredients/PrepSlice';
import notificationStateSlice from './notification/NotificationStateSlice';
import SelectedByFindIngredientSlice from './Ingredients/SelectedByFindIngredientSlice';
import TempRecipeEditInfoSlice from './RecipeEdit/TempRecipeEditInfoSlice';
import SituationCategory from './RecipeHome/SituationCategory';
import SortCategory from './RecipeHome/SortCategory';
import IsGoToRecipeHome from './RecipeHome/IsGoToRecipeHome';

export const store = configureStore({
  reducer: {
    firstFilterClicked: FirstFilterIsClickedReducer,
    situationCategory: SituationCategory,
    sortCategory: SortCategory,
    fcmToken: FcmToken,
    signUp: Signup,
    ingredients: IngredientsSlice,
    prep: PrepSlice,
    notificationState: notificationStateSlice,
    findIngredientsSelector: SelectedByFindIngredientSlice,
    editRecipeInfo: TempRecipeEditInfoSlice,
    isGoToRecipeHome: IsGoToRecipeHome,
  },
  enhancers: [reactotron.createEnhancer()], //
});
