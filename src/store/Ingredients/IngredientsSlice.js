import {createSlice} from '@reduxjs/toolkit';

const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState: [
    {
      ingredientId: 1,
      ingredientName: '',
      ingredientState: '',
      expirationDate: '',
      quantity: '',
      isChecked: false,
    },
  ],

  reducers: {
    addEmptyIngredients: (previousState, action) => {
      return [
        ...previousState,
        {
          ingredientId: previousState.length + 1,
          ingredientName: '',
          ingredientState: '',
          expirationDate: '',
          quantity: '',
          isChecked: false,
        },
      ];
    },

    addIngredients: (previousState, action) => {
      return previousState.map(item =>
        item.ingredientId === action.payload.ingredientId
          ? {
              ingredientId: action.payload.ingredientId,
              ingredientName: action.payload.ingredientName,
              ingredientState: action.payload.ingredientState,
              expirationDate: action.payload.expirationDate,
              quantity: action.payload.quantity,
              isChecked: action.payload.isChecked,
            }
          : item,
      );
    },

    deleteIngredients: (previousState, action) => {
      return previousState.filter(item => item.ingredientId !== action.payload);
    },
  },
});

export const {addEmptyIngredients, addIngredients, deleteIngredients} =
  IngredientsSlice.actions;
export default IngredientsSlice.reducer;
