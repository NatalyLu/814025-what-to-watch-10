import {MAX_FILMS_COUNT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import GenreList from '../../components/genre-list/genre-list';
import FilmShortList from '../film-short-list/film-short-list';
import { getActiveGenre, getFilms } from '../../store/main/selectors';
import { changeGenre } from '../../store/main/actions';

function FilmCatalog():JSX.Element {
  const films = useAppSelector(getFilms);
  const activeGenre = useAppSelector(getActiveGenre);
  const dispatch = useAppDispatch();

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changeGenre(genre));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} onClick={handleGenreClick} />
      <FilmShortList maxCount={MAX_FILMS_COUNT} films={films} />
    </section>
  );
}

export default FilmCatalog;
