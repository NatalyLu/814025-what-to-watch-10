import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { Film, Films, Reviews } from '../../types/types';
import { NewReviewWithID } from '../../types/new-review';
import { APIRoute, AppRoute } from '../../const';
import { redirectToRoute } from '../action';

// CURRENT FILM
export const fetchCurrentFilmAction = createAsyncThunk<
  Film,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCurrentFilm', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Film>(`${APIRoute.Films}/${id}`);
  return data;
});


// SIMULAR FILM
export const fetchSimilarFilmsAction = createAsyncThunk<
  Films,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchSimilarFilms',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Films>(`${APIRoute.Films}/${id}/similar`);
    return data;
  }
);


// REVIEWS
export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviewsAction', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Reviews>(`${APIRoute.Reviews}/${id}`);
  return data;
});


// NEW REVIEW
export const sendReviewAction = createAsyncThunk<
  void,
  NewReviewWithID,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/newReview', async ({ id, review }, { dispatch, extra: api }) => {
  await api.post<Reviews>(`${APIRoute.Reviews}/${id}`, review);
  dispatch(redirectToRoute(AppRoute.Film.replace(':id', String(id))));
  // dispatch(loadReviews(data));
});
