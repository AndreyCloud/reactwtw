import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Login, User } from '../types/films';

export const fetchLogin = createAsyncThunk<User, Login, { rejectValue: string }>(
  'user/fetchLogin',
  async (user, { rejectWithValue }) => {

    const response = await fetch('https://8.react.pages.academy/wtw/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),

    });

    if (!response.ok) {
      return rejectWithValue('Login or password is not correct!');
    }

    const data = await response.json() as User;
    localStorage.setItem('user', JSON.stringify(data.token));

    return data;
  },
);

export const fetchLoginToken = createAsyncThunk<User, string, { rejectValue: string }>(
  'user/fetchLoginToken',
  async (token, { rejectWithValue }) => {

    const response = await fetch('https://8.react.pages.academy/wtw/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token,
      },
    });

    if (!response.ok) {
      return rejectWithValue('Authorization failed!');
    }

    const data = await response.json() as User;
    localStorage.setItem('user', JSON.stringify(data.token));

    return data;
  },
);

type UserState = {
  user: User,
  error: string | null,
  loadingUser: boolean,
}


const initialState: UserState = {
  user: {} as User,
  error: null,
  loadingUser: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userDelete(state){
      localStorage.removeItem('user');
      state.user = {} as User;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingUser = false;
      })
      .addCase(fetchLoginToken.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchLoginToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingUser = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loadingUser = true;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const {userDelete} = userSlice.actions;

export default userSlice.reducer;
