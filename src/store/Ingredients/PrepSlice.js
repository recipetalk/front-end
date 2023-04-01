import {createSlice} from '@reduxjs/toolkit';

let nextId = 1;
const PrepSlice = createSlice({
  name: 'PrepSlice',
  initialState: [],

  reducers: {
    addEmptyPrep: previousState => {
      return [
        ...previousState,
        {
          id: nextId++,
          title: '',
          desc: '',
          descImg: '',
        },
      ];
    },

    addPrep: (previousState, action) => {
      return previousState.map(item =>
        item.id === action.payload.id
          ? {
              id: action.payload.id,
              title: action.payload.title,
              desc: action.payload.desc,
              descImg: '',
            }
          : item,
      );
    },

    deletePrep: (previousState, action) => {
      return previousState.filter(item => item.id !== action.payload);
    },
  },
});

export const {addEmptyPrep, addPrep, deletePrep} = PrepSlice.actions;
export default PrepSlice.reducer;
