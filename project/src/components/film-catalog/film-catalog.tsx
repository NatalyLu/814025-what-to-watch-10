import {useState} from 'react';
import {changingGenre} from '../../store/action';
import {MAX_FILMS_COUNT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import GenreList from '../../components/genre-list/genre-list';
import FilmCards from '../../components/film-cards/film-cards';
import ShowMore from '../show-more/show-more';

function FilmCatalog():JSX.Element {
  const films = useAppSelector((state) => state.filmsByGenre);
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changingGenre(genre));
  };

  const [filmIndex, setFilmIndex] = useState(MAX_FILMS_COUNT);

  // Берём первые n фильмов для отрисовки, если фильмов больше не осталось, то скрываем кнопку ShowMore
  const someFilteredFilms = films.slice(0, filmIndex);
  const isFilms = Boolean(films.length - someFilteredFilms.length);

  const handleButtonClick = (): void => {
    setFilmIndex(filmIndex + MAX_FILMS_COUNT);
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} onClick={handleGenreClick} />
      <div className="catalog__films-list">
        <FilmCards films={someFilteredFilms} />
      </div>
      {(isFilms) && <ShowMore onClick={handleButtonClick}/> }
    </section>
  );
}

export default FilmCatalog;
