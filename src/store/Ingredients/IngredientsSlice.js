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
      isEditable: true,
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
          isEditable: true,
        },
      ];
    },
    addNewBarcodeInfo: (state, action) => {
      // if (state.length <= 1) {
      //   return [
      //     {
      //       id: 1,
      //       ingredientId: action.payload.ingredientId,
      //       ingredientName: action.payload.productName,
      //       ingredientState: '',
      //       expirationDate: '',
      //       quantity: '',
      //       isChecked: false,
      //       isEditable: false,
      //     },
      //   ];
      // } else {
      return [
        ...state,
        {
          id: state.length + 1,
          ingredientId: action.payload.ingredientId,
          ingredientName: action.payload.productName,
          ingredientState: '',
          expirationDate: '',
          quantity: '',
          isChecked: false,
          isEditable: false,
        },
      ];
      //}
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
              isEditable: item.isEditable,
            }
          : item,
      );
    },

    deleteIngredients: (previousState, action) => {
      console.log('previousState : ', previousState);
      console.log('action payload ', action.payload);
      let newArr = previousState.filter(item => {
        if (item.id !== action.payload) {
          console.log('target : ', item.id);
        }
        return item.id !== action.payload;
      });
      console.log(newArr);
      return newArr;
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
          isEditable: true,
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
  addNewBarcodeInfo,
} = IngredientsSlice.actions;
export default IngredientsSlice.reducer;
