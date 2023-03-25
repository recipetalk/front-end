import {createSlice} from '@reduxjs/toolkit';

const Signup = createSlice({
  name: 'signUp',
  initialState: {
    value: {
      username: '',
      password: '',
      email: '',
      nickname: '',
    },
  },
  reducers: {
    setSignup: (state, action) => {
      state.value = action.payload;
    },
    setId: (state, action) => {
      state.value.username = action.payload;
    },
    setPassword: (state, action) => {
      state.value.password = action.payload;
    },
    setEmail: (state, action) => {
      state.value.email = action.payload;
    },
    setNickname: (state, action) => {
      state.value.nickname = action.payload;
    },
    clear: state => {
      state.value.username = '';
      state.value.email = '';
      state.value.password = '';
      state.value.nickname = '';
    },
  },
});
export const {clear, setSignup, setId, setPassword, setEmail, setNickname} =
  Signup.actions;
export default Signup.reducer;
