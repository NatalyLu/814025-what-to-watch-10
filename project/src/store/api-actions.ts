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
  setFilmsLoadingStatus,
  setPromoFilmLoadingStatus,
  setFilmReviewsStatus,
  // setCurrentFilmLoadingStatus,
  setSimilarFilmsLoadingStatus,
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
    dispatch(setFilmsLoadingStatus(true));
    const { data } = await api.get<Films>(APIRoute.Films);

    // *Ошибки запроса будем ловить в другом месте
    dispatch(loadFilms(data));
    dispatch(setFilmsLoadingStatus(false));
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
    dispatch(setPromoFilmLoadingStatus(true));
    const { data } = await api.get<Film>(APIRoute.PromoFilm);
    dispatch(loadPromoFilm(data));
    dispatch(setPromoFilmLoadingStatus(false));
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
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchCurrentFilm',
  async (id, { dispatch, extra: api }) => {
    // dispatch(setCurrentFilmLoadingStatus(true));
    const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
    dispatch(loadCurrentFilm(data));
    // dispatch(setCurrentFilmLoadingStatus(false));
  }
);

// SIMULAR FILM
export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchSimilarFilms',
  async (id, { dispatch, extra: api }) => {
    dispatch(setSimilarFilmsLoadingStatus(true));
    const { data } = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    dispatch(loadSimilarFilms(data));
    dispatch(setSimilarFilmsLoadingStatus(false));
  }
);

// REVIEWS
export const fetchReviewsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchReviewsAction',
  async (id, { dispatch, extra: api }) => {
    dispatch(setFilmReviewsStatus(true));
    const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
    dispatch(loadReviews(data));
    dispatch(setFilmReviewsStatus(false));
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
