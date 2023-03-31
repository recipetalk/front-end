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

    addIngredients: (previousState, action) => {
      return previousState.map(item =>
        item.id === action.payload.id
          ? {
              id: action.payload.id,
              name: action.payload.name,
              status: action.payload.status,
              expirationDate: action.payload.expirationDate,
              amount: action.payload.amount,
              isChecked: true,
            }
          : item,
      );
    },

    deleteIngredients: (previousState, action) => {
      return previousState.filter(item => item.id !== action.payload);
    },
  },
});

export const {addEmptyIngredients, addIngredients, deleteIngredients} =
  IngredientsSlice.actions;
export default IngredientsSlice.reducer;
