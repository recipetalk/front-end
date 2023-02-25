import {createSlice} from '@reduxjs/toolkit';

const SecondFilterClicked = createSlice({
  name: 'secondFilterClicked',
  initialState: {value: {id: 1, title: '한식'}},
  reducers: {
    setSecondClicked: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSecondClicked} = SecondFilterClicked.actions;
export default SecondFilterClicked.reducer;
