import {createSlice} from '@reduxjs/toolkit';

const ClickedToRecipeDetail = createSlice({
  name: 'ClickedToRecipeDetail',
  initialState: {value: {recipeId: -1}},
  reducers: {
    setClickedToRecipeDetail: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const {setClickedToRecipeDetail} = ClickedToRecipeDetail.actions;
export default ClickedToRecipeDetail.reducer;
