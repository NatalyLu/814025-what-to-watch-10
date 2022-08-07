import {useState, MouseEvent} from 'react';
import FilmCard from '../film-card/film-card';
import {Films} from '../../types/types';

type FilmCardsProps = {
  films: Films
}

function FilmCards(props: FilmCardsProps): JSX.Element {
  const {films} = props;

  const [activeCard, setActiveCard] = useState(films[0]);

  // const cardHoverHandel = ({relatedTarget}: MouseEvent): void => {
  // console.log('target', relatedTarget);
  const cardHoverHandel = (e: MouseEvent<HTMLElement>): void => {
    console.log('target', e);

    // console.log('setActiveCard', setActiveCard);
    setActiveCard(films[2]);
  };

  return (
    <div className="catalog__films-list">
      {/* Временный показ id фильма, на карточку которого наведен курсор */}
      <div>{activeCard.id}</div>
      {films.map((item) =>
        <FilmCard key={item.name} film={item} onMouseOver={cardHoverHandel} />
      )}
    </div>
  );
}

export default FilmCards;
