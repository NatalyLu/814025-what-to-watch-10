export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const filmTabs = [
  'Overview',
  'Details',
  'Reviews',
];

export const DEFAULT_GENRE = 'All genres';

export const MAX_FILMS_COUNT = 8;
