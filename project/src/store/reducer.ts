import {createReducer} from '@reduxjs/toolkit';
import {changingGenre, filmsByGenre} from './action';
import {films} from '../mocks/films';
import {promo} from '../mocks/promo';
import {reviews} from '../mocks/reviews';
import {filmReviews} from '../mocks/film-reviews';
import {FilmsData} from '../types/types';
import {DEFAULT_GENRE} from '../const';

const getGenres = (allFilms: FilmsData): string[] => {
  const genres = [DEFAULT_GENRE];
  allFilms.map(
    (film) => !genres.includes(film.genre) && genres.push(film.genre)
  );
  return genres;
};

const initialState = {
  genre: DEFAULT_GENRE,
  films: films,
  genres: getGenres(films),
  promoFilm: promo,
  reviews: reviews,
  filmReviews: filmReviews,
};

const getFilmsByGenre = (genre: string, allfilms: FilmsData) => {
  if (genre === DEFAULT_GENRE) {
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
