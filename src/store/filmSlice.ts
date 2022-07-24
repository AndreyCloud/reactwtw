import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArrCommentGet, ArrFilms, Film } from '../types/films';

type FilmsState = {
  films: ArrFilms;
  favoriteFilms: ArrFilms;
  similar: ArrFilms;
  promoFilm: Film;
  commentFilm: ArrCommentGet;
  filmODR: string;
  sortGenre: string;
  error: string | null;
  loading: boolean;
}

const initialState: FilmsState = {
  films: [],
  favoriteFilms: [],
  similar: [],
  promoFilm: {} as Film,
  commentFilm: [],
  filmODR: 'Overview',
  sortGenre: 'All genres',
  error: null,
  loading: false,
};

type IdToken = {
  id: string,
  token: string
}

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
export const fetchFavoriteFilms = createAsyncThunk<ArrFilms, string, {rejectValue: string}>(
  'films/fetchFavoriteFilms',
  async (token, {rejectWithValue}) => {
    const respons: Response = await fetch('https://8.react.pages.academy/wtw/favorite', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

    if(!respons.ok) {
      return rejectWithValue('Server error!');
    }

    const data = await respons.json();
    return data;
  },
);
export const fetchFavoriteFilmsAdd = createAsyncThunk<Film, IdToken, {rejectValue: string}>(
  'films/fetchFavoriteFilmsAdd',
  async (idToken, {rejectWithValue}) => {

    const {id, token} = idToken;

    const respons = await fetch(`https://8.react.pages.academy/wtw/favorite/${id}/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

    if(!respons.ok) {
      return rejectWithValue('Server error!');
    }

    const data = await respons.json();
    return data;
  },
);
export const fetchFavoriteFilmsDelete = createAsyncThunk<Film, IdToken, {rejectValue: string}>(
  'films/fetchFavoriteFilmsDelete',
  async (idToken, {rejectWithValue}) => {

    const {id, token} = idToken;

    const respons = await fetch(`https://8.react.pages.academy/wtw/favorite/${id}/0`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

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
    const respons: Response = await fetch(`https://8.react.pages.academy/wtw/films/${id}/similar`);

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
    sortGenre(state, action) {
      state.sortGenre = action.payload;
    },
    favoriteClear(state) {
      state.favoriteFilms = [];
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
      .addCase(fetchFavoriteFilms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteFilms.forEach((favorit) => {
          state.films = state.films.map((elem) => elem.id !== favorit.id ? elem : favorit);
        });
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
      .addCase(fetchFavoriteFilmsAdd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteFilmsAdd.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFavoriteFilmsDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoriteFilmsDelete.fulfilled, (state, action) => {
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

export const {chooseODR, sortGenre, favoriteClear} = filmSlice.actions;

export default filmSlice.reducer;
