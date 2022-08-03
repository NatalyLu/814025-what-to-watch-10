import FilmCard from '../film-card/film-card';
import {Films} from '../../types/types';

type FilmCardsProps = {
  films: Films
}

function FilmCards(props: FilmCardsProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {props.films.map((item) =>
        <FilmCard key={item.name} film={item} />
      )}
    </div>
  );
}

export default FilmCards;
