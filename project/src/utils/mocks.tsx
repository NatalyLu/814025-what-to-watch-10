import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { Film, Films, Review, Reviews } from "../types/types";
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {name as fakerName, image, commerce, lorem, internet, datatype, random} from 'faker';
import { AuthorizationStatus, MaxCount, NameSpace } from "../enums";
import {DEFAULT_GENRE} from '../const';
import { mainInitialState } from "../store/main/slice";
import { CurrentFilmState, MainState, State, UserState } from "../types/state";
import { getGenres } from "./utils";
import { createAPI } from '../services/api';
import { currentFilmInitialState } from '../store/current-film/slice';
import { userInitialState } from '../store/user/slice';

const getFakeRating = () => datatype.number({min: 1, max: 10});


// FILMS
export const createFakeFilm = ():Film => ({
  id: datatype.number(),
  name: fakerName.firstName(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: commerce.color(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
  description: lorem.sentence(),
  rating: getFakeRating(),
  scoresCount: datatype.number(),
  director: fakerName.findName(),
  starring: Array.from({length: Math.floor(Math.random() * 5)}, () => fakerName.findName()),
  runTime: datatype.number(240),
  genre: lorem.word(7),
  released: datatype.number({min: 1940, max: 2022}),
  isFavorite: datatype.boolean(),
} as Film);

export const createFakeFilms = ():Films => ( new Array(datatype.number({min: 10, max: 30})).fill(null).map(createFakeFilm) as Films );


// REVIEWS
export const createFakeReview = ():Review => ({
  comment: lorem.sentence(),
  date: (datatype.datetime()).toString(),
  id: datatype.number(),
  rating: getFakeRating(),
  user: {
    id: datatype.number(),
    name: fakerName.findName(),
  },
} as Review);

export const createFakeReviews = ():Reviews => (new Array(datatype.number({min: 0, max: 20})).fill(null).map(createFakeReview) as Reviews);


// USER
export const createFakeUserData = ():UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  name: fakerName.findName(),
  token: datatype.string(32),
} as UserData);

export const createFakeAuth = (): AuthData => ({
  login: internet.email(),
  password: datatype.string(5),
} as AuthData);


// STORE
export const mockMiddleware = () => {
  // Создаем экземпляр axios для доступа к его функциям
  const api = createAPI();
  // и мокаем api, чтобы она не ходила на сервер
  const mockAPI = new MockAdapter(api);
  // Создаем массив с санками, которым не забываем передавать экстрааргумент
  const middleWares = [thunk.withExtraArgument(api)];

  return {
    api,
    mockAPI,
    middleWares
  };
};

export const mockStoreDefaultProps = {
  authorizationStatus: AuthorizationStatus.Auth,
  films: createFakeFilms(),
  genre: DEFAULT_GENRE,
};

export const createMockStore = (props = mockStoreDefaultProps) => {
  const {authorizationStatus, films, genre} = props;
  const {api, middleWares} = mockMiddleware();

  const promo = createFakeFilm();
  const currentFilm = random.arrayElement(films);
  const similarFilms = films.filter((film) => film.id !== currentFilm.id && film.genre === currentFilm.genre).slice(0, MaxCount.Films);
  const reviews = createFakeReviews();
  const isReviewSending = false;
  const isFavoriteActionSending = false;
  const isDataCorrect = true;
  const userData = createFakeUserData();
  const favoriteFilms = films.filter((film) => {film.isFavorite});

  const mockStoreData = {
    [NameSpace.Main]: {...mainInitialState,
      films: {data: films, isLoaded: true},
      promo: {data: promo, isLoaded: true},
      genres: {data: getGenres(films), activeGenre: genre},
    } as MainState,
    [NameSpace.Film]: {...currentFilmInitialState,
      film: {data: currentFilm, isLoaded: true},
      similar: {data: similarFilms, isLoaded: true},
      reviews: {data: reviews, isLoaded: true},
      isReviewSending: isReviewSending,
    } as CurrentFilmState,
    [NameSpace.User]: {...userInitialState,
      authorizationStatus: authorizationStatus,
      userData: userData,
      isDataCorrect: isDataCorrect,
      favorites: {data: favoriteFilms, isLoaded: true },
      isFavoriteActionSending: isFavoriteActionSending,
    } as UserState,
  }

  // Конфигурируем стор
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middleWares);

  const store = mockStore(mockStoreData);

  return {
    store,
    // mockStoreData
  };
};
