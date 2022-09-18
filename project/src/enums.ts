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

export enum ErrorText {
  NoReviews = 'Sorry, no reviews were found. You can be the first to leave a review!',
  WrongPassword = 'Wrong password! It must contain at least one letter and one number',
  Default = 'Sorry, something went wrong. Please reload the page and try it again',
}

export enum NameSpace {
  User = 'USER',
  Film = 'FILM',
  Main = 'MAIN',
}
