import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { DEFAULT_GENRE } from '../../const';
import { MainState } from '../../types/state';
import { getGenres } from '../../utils/utils';
import { changeGenre } from './actions';
import { fetchFilmsAction, fetchPromoFilmAction } from './api-actions';

const mainInitialState: MainState = {
  films: {
    data: [],
    isLoaded: false,
  },
  promo: {
    data: undefined,
    isLoaded: false,
  },
  genres: {
    data: [DEFAULT_GENRE,],
    activeGenre: DEFAULT_GENRE,
  },
};

export const mainSlice = createSlice({
  name: NameSpace.Main,
  initialState: mainInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films.isLoaded = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films.isLoaded = true;
        state.films.data = action.payload;
        state.genres.data = getGenres(state.films.data);
      })

      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promo.isLoaded = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promo.isLoaded = true;
        state.promo.data = action.payload;
      })

      .addCase(changeGenre, (state, action) => {
        state.genres.activeGenre = action.payload;
      });
  },
});
