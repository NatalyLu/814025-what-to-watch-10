import {createReducer} from '@reduxjs/toolkit';
import {
  loadFilms,
  loadPromoFilm,
  loadFavoriteFilms,
  loadCurrentFilm,
  loadSimilarFilms,
  changingGenre,
  requireAuthorization,
  loadReviews,
  setError,
  setFilmsLoadedStatus,
  setPromoFilmLoadedStatus,
} from './action';
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
  isFilmsLoaded: boolean;
  isPromoFilmLoaded: boolean;
  genre: string;
  films: Films;
  film?: Film;
  favoriteFilms: Films;
  similarFilms: Films;
  filmsByGenre: Films;
  genres: string[];
  promoFilm?: Film;
  reviews: Reviews;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
};

const initialState: InitialState = {
  isFilmsLoaded: false,
  isPromoFilmLoaded: false,
  genre: DEFAULT_GENRE,
  films: [],
  film: undefined,
  favoriteFilms: [],
  similarFilms: [],
  filmsByGenre: [],
  genres: [],
  promoFilm: undefined,
  reviews: [],
  // authorizationStatus = Unknown, так при запуске приложения неизвестно состояние,
  // валидный ли наш токен (если он есть)
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
      .addCase(setFilmsLoadedStatus, (state, action) => {
        state.isFilmsLoaded = action.payload;
      })
      .addCase(setPromoFilmLoadedStatus, (state, action) => {
        state.isPromoFilmLoaded = action.payload;
      })
      .addCase(loadFilms, (state, action) => {
        state.films = action.payload;
        state.genres = getGenres(state.films);
        state.filmsByGenre = getFilmsByGenre(state.genre, state.films);
      })
      .addCase(changingGenre, (state, action) => {
        state.genre = action.payload;
        state.filmsByGenre = getFilmsByGenre(state.genre, state.films);
      })
      .addCase(loadFavoriteFilms, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(loadCurrentFilm, (state, action) => {
        state.film = action.payload;
      })
      .addCase(loadPromoFilm, (state, action) => {
        state.promoFilm = action.payload;
      })
      .addCase(loadSimilarFilms, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(loadReviews, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
);

export {reducer};
