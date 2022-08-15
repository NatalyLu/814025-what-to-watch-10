import { createReducer } from '@reduxjs/toolkit';
import { changingGenre, filmsByGenre } from './action';
import {films} from '../mocks/films';
import {FilmsData} from '../types/types';
import {defaultGenre} from '../const';

const initialState = {
  genre: defaultGenre,
  films: films,
};

const getFilmsByGenre = (genre: string, allfilms: FilmsData) => {
  if (genre === defaultGenre) {
    return allfilms;
  } else {
    const filteredFilms = allfilms.filter((film) => film.genre === genre);
    return filteredFilms;
  }
};

const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(changingGenre, (state, action) => {
        state.genre = action.payload;
      })
      .addCase(filmsByGenre, (state) => {
        state.films = getFilmsByGenre(state.genre, films);
      });
  }
);

export {reducer};
