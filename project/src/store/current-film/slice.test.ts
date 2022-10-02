import { utilsTest } from './../../utils/utils-test';
import {
  fetchCurrentFilmAction,
  fetchSimilarFilmsAction,
  fetchReviewsAction,
  sendReviewAction,
} from './api-actions';
import { currentFilmSlice, currentFilmInitialState } from './slice';

const {mockCurrentFilm, mockSimilarFilms, mockReviews, mockFilms} = utilsTest();

describe('Reducer: currentFilmSlice', () => {
  const state = currentFilmInitialState;

  it('Without additional parameters should return initial state', () => {
    const UNKNOWN_ACTION = 'unknown';
    expect(currentFilmSlice.reducer(undefined, { type: UNKNOWN_ACTION }))
      .toEqual(currentFilmInitialState);
  });

  it('Action: changeCurrentFilm test. Should updated current film and set isLoaded to true', () => {
    const newCurrentFilm = mockFilms && mockFilms[0];
    expect(currentFilmSlice.reducer(state, currentFilmSlice.actions.changeCurrentFilm(newCurrentFilm)))
      .toEqual({...state, film: {data: newCurrentFilm, isLoaded: true}});
  });

  describe('Action: fetchCurrentFilmAction test', () => {
    it('Should return isLoaded = false if fetchCurrentFilmAction is pending', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchCurrentFilmAction.pending.type}))
        .toEqual({...state, film: {...state.film, isLoaded: false}});
    });
    it('Should return current film, and set isLoaded to true if fetchCurrentFilmAction was fulfilled', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchCurrentFilmAction.fulfilled.type, payload: mockCurrentFilm}))
        .toEqual({...state, film: {data: mockCurrentFilm, isLoaded: true}});
    });
  });

  describe('Action: fetchSimilarFilmsAction test', () => {
    it('Should return isLoaded = false if fetchSimilarFilmsAction is pending', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchSimilarFilmsAction.pending.type}))
        .toEqual({...state, similar: {...state.similar, isLoaded: false}});
    });
    it('Should return similar films and set isLoaded to true if fetchSimilarFilmsAction was fulfilled', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: mockSimilarFilms}))
        .toEqual({...state, similar: {data: mockSimilarFilms, isLoaded: true}});
    });
  });

  describe('Action: fetchReviewsAction test', () => {
    it('Should return isLoaded = false if fetchReviewsAction is pending', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({ ...state, reviews: {...state.reviews, isLoaded: false }});
    });
    it('Should return reviews and set isLoaded to true if fetchReviewsAction was fulfilled', () => {
      expect(currentFilmSlice.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: mockReviews}))
        .toEqual({ ...state, reviews: { data: mockReviews, isLoaded: true } });
    });
  });

  describe('Action: sendReviewAction test', () => {
    it('Should return true if sendReviewAction is pending', () => {
      expect(currentFilmSlice.reducer(state, {type: sendReviewAction.pending.type}))
        .toEqual({...state, isReviewSending: true});
    });
    it('Should return false if sendReviewAction was fulfilled', () => {
      expect(currentFilmSlice.reducer(state, { type: sendReviewAction.fulfilled.type }))
        .toEqual({ ...state, isReviewSending: false });
    });
    it('Should return false if sendReviewAction was rejected', () => {
      expect(currentFilmSlice.reducer(state, {type: sendReviewAction.rejected.type}))
        .toEqual({ ...state, isReviewSending: false });
    });
  });
});
