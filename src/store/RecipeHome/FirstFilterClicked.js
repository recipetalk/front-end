import {createSlice} from '@reduxjs/toolkit';

const FirstFilterClicked = createSlice({
  name: 'firstFilterClicked',
  initialState: {value: {key: 1, title: '최신'}},
  reducers: {
    setFirstClicked: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setFirstClicked} = FirstFilterClicked.actions;
export default FirstFilterClicked.reducer;
