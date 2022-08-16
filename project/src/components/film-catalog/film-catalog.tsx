import {useState} from 'react';
import {changingGenre} from '../../store/action';
import {defaultGenre, MAX_FILMS_COUNT} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import GenreList from '../../components/genre-list/genre-list';
import FilmCards from '../../components/film-cards/film-cards';
import ShowMore from '../show-more/show-more';

function FilmCatalog():JSX.Element {
  const films = useAppSelector((state) => state.films);
  const activeGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();

  // Получаем список уникальных жанров
  const genres = [defaultGenre];
  films.map((film) => !genres.includes(film.genre) && genres.push(film.genre));

  // По клику на жанр обновляем активный таб с жанром и формируем новый список фильмов
  const handleGenreClick = (genre: string): void => {
    dispatch(changingGenre(genre));
  };

  const [filmIndex, setFilmIndex] = useState(MAX_FILMS_COUNT);

  const filteredFilms = activeGenre === defaultGenre ? films : films.filter((film) => film.genre === activeGenre);
  const someFilteredFilms = filteredFilms.slice(0, filmIndex);
  const isFilms = filteredFilms.length - someFilteredFilms.length;

  const handleButtonClick = (): void => {
    setFilmIndex(filmIndex + MAX_FILMS_COUNT);
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList activeGenre={activeGenre} genres={genres} onClick={handleGenreClick} />
      <div className="catalog__films-list">
        <FilmCards films={someFilteredFilms} />
      </div>
      {(isFilms) ? <ShowMore onClick={handleButtonClick}/> : null }
    </section>
  );
}

export default FilmCatalog;
