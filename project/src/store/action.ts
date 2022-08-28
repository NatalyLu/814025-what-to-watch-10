import { createAction } from '@reduxjs/toolkit';
import { Films, Film, Reviews } from '../types/types';
import { UserData } from '../types/user-data';
import { AuthorizationStatus, AppRoute } from '../const';

export const setFilmsLoadingStatus = createAction<boolean>('data/setFilmsLoadingStatus');

export const setPromoFilmLoadingStatus = createAction<boolean>('data/setPromoFilmLoadingStatus');

// export const setCurrentFilmLoadingStatus = createAction<boolean>('data/setCurrentFilmLoadingStatus');

export const setCorrectEmailStatus = createAction<boolean>('user/setCorrectEmailStatus');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadFavoriteFilms = createAction<Films>('data/loadFavoriteFilms');

export const loadCurrentFilm = createAction<Film>('data/loadCurrentFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadPromoFilm = createAction<Film>('data/loadPromoFilm');

export const loadReviews = createAction<Reviews>('data/getReviews');

export const loadUserData = createAction<UserData>('data/loadUserData');

export const changingGenre = createAction<string>('films/changingGenre');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('films/redirectToRoute');
