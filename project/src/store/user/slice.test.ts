import { AuthorizationStatus } from './../../enums';
import { setCorrectEmailStatus } from './actions';
import { utilsTest } from './../../utils/utils-test';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFavoriteFilmsAction,
  sendFavoriteFilmAction,
} from './api-actions';
import { userSlice, userInitialState } from './slice';

const {mockUserData, mockFavoritesFilms} = utilsTest();

describe('Reducer: userSlice', () => {
  const state = userInitialState;

  it('Without additional parameters should return initial state', () => {
    const UNKNOWN_ACTION = 'unknown';
    expect(userSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual(userInitialState);
  });

  describe('Action: checkAuthAction test', () => {
    it('Should return positive authorization status and userData if checkAuthAction was fulfilled', () => {
      expect(userSlice.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockUserData}))
        .toEqual({ ...state, authorizationStatus: AuthorizationStatus.Auth, userData: mockUserData});
    });
    it('Should return negative authorization status if checkAuthAction was rejected', () => {
      expect(userSlice.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('Action: setCorrectEmailStatus test', () => {
    it('Should return isDataCorrect = false if catch an BAD_REQUEST_ERROR', () => {
      expect(userSlice.reducer(state, {type: setCorrectEmailStatus.type, payload: false}))
        .toEqual({...state, isDataCorrect: false});
    });
    it('Should return isDataCorrect = true if login data is correct', () => {
      expect(userSlice.reducer(state, {type: setCorrectEmailStatus.type, payload: true}))
        .toEqual({...state, isDataCorrect: true});
    });
  });

  describe('Action: loginAction test', () => {
    it('Should return positive authorization status and userData if loginAction was fulfilled', () => {
      expect(userSlice.reducer(state, { type: loginAction.fulfilled.type, payload: mockUserData}))
        .toEqual({ ...state, authorizationStatus: AuthorizationStatus.Auth, userData: mockUserData});
    });
    it('Should return negative authorization status if loginAction was rejected', () => {
      expect(userSlice.reducer(state, {type: loginAction.rejected.type}))
        .toEqual({...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('Action: logoutAction test', () => {
    it('Cleaning state: should return userInitialState with negative authorization status if logoutAction was fulfilled', () => {
      expect(userSlice.reducer(state, { type: logoutAction.fulfilled.type}))
        .toEqual({ ...state, authorizationStatus: AuthorizationStatus.NoAuth});
    });
  });

  describe('Action: fetchFavoriteFilmsAction test', () => {
    it('Should return isLoaded = false if fetchFavoriteFilmsAction is pending', () => {
      expect(userSlice.reducer(state, {type: fetchFavoriteFilmsAction.pending.type}))
        .toEqual({ ...state, favorites: {...state.favorites, isLoaded: false}});
    });
    it('Should return favorite films and isLoaded = true if fetchFavoriteFilmsAction is fulfilled', () => {
      expect(userSlice.reducer(state, {type: fetchFavoriteFilmsAction.fulfilled.type, payload: mockFavoritesFilms}))
        .toEqual({ ...state, favorites: {data: mockFavoritesFilms, isLoaded: true}});
    });
  });

  describe('Action: sendFavoriteFilmAction test', () => {
    it('Should return isFavoriteActionSending = true if sendFavoriteFilmAction is pending', () => {
      expect(userSlice.reducer(state, {type: sendFavoriteFilmAction.pending.type}))
        .toEqual({ ...state, isFavoriteActionSending: true});
    });
    it('Should return isFavoriteActionSending = false if sendFavoriteFilmAction was fulfilled', () => {
      expect(userSlice.reducer(state, {type: sendFavoriteFilmAction.fulfilled.type}))
        .toEqual({ ...state, isFavoriteActionSending: false});
    });
    it('Should return isFavoriteActionSending = null if sendFavoriteFilmAction was rejected', () => {
      expect(userSlice.reducer(state, {type: sendFavoriteFilmAction.rejected.type}))
        .toEqual({ ...state, isFavoriteActionSending: null});
    });
  });

});
