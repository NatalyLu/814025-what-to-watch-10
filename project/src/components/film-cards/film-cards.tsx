import {useState} from 'react';
import FilmCard from '../film-card/film-card';
import {Films, Film} from '../../types/types';

type FilmCardsProps = {
  films: Films
}

function FilmCards(props: FilmCardsProps): JSX.Element {
  const {films} = props;
  const [activeCard, setActiveCard] = useState(films[0]);

  const handleCardHover = (film: Film): void => {
    setActiveCard(film);
  };

  return (
    <div className="catalog__films-list">
      {/* Временный показ id фильма, на карточку которого наведен курсор */}
      <div style={ {width: '100%', marginBottom: '30px'} }><b>Hover element is: </b>{activeCard.id}</div>
      {films.map((item) =>
        <FilmCard key={item.name} film={item} onMouseOver={handleCardHover} />
      )}
    </div>
  );
}

export default FilmCards;
