import {createSlice} from '@reduxjs/toolkit';

const IsGoToRecipeHome = createSlice({
  name: 'isGoToRecipeHome',
  initialState: {value: false},
  reducers: {
    setGoToRecipeHome: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setGoToRecipeHome} = IsGoToRecipeHome.actions;
export default IsGoToRecipeHome.reducer;
