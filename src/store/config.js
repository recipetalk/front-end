import {configureStore} from '@reduxjs/toolkit';
import reactotron from '../../config';

export const store = configureStore({
  reducer: {},
  enhancers: [reactotron.createEnhancer()], //
});
