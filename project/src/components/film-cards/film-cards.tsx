import FilmCard from '../film-card/film-card';
import {FilmsData} from '../../types/types';

type FilmCardsProps = {
  films: FilmsData;
}

function FilmCards(props: FilmCardsProps): JSX.Element {
  const {films} = props;

  return (
    <div className="catalog__films-list">
      {films.map((item) =>
        <FilmCard key={item.name} film={item} />
      )}
    </div>
  );
}

export default FilmCards;
