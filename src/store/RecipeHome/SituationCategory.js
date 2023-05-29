import {createSlice} from '@reduxjs/toolkit';

const SituationCategory = createSlice({
  name: 'situationCategory',
  initialState: {value: null},
  reducers: {
    setSituationCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSituationCategory} = SituationCategory.actions;
export default SituationCategory.reducer;
