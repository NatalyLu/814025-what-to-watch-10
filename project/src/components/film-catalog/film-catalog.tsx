import {MAX_FILMS_COUNT} from '../../const';
import {changingGenre} from '../../store/action';
import {useAppDispatch, useAppSelector} from '../../hooks';
import GenreList from '../../components/genre-list/genre-list';
import FilmShortList from '../film-short-list/film-short-list';

function FilmCatalog():JSX.Element {
  const films = useAppSelector((state) => state.filmsByGenre);
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changingGenre(genre));
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
