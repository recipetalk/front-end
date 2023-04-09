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
          trimmingSeq: nextId++,
          description: '',
          img: '',
        },
      ];
    },

    addPrep: (previousState, action) => {
      return previousState.map(item =>
        item.trimmingSeq === action.payload.trimmingSeq
          ? {
              trimmingSeq: action.payload.trimmingSeq,
              description: action.payload.description,
              img: action.payload.img,
            }
          : item,
      );
    },

    registerPrep: (previousState, action) => {
      console.log(`final data ${JSON.stringify(action.payload)}`);
    },

    deletePrep: (previousState, action) => {
      return previousState.filter(item => item.trimmingSeq !== action.payload);
    },
  },
});

export const {addEmptyPrep, addPrep, registerPrep, deletePrep} =
  PrepSlice.actions;
export default PrepSlice.reducer;
