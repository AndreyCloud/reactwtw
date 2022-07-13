import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrFilms } from '../types/films';

type FilmsState = {
  films: ArrFilms;
  error: string | null;
  loading: boolean;
}

const initialState: FilmsState = {
  films: [],
  error: null,
  loading: false,
};

export const fetchFilms = createAsyncThunk<ArrFilms, unknown, {rejectValue: string}>(
  'films/fetchFilms',
  async (_, {rejectWithValue}) => {
    const respons = await fetch('https://8.react.pages.academy/wtw/films');

    if(!respons.ok) {
      return rejectWithValue('Server error!');
    }

    const data = await respons.json();
    return data;
  },
);


const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },

});

function isError (action: AnyAction) {
  return action.type.endsWith('rejected');
}

export default filmSlice.reducer;
