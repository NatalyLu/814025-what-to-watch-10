import {store} from '../store';
import {AuthorizationStatus} from '../const';
import { UserData } from './user-data';
import { Films, Film, Reviews } from './types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData?: UserData;
  favorites: {
    data: Films;
    isLoaded: boolean;
    isSendFavoriteAction: boolean;
  };
  isDataCorrect: boolean;
};

export type CurrentFilmState = {
  film: {
    data?: Film;
    isLoaded: boolean;
  };
  reviews: {
    data: Reviews;
    isLoaded: boolean;
  };
  similar: {
    data: Films;
    isLoaded: boolean;
  };
  isReviewSending: boolean;
};

export type MainState = {
  films: {
    data: Films;
    isLoaded: boolean;
  };
  filmsByGenre: Films;
  promo: {
    data?: Film;
    isLoaded: boolean;
  };
  genres: {
    data: string[];
    activeGenre: string;
  };
};
