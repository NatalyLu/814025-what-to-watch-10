import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Promo = {
  NAME: 'The Grand Budapest Hotel',
  GENDER: 'Drama',
  YEAR: '2014'
};

const Films = [
  {
    LINK: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    NAME: 'Fantastic Beasts: The Crimes of Grindelwald',
  },
  {
    LINK: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    NAME: 'Fantastic Beasts: Grindelwald',
  },
  {
    LINK: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    NAME: 'Fantastic Beasts: The',
  },
  {
    LINK: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    NAME: 'Crimes of Grindelwald',
  },
  {
    LINK: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    NAME: 'Grindelwald',
  },
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App promoFilm={Promo} films={Films} />
  </React.StrictMode>,
);
