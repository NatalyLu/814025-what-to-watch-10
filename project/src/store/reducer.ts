import {createReducer} from '@reduxjs/toolkit';
import {changingGenre, filmsByGenre} from './action';
import {films} from '../mocks/films';
import {promo} from '../mocks/promo';
import {reviews} from '../mocks/reviews';
import {filmReviews} from '../mocks/film-reviews';
import {Films} from '../types/types';
import {DEFAULT_GENRE} from '../const';

const getGenres = (filmsArr: Films): string[] => {
  const genres = [DEFAULT_GENRE];
  filmsArr.forEach(
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

const getFilmsByGenre = (genre: string, filmsArr: Films) => {
  if (genre === DEFAULT_GENRE) {
    return films;
  } else {
    const filteredFilms = filmsArr.filter((film) => film.genre === genre);
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
