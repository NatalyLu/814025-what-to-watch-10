import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {films} from './mocks/films';
import {promo} from './mocks/promo';
import {reviews} from './mocks/reviews';
import {store} from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App promoFilm={promo} films={films} reviews={reviews} />
    </Provider>
  </React.StrictMode>
);
