import {createSlice} from '@reduxjs/toolkit';

const FcmToken = createSlice({
  name: 'fcmToken',
  initialState: {
    value: {
      fcmToken: '',
      isListenable: true,
    },
  },
  reducers: {
    setFcmToken: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const {setFcmToken} = FcmToken.actions;
export default FcmToken.reducer;
