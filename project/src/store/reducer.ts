import {createReducer} from '@reduxjs/toolkit';
import {
  loadFilms,
  changingGenre,
  filmsByGenre,
  requireAuthorization,
  getReviews,
  setError,
} from "./action";
// import {films} from '../mocks/films';
// import {promo} from '../mocks/promo';
// import {reviews} from '../mocks/reviews';
// import {filmReviews} from '../mocks/film-reviews';
import {Films, Film, Reviews} from '../types/types';
import {DEFAULT_GENRE, AuthorizationStatus} from '../const';

const getGenres = (filmsArr: Films): string[] => {
  const genres = [DEFAULT_GENRE];
  filmsArr.forEach(
    (film) => !genres.includes(film.genre) && genres.push(film.genre)
  );
  return genres;
};

type InitialState = {
  genre: string;
  films: Films;
  genres: string[];
  // promoFilm: Film;
  reviews: Reviews;
  filmReviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  films: [],
  genres: [],
  // promoFilm: films[0],
  reviews: [],
  filmReviews: [],
  // authorizationStatus = Unknown, так при запуске приложения неизвестно состояние, валидный ли наш токен, если он есть
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const getFilmsByGenre = (genre: string, filmsArr: Films) => {
  if (genre === DEFAULT_GENRE) {
    return filmsArr;
  } else {
    const filteredFilms = filmsArr.filter((film) => film.genre === genre);
    return filteredFilms;
  }
};

const reducer = createReducer(initialState,
  (builder) => {
    builder
      .addCase(loadFilms, (state, action) => {
        state.films = action.payload;
        state.genres = getGenres(state.films);
      })
      .addCase(changingGenre, (state, action) => {
        state.genre = action.payload;
      })
      .addCase(filmsByGenre, (state) => {
        state.films = getFilmsByGenre(state.genre, state.films);
      })
      // .addCase(getFilm, (state) => {

      // })

      // .addCase(getSimilarFilms, (state) => {

      // })
      // .addCase(getPromoFilm, (state) => {

      // })
      // .addCase(getRecommendFilms, (state) => {

      // })
      // .addCase(changingFavorite, (state) => {

      // })
      .addCase(getReviews, (state, action) => {
        state.reviews = action.payload;
      })
      // .addCase(addNewReview, (state) => {

      // })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
);

export {reducer};
