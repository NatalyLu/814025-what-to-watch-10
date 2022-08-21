import { createAction } from '@reduxjs/toolkit';
import { Films, Film, Reviews, Review } from '../types/types';
import { AuthorizationStatus } from "../const";

export const loadFilms = createAction<Films>('data/loadFilms');

// export const getFilm = createAction<Film>('data/getFilms');

// export const getSimilarFilms = createAction<Films>('data/getSimilarFilms');

// export const getPromoFilm = createAction<Film>('data/getPromoFilm');

// export const getRecommendFilms = createAction<Films>('data/getRecommendFilms');

export const getReviews = createAction<Reviews>('data/getReviews');

export const changingGenre = createAction<string>('films/changingGenre');

export const filmsByGenre = createAction<Films>('films/filmsByGenre');

// export const changingFavorite = createAction<Film>('films/changingFavorite');

// export const addNewReview = createAction<Review>('review/addNewReview');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>("data/setError");
