import {createSlice} from '@reduxjs/toolkit';

const SearchValue = createSlice({
  name: 'searchValue',
  initialState: {value: null},
  reducers: {
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSearchValue} = SearchValue.actions;
export default SearchValue.reducer;
