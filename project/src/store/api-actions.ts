import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Films, Film, Reviews } from '../types/types';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { APIRoute, AuthorizationStatus } from '../const';
import {
  loadFilms,
  loadPromoFilm,
  loadFavoriteFilms,
  loadCurrentFilm,
  loadSimilarFilms,
  loadReviews,
  loadUserData,
  requireAuthorization,
  setFilmsLoadedStatus,
  setPromoFilmLoadedStatus,
  setCorrectEmailStatus,
  redirectToRoute,
} from './action';
import { saveToken, removeToken } from '../services/token';
import { AppRoute, BAD_REQUESTERROR } from '../const';

// createAsyncThunk создает асинхронные действия - actions

// FILMS
export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchFilms',
  // Извлекаем из Axios dispatch и доп. аргументы (extra) и создаем запрос к серверу
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFilmsLoadedStatus(true));
    const { data } = await api.get<Films>(APIRoute.Films);

    // *Ошибки запроса будем ловить в другом месте
    dispatch(loadFilms(data));
    dispatch(setFilmsLoadedStatus(false));
  }
);

// PROMO FILM
export const fetchPromoFilmAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchPromoFilm',
  async (id, { dispatch, extra: api }) => {
    dispatch(setPromoFilmLoadedStatus(true));
    const { data } = await api.get<Film>(APIRoute.PromoFilm);
    dispatch(loadPromoFilm(data));
    dispatch(setPromoFilmLoadedStatus(false));
  }
);

// FAVORITE FILM
export const fetchFavoriteFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchFavoriteFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.FavoriteFilms);
    dispatch(loadFavoriteFilms(data));
  }
);

// CURRENT FILM
export const fetchCurrentFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchCurrentFilm',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Film);
    dispatch(loadCurrentFilm(data));
  }
);

// SIMULAR FILM
export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchSimilarFilms',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(APIRoute.SimilarFilms);
    dispatch(loadSimilarFilms(data));
  }
);

// REVIEWS
export const fetchReviewsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchReviewsAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(APIRoute.Reviews);
    dispatch(loadReviews(data));
  }
);

// AUTH
export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

//LOGIN
export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    // Передадим необходимые данные серверу (email, password)
    // Взамен получим данные пользователя и извлечем из них token
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, {
        email,
        password,
      });
      // Сохраним токен в localStorage и поменяем зачение авторизации в хранилище, а затем перенаправи на главную
      saveToken(data.token);
      dispatch(loadUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (err: any) {
      if (err.status === BAD_REQUESTERROR) {
        dispatch(setCorrectEmailStatus(false));
      }
    }
  },
);

// LOGOUT
export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
