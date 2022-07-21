import {configureStore} from '@reduxjs/toolkit';
import filmReducer from './filmSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    film: filmReducer,
    user: userReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
