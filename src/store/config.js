import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClicked';
import SecondFilterIsClickedReducer from './RecipeHome/SecondFilterClicked';
import ClickedToRecipeDetail from './RecipeHome/ClickedToRecipeDetail';
import FcmToken from './fcmToken/FcmToken';
import Signup from './signup/Signup';

export const store = configureStore({
  reducer: {
    firstFilterClicked: FirstFilterIsClickedReducer,
    secondFilterClicked: SecondFilterIsClickedReducer,
    clickedToBoardDetail: ClickedToRecipeDetail,
    fcmToken: FcmToken,
    signUp: Signup,
  },
  enhancers: [reactotron.createEnhancer()], //
});
