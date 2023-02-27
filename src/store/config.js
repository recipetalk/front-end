import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClicked';
import SecondFilterIsClickedReducer from './RecipeHome/SecondFilterClicked';
import ClickedToRecipeDetail from './RecipeHome/ClickedToRecipeDetail';

export const store = configureStore({
  reducer: {
    firstFilterClicked: FirstFilterIsClickedReducer,
    secondFilterClicked: SecondFilterIsClickedReducer,
    clickedToBoardDetail: ClickedToRecipeDetail,
  },
  enhancers: [reactotron.createEnhancer()], //
});
