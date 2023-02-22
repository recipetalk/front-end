import {createSlice} from '@reduxjs/toolkit';

const FirstFilterClickedNum = createSlice({
  name: 'firstFilterClickedNum',
  initialState: 1,
  reducers: {
    setFirstClickedNum: (state, action) => action.payload,
  },
});

export const {setFirstClickedNum} = FirstFilterClickedNum.actions;
export default FirstFilterClickedNum.reducer;
