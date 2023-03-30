import {createSlice} from '@reduxjs/toolkit';

let nextId = 1;

const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState: [],

  reducers: {
    addEmptyIngredients: previousState => {
      return [
        ...previousState,
        {
          id: nextId++,
          name: '',
          status: '',
          expirationDate: '',
          amount: '',
          isChecked: false,
        },
      ];
    },

    addIngredients: (previousState, action) => {},

    deleteIngredients: (previousState, action) => {
      return previousState.filter(item => item.id !== action.payload);
    },
  },
});

export const {addEmptyIngredients, addIngredients, deleteIngredients} =
  IngredientsSlice.actions;
export default IngredientsSlice.reducer;
