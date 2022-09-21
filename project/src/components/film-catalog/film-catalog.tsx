import {useAppDispatch, useAppSelector} from '../../hooks';
import GenreList from '../../components/genre-list/genre-list';
import FilmShortList from '../film-short-list/film-short-list';
import { getFilterFilmsByGenre, getActiveGenre } from '../../store/main/selectors';
import { changeGenre } from '../../store/main/actions';
import { MaxCount } from '../../enums';

function FilmCatalog():JSX.Element {
  const activeGenre = useAppSelector(getActiveGenre);
  const films = useAppSelector(getFilterFilmsByGenre);

  const dispatch = useAppDispatch();

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changeGenre(genre));
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} onClick={handleGenreClick} />
      <FilmShortList maxCount={MaxCount.Films} films={films} />
    </section>
  );
}

export default FilmCatalog;
