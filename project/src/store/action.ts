import { createAction } from '@reduxjs/toolkit';
import { Films, Film, Reviews } from '../types/types';
import { AuthorizationStatus } from '../const';

export const setFilmsLoadedStatus = createAction<boolean>('data/setFilmsLoadedStatus');

export const setPromoFilmLoadedStatus = createAction<boolean>('data/setPromoFilmLoadedStatus');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadFavoriteFilms = createAction<Films>('data/loadFavoriteFilms');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const loadReviews = createAction<Reviews>('data/getReviews');

export const changingGenre = createAction<string>('films/changingGenre');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('data/setError');
