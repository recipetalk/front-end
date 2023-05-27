import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getIngredientsPrepDetail} from '../../services/Ingredients';

let nextId = 1;

export const __getPrepDetail = createAsyncThunk(
  'PrepSlice/__getPrepDetail',
  async (payload, thunkAPI) => {
    try {
      const data = await getIngredientsPrepDetail(payload);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      console.log(error);
    }
  },
);

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

    initPrep: (previousState, action) => {
      console.log(previousState, action);
      return previousState;
    },
  },
  extraReducers: {
    [__getPrepDetail.pending.type]: state => {
      console.log(state);
    },
    [__getPrepDetail.fulfilled.type]: (state, action) => {
      console.log(state, action.payload);
      state = action.payload;
      return state;
    },
    [__getPrepDetail.rejected.type]: state => {
      console.log(state);
    },
  },
});

export const {addEmptyPrep, addPrep, registerPrep, deletePrep, initPrep} =
  PrepSlice.actions;
export default PrepSlice.reducer;
