import {changingGenre} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import GenreList from '../../components/genre-list/genre-list';
import FilmCards from '../../components/film-cards/film-cards';
import {defaultGenre} from '../../const';

function FilmCatalog():JSX.Element {
  const films = useAppSelector((state) => state.films);
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  const genres = [defaultGenre];
  films.map((film) => !genres.includes(film.genre) && genres.push(film.genre));

  const handleGenreClick = (genre: string): void => {
    dispatch(changingGenre(genre));
  };

  const filteredFilms = activeGenre === defaultGenre ? films : films.filter((film) => film.genre === activeGenre);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} genres={genres} onClick={handleGenreClick} />
      <div className="catalog__films-list">
        <FilmCards films={filteredFilms} />
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default FilmCatalog;
