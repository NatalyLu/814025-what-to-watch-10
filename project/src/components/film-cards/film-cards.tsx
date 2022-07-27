import FilmCard from '../film-card/film-card';
import {Films} from '../../types/types';

function FilmCards(props: Films): JSX.Element {

  return (
    <div className="catalog__films-list">
      {props.films.map((item) =>
        <FilmCard key={item.NAME} film={item} />
      )}
    </div>
  );
}

export default FilmCards;
