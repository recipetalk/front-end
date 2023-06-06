import {createSlice} from '@reduxjs/toolkit';

const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState: [
    {
      id: 1,
      ingredientId: '',
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
          id: previousState.length + 1,
          ingredientId: '',
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
        item.id === action.payload.id
          ? {
              id: action.payload.id,
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
      return previousState.filter(item => item.id !== action.payload);
    },

    resetIngredients: (previousState, action) => {
      return [
        {
          id: 1,
          ingredientId: '',
          ingredientName: '',
          ingredientState: '',
          expirationDate: '',
          quantity: '',
          isChecked: false,
        },
      ];
    },
  },
});

export const {
  addEmptyIngredients,
  addIngredients,
  deleteIngredients,
  resetIngredients,
} = IngredientsSlice.actions;
export default IngredientsSlice.reducer;
