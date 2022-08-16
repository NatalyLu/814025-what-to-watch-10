// import {useState} from 'react';
import FilmCard from '../film-card/film-card';
import {FilmsData} from '../../types/types';

type FilmCardsProps = {
  films: FilmsData;
}

function FilmCards(props: FilmCardsProps): JSX.Element {
  const {films} = props;
  // const [activeCard, setActiveCard] = useState(films[0]);

  // const handleCardHover = (film: FilmData): void => {
  //   setActiveCard(film);
  // };

  return (
    <div className="catalog__films-list">
      {films.map((item) =>
        <FilmCard key={item.name} film={item} />
      )}
    </div>
  );
}

export default FilmCards;
