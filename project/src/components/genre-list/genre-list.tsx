import {Films} from '../../types/types';
import {defaultGenre} from '../../const';

type GenreListProps = {
  films: Films;
  activeGenre: string;
};

function GenreList(props: GenreListProps):JSX.Element {
  const {films, activeGenre} = props;
  const sortedFilms = films.sort((a,b) => a.genre === b.genre ? 1 : -1);
  const genres = [defaultGenre];

  sortedFilms.map((film) => !genres.includes(film.genre) && genres.push(film.genre));

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
