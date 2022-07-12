import { createSlice } from '@reduxjs/toolkit';
import { ArrFilms } from '../types/films';

type FilmsState = {
  films: ArrFilms;
}

const initialState: FilmsState = {
  films: [],
};


const filmSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {

  },
});

export default filmSlice.reducer;
