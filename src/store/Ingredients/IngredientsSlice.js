import {createSlice} from '@reduxjs/toolkit';

const IngredientsSlice = createSlice({
  name: 'IngredientsSlice',
  initialState: [],

  reducers: {
    addIngredients: (previousState, action) => {
      return [
        ...previousState,
        {
          id: action.payload.id,
          name: action.payload.name,
          status: action.payload.status,
          expirationDate: action.payload.expirationDate,
          amount: action.payload.amount,
        },
      ];
    },

    deleteIngredients: (previousState, action) => {
      return previousState.filter(item => item.id !== action.payload);
    },
  },
});

export const {addIngredients, deleteIngredients} = IngredientsSlice.actions;
export default IngredientsSlice.reducer;
