import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CurrentFilmState } from '../../types/state';
import {
  fetchCurrentFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction,
  sendReviewAction,
} from './api-actions';

const currentFilmInitialState: CurrentFilmState = {
  film: {
    data: undefined,
    isLoaded: false,
  },
  similar: {
    data: [],
    isLoaded: false,
  },
  reviews: {
    data: [],
    isLoaded: false,
  },
  isReviewSending: false,
};

export const currentFilmSlice = createSlice({
  name: NameSpace.Film,
  initialState: currentFilmInitialState,
  reducers: {
    changeCurrentFilm: (state, action) => {
      state.film.data = action.payload;
      state.film.isLoaded = true;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentFilmAction.pending, (state) => {
        state.film.isLoaded = false;
      })
      .addCase(fetchCurrentFilmAction.fulfilled, (state, action) => {
        state.film.data = action.payload;
        state.film.isLoaded = true;
      })

      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.similar.isLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similar.data = action.payload;
        state.similar.isLoaded = true;
      })

      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviews.isLoaded = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews.data = action.payload;
        state.reviews.isLoaded = true;
      })

      .addCase(sendReviewAction.pending, (state) => {
        state.isReviewSending = true;
      })
      .addCase(sendReviewAction.fulfilled, (state) => {
        state.isReviewSending = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.isReviewSending = false;
      });
  },
});
