import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

// Перенаправляем по заданному маршруту через push
export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action) => {
    if (action.type === 'films/redirectToRoute') {
      browserHistory.push(action.payload);
    }
    // Передаем действие следующему middleware
    return next(action);
  };
