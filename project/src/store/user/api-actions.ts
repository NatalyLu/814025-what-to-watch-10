import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseError } from '../../types/errors';
import { AppDispatch, State } from '../../types/state';
import { AuthData } from '../../types/auth-data';
import { UserData } from '../../types/user-data';
import { Films, Film, FavoriteFilmStatus } from '../../types/types';
import { saveToken, removeToken } from '../../services/token';
import { AppRoute, APIRoute } from '../../enums';
import {BAD_REQUEST_ERROR} from '../../const';
import {redirectToRoute} from '../action';
import {setCorrectEmailStatus} from './actions';

// AUTH
export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});


//LOGIN
export const loginAction = createAsyncThunk<
  UserData | undefined,
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
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(setCorrectEmailStatus(true));
      return data;
    } catch (err) {
      if ((err as ResponseError).status === BAD_REQUEST_ERROR) {
        dispatch(setCorrectEmailStatus(false));
      }
    }
  }
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
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  removeToken();
  dispatch(redirectToRoute(AppRoute.Main));
});


// FAVORITE FILM
export const fetchFavoriteFilmsAction = createAsyncThunk<
  Films,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteFilms', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Films>(APIRoute.FavoriteFilms);
  return data;
});


// ADD/REMOVE FAVORITE FILM
export const sendFavoriteFilmAction = createAsyncThunk<
  void,
  FavoriteFilmStatus,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/FavoriteFilmAction', async ({ id, status }, { dispatch, extra: api }) => {
    await api.post<Film>(
      `${APIRoute.FavoriteFilms}/${id}/${status}`,
      {
        id,
        status,
      }
    );
    dispatch(fetchFavoriteFilmsAction());
  }
);
