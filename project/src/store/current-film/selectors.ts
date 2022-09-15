import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Film, Films, Reviews } from '../../types/types';

export const getFilm = (state: State): Film | undefined => state[NameSpace.Film].film.data;
export const getFilmStatus = (state: State): boolean => state[NameSpace.Film].film.isLoaded;

export const getSimilar = (state: State): Films => state[NameSpace.Film].similar.data;
export const getSimilarStatus = (state: State): boolean => state[NameSpace.Film].similar.isLoaded;

export const getReviews = (state: State): Reviews => state[NameSpace.Film].reviews.data;
export const getReviewsStatus = (state: State): boolean => state[NameSpace.Film].reviews.isLoaded;
export const getSendingReviewStatus = (state: State): boolean => state[NameSpace.Film].isReviewSending;
