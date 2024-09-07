import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://task-onezero-server-2.onrender.com/api/v1/menu');
      return response.data.data.categories;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
    selectedCategory: 'all'
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { setCategory } = menuSlice.actions;
export default menuSlice.reducer;
