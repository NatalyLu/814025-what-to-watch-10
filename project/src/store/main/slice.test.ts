import { getGenres } from '../../utils/utils';
import { changeGenre } from './actions';
import { utilsTest } from './../../utils/utils-test';
import { fetchFilmsAction, fetchPromoFilmAction } from './api-actions';
import { mainSlice, mainInitialState } from "./slice";

const {mockFilms, mockPromo, mockActiveGenre} = utilsTest();

describe("Reducer: mainSlice", () => {
  const state = mainInitialState;

  it('Without additional parameters should return initial state', () => {
    const UNKNOWN_ACTION = 'unknown';
    expect(mainSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
    .toEqual(mainInitialState);
  });

  describe('Action: fetchFilmsAction test', () => {
    it('Should return isLoaded = false if fetchFilmsAction is pending', () => {
      expect(mainSlice.reducer(state, {type: fetchFilmsAction.pending.type}))
      .toEqual({...state, films: {...state.films, isLoaded: false}});
    });
    it('Should return films, genres and also set isLoaded to true if fetchFilmsAction was fulfilled', () => {
      const genres = mockFilms && getGenres(mockFilms);
      expect(mainSlice.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: mockFilms}))
      .toEqual({...state, films: {data: mockFilms, isLoaded: true}, genres: {...state.genres, data: genres}});
    });
  });

  describe('Action: fetchPromoFilmAction test', () => {
    it('Should return isLoaded = false if fetchPromoFilmAction is pending', () => {
      expect(mainSlice.reducer(state, {type: fetchPromoFilmAction.pending.type}))
      .toEqual({...state, promo: {...state.promo, isLoaded: false}})
    });
    it('Should return promo film and set isLoaded to true if fetchPromoFilmAction was fulfilled', () => {
      expect(mainSlice.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: mockPromo}))
      .toEqual({...state, promo: {data: mockPromo, isLoaded: true}})
    });
  });

  describe('Action: changeGenre test', () => {
    it('Should set activeGenre', () => {
      expect(mainSlice.reducer(state, {type: changeGenre.type, payload: mockActiveGenre}))
      .toEqual({...state, genres: {...state.genres, activeGenre: mockActiveGenre}});
    });
  });
});
