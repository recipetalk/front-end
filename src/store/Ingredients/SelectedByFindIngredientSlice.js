import {createSlice} from '@reduxjs/toolkit';

const SelectedByFindIngredientSlice = createSlice({
  name: 'SelectedByFindIngredientSlice',
  initialState: {
    ingredientId: null,
    ingredientName: null,
    index: null,
  },

  reducers: {
    setSaveIngredientToTarget: (state, action) => {
      state.ingredientId = action.payload.ingredientId;
      state.ingredientName = action.payload.ingredientName;
      state.index = action.payload.index;
    },

    initSaveIngredientToTarget: state => {
      state.ingredientId = null;
      state.ingredientName = null;
      state.index = null;
    },
  },
});

export const {setSaveIngredientToTarget, initSaveIngredientToTarget} =
  SelectedByFindIngredientSlice.actions;
export default SelectedByFindIngredientSlice.reducer;
