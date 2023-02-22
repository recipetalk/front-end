import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';
import FirstFilterIsClickedReducer from './RecipeHome/FirstFilterClickedNum';
import SecondFilterIsClickedReducer from './RecipeHome/SecondFilterClickedNum';

export const store = configureStore({
  reducer: {
    firstFilterClickedNum: FirstFilterIsClickedReducer,
    secondFilterClickedNum: SecondFilterIsClickedReducer,
  },
  enhancers: [reactotron.createEnhancer()], //
});
