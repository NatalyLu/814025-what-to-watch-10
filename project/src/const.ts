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

export const DEFAULT_GENRE = 'All genres';

export const MAX_FILMS_COUNT = 8;

export const BAD_REQUEST_ERROR = 400;
