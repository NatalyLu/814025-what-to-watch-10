import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const PROMO = {
  name: 'The Grand Budapest Hotel',
  gender: 'Drama',
  year: '2014'
};

const FILMS = [
  {
    link: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Fantastic Beasts: The Crimes of Grindelwald',
  },
  {
    link: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Fantastic Beasts: Grindelwald',
  },
  {
    link: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Fantastic Beasts: The',
  },
  {
    link: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Crimes of Grindelwald',
  },
  {
    link: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    name: 'Grindelwald',
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilm={PROMO} films={FILMS} />
  </React.StrictMode>,
);
