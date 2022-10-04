import { UNKNOWN_ACTION } from './../../const';
import { AppRoute } from './../../enums';
import { redirectToRoute } from './../action';
import { State } from './../../types/state';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { redirect } from './redirect';

const fakeHistory = {
  location: {pathName: ''},
  push(path: string) {
    this.location.pathName = path;
  }
};

// Производим подмену. При каждом вызове browser-history обращаемся к fakeHistory
jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
// Имитируем стор с помощью configureMockStore
const mockStore = configureMockStore<State, AnyAction>(middlewares);
// Получаем обьект хранилища
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('Should be redirect to /login', () => {
    // Дергаем action creator "redirectToRoute" и указываем путь
    store.dispatch(redirectToRoute(AppRoute.SignIn));
    expect(fakeHistory.location.pathName).toBe(AppRoute.SignIn);
    // И проверим, что действие прошло через наше хранилище. getActions вернет все выполненные действия
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.SignIn),]);
  });

  it('Should not to be redirect if it was a incorrect action', () => {
    store.dispatch({type: UNKNOWN_ACTION, payload: AppRoute.Unknown});
    expect(fakeHistory.location.pathName).not.toBe(AppRoute.Unknown);
  });
});
