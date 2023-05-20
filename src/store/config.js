import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClicked';
import SecondFilterIsClickedReducer from './RecipeHome/SecondFilterClicked';
import FcmToken from './fcmToken/FcmToken';
import Signup from './signup/Signup';
import IngredientsSlice from './Ingredients/IngredientsSlice';
import PrepSlice from './Ingredients/PrepSlice';
import notificationStateSlice from './notification/NotificationStateSlice';

export const store = configureStore({
  reducer: {
    firstFilterClicked: FirstFilterIsClickedReducer,
    secondFilterClicked: SecondFilterIsClickedReducer,
    fcmToken: FcmToken,
    signUp: Signup,
    ingredients: IngredientsSlice,
    prep: PrepSlice,
    notificationState: notificationStateSlice,
  },
  enhancers: [reactotron.createEnhancer()], //
});
