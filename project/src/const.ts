export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  Reviews = '/comments',
  FavoriteFilms = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

export const filmTabs = [
  'Overview',
  'Details',
  'Reviews',
];

export enum ErrorText {
  NoReviews = 'Sorry, no reviews were found. You can be the first to leave a review!',
  WrongPassword = 'Wrong password! It must contain at least one letter and one number',
}

export const filmTextRating = {
  bad: 'Bad',
  normal: 'Normal',
  good: 'Good',
  better: 'Very good',
  awesome: 'Awesome',
};

export enum NameSpace {
  User = 'USER',
  Film = 'FILM',
  Main = 'MAIN',
}

export const DEFAULT_GENRE = 'All genres';

export const MAX_FILMS_COUNT = 8;

export const MAX_GENRES_COUNT = 2;

export const MAX_SIMILAR_FILM_COUNT = 4;

export const BAD_REQUEST_ERROR = 400;

export const TEXTAREA_MIN_LENGTH = 50;
export const TEXTAREA_MAX_LENGTH = 400;
