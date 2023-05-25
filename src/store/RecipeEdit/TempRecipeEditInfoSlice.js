import {createSlice} from '@reduxjs/toolkit';

const TempRecipeEditInfoSlice = createSlice({
  name: 'TempRecipeEditInfoSlice',
  initialState: {
    recipeId: null,
    title: null,
    description: null,
    quantity: 'ONE',
    level: '아무나',
    time: 'FIVE_MINUTES',
    sort: null,
    situationCategory: null,
    thumbnail: {uri: ''},
    recipeIngredients: [
      {
        key: 1,
        ingredientName: null,
        ingredientId: null,
        quantity: null,
      },

    ],
    recipeRows: [
      {
        id: 1,
        description: null,
        photo: {uri: ''},
      },
    ],
  },

  reducers: {
    setRecipeBoard: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.quantity = action.payload.quantity;
      state.level = action.payload.level;
      state.sort = action.payload.sort;
      state.time = action.payload.time;
      state.situationCategory = action.payload.situationCategory;
      state.thumbnail = action.payload.thumbnail;
      state.boardId = action.payload.boardId;
    },
    setRecipeIngredients: (state, action) => {
      state.recipeIngredients = action.payload;
    },
    setRecipeRows: (state, action) => {
      state.recipeRows = action.payload;
    },
    initRecipe: state => {
      state.boardId = null;
      state.boardId = null;
      state.title = null;
      state.description = null;
      state.quantity = 'ONE';
      state.level = '아무나';
      state.time = 'FIVE_MINUTES';
      state.sort = null;
      state.situationCategory = null;
      state.thumbnail = {uri: ''};
      state.recipeIngredients = [
        {
          key: 1,
          ingredientName: null,
          ingredientId: null,
          quantity: null,
        },
      ];
      state.recipeRows = [
        {
          id: 1,
          description: null,
          photo: {uri: ''},
        },
      ];
    },
    setEditRecipeBoardId: (state, action) => {
      state.boardId = action.payload;
    },
    setEditRecipeTitle: (state, action) => {
      state.title = action.payload;
    },
    setEditRecipeDescription: (state, action) => {
      state.description = action.payload;
    },
    setEditRecipeQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setEditRecipeLevel: (state, action) => {
      state.level = action.payload;
    },
    setEditRecipeSort: (state, action) => {
      state.sort = action.payload;
    },
    setEditRecipeSituationCategory: (state, action) => {
      state.situationCategory = action.payload;
    },
    setEditRecipeTime: (state, action) => {
      state.time = action.payload;
    },
    setEditRecipeThumbnail: (state, action) => {
      state.thumbnail = action.payload;
    },
    setEditRecipeRows: (state, action) => {
      state.recipeRows = action.payload;
    },
    removeRecipeIngredients: (state, action) => {
      let newArr = state.recipeIngredients.filter(
        (row, itemIndex) => action.payload.index !== itemIndex,
      );
      state.recipeIngredients = newArr;
    },
    updateRecipeIngredientWithIndex: (state, action) => {
      let newArr = [...state.recipeIngredients];
      newArr[action.payload.index][action.payload.property] =
        action.payload.text;

      state.recipeIngredients = newArr;
    },
    removeRecipeRow: (state, action) => {
      state.recipeRows = state.recipeRows.filter(
        (row, itemIndex) => action.payload.index !== itemIndex,
      );
    },
    updateRecipeRowWithIndex: (state, action) => {
      let newArr = [...state.recipeRows];
      newArr[action.payload.index][action.payload.property] =
        action.payload.text;

      state.recipeRows = newArr;
    },
  },
});

export const {
  setRecipeBoard,
  setRecipeIngredients,
  setRecipeRows,
  initRecipe,
  setEditRecipeTitle,
  setEditRecipeDescription,
  setEditRecipeQuantity,
  setEditRecipeLevel,
  setEditRecipeSort,
  setEditRecipeSituationCategory,
  setEditRecipeTime,
  setEditRecipeThumbnail,
  setEditRecipeRows,
  updateRecipeIngredientWithIndex,
  removeRecipeRow,
  updateRecipeRowWithIndex,
} = TempRecipeEditInfoSlice.actions;
export default TempRecipeEditInfoSlice.reducer;
