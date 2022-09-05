import {changingGenre} from '../../store/action';
import {MAX_FILMS_COUNT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import GenreList from '../../components/genre-list/genre-list';
import FilmCards from '../../components/film-cards/film-cards';
import ShowMore from '../show-more/show-more';
import useShowMore from '../../hooks/useShowMore';

function FilmCatalog():JSX.Element {
  const films = useAppSelector((state) => state.filmsByGenre);
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changingGenre(genre));
  };

  const {isItems, handleButtonClick, someFilteredItems} = useShowMore(MAX_FILMS_COUNT, films);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} onClick={handleGenreClick} />
      <FilmCards films={someFilteredItems} />
      {(isItems) && <ShowMore onClick={handleButtonClick}/> }
    </section>
  );
}

export default FilmCatalog;
