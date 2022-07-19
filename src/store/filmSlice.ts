import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrCommentGet, ArrFilms, Film } from '../types/films';

type FilmsState = {
  films: ArrFilms;
  similar: ArrFilms;
  promoFilm: Film;
  commentFilm: ArrCommentGet;
  filmODR: string;
  error: string | null;
  loading: boolean;
}

const initialState: FilmsState = {
  films: [],
  similar: [],
  promoFilm: {} as Film,
  commentFilm: [],
  filmODR: 'Overview',
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
export const fetchFilmPromo = createAsyncThunk<Film, unknown, {rejectValue: string}>(
  'films/fetchFilmPromo',
  async (_, {rejectWithValue}) => {
    const respons = await fetch('https://8.react.pages.academy/wtw/promo');

    if(!respons.ok) {
      return rejectWithValue('Server error!');
    }

    const data = await respons.json();
    return data;
  },
);
export const fetchSimilar = createAsyncThunk<ArrFilms, string, {rejectValue: string}>(
  'films/fetchSimilar',
  async (id, {rejectWithValue}) => {
    const respons = await fetch(`https://8.react.pages.academy/wtw/films/${id}/similar`);

    if(!respons.ok) {
      return rejectWithValue('Server error!');
    }

    const data = await respons.json();
    return data;
  },
);
export const fetchComment = createAsyncThunk<ArrCommentGet, string, {rejectValue: string}>(
  'films/fetchComment',
  async (id, {rejectWithValue}) => {
    const respons = await fetch(`https://8.react.pages.academy/wtw/comments/${id}`);

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
  reducers: {
    chooseODR(state, action) {
      state.filmODR = action.payload;
    },
  },
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
      .addCase(fetchFilmPromo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilmPromo.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSimilar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilar.fulfilled, (state, action) => {
        state.similar = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.commentFilm = action.payload;
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

export const {chooseODR} = filmSlice.actions;

export default filmSlice.reducer;
