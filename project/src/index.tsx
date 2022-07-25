import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Promo = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014'
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilm={Promo}/>
  </React.StrictMode>,
);
