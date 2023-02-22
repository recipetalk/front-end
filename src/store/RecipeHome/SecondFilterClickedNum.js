import {createSlice} from '@reduxjs/toolkit';

const SecondFilterClickedNum = createSlice({
  name: 'secondFilterClickedNum',
  initialState: 1,
  reducers: {
    setSecondClickedNum: (state, action) => action.payload,
  },
});

export const {setSecondClickedNum} = SecondFilterClickedNum.actions;
export default SecondFilterClickedNum.reducer;
