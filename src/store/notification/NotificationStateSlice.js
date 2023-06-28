import {createSlice} from '@reduxjs/toolkit';

const NotificationStateSlice = createSlice({
  name: 'NotificationStateSlice',
  initialState: {value: {hasNew: false, newCount: 0}},
  reducers: {
    exist: state => {
      state.value.hasNew = true;
      state.value.newCount++;
    },
    notExist: state => {
      state.value.hasNew = false;
      state.value.newCount = 0;
    },
  },
});
export const {exist, notExist} = NotificationStateSlice.actions;
export default NotificationStateSlice.reducer;
