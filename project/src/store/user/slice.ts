import {createSlice} from '@reduxjs/toolkit';
import { NameSpace, AuthorizationStatus } from '../../const';
import { UserState } from '../../types/state';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFavoriteFilmsAction,
  sendFavoriteFilmAction,
} from './api-actions';

const userInitialState: UserState = {
  // authorizationStatus = Unknown, при запуске приложения неизвестно состояние,
  // валидный ли наш токен (если он есть)
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: undefined,
  favorites: {
    data: [],
    isLoaded: false,
    isFavoriteActionSending: false,
  },
  isDataCorrect: false,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState: userInitialState,
  reducers: {
    setCorrectEmailStatus: (state, action) => {
      state.isDataCorrect = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })

      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        ///////////////////////////////////////////////
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        ///////////////////////////////////////////////
        console.log('Error', action.payload);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        // Очищаем данные
        state.userData = userInitialState.userData;
        state.favorites.data = userInitialState.favorites.data;
        state.favorites.isLoaded = userInitialState.favorites.isLoaded;
      })

      .addCase(fetchFavoriteFilmsAction.pending, (state) => {
        state.favorites.isLoaded = false;
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favorites.data = action.payload;
        state.favorites.isLoaded = true;
      })

      .addCase(sendFavoriteFilmAction.pending, (state) => {
        state.favorites.isFavoriteActionSending = true;
      })
      .addCase(sendFavoriteFilmAction.fulfilled, (state) => {
        state.favorites.isFavoriteActionSending = false;
      })
      .addCase(sendFavoriteFilmAction.rejected, (state) => {
        state.favorites.isFavoriteActionSending = null;
      });
  },
});
