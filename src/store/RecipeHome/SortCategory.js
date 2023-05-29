import {createSlice} from '@reduxjs/toolkit';

const SortCategory = createSlice({
  name: 'sortCategory',
  initialState: {value: null},
  reducers: {
    setSortCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSortCategory} = SortCategory.actions;
export default SortCategory.reducer;
