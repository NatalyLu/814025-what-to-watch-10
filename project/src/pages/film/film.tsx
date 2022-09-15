import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import Logo from '../../components/logo/logo';
import Video from '../../components/video/video';
import {MAX_SIMILAR_FILM_COUNT} from '../../const';
import {fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchReviewsAction} from '../../store/current-film/api-actions';
import SignIn from '../../components/sign-in/sign-in';
import Spiner from '../../components/spiner/spiner';
import FilmButtons from '../../components/film-buttons/film-buttons';
import useCheckFilmId from '../../hooks/useCheckFilmId';
import FilmShortList from '../../components/film-short-list/film-short-list';
import FilmNav from '../../components/film-nav/film-nav';
import { getFilm, getSimilar, getSimilarStatus } from '../../store/current-film/selectors';

function Film(): JSX.Element {
  const dispatch = useAppDispatch();
  const similarFilms = useAppSelector(getSimilar);
  const isSimilarFilmsLoaded = useAppSelector(getSimilarStatus);
  const film = useAppSelector(getFilm);
  const id = Number(useParams().id);

  useCheckFilmId(id);

  useEffect(() => {
    // Если перешли сюда по ссылке на карточке фильма, то загрузка с сервера не требуется.
    // При клике на карточку данные фильма были сохранены в state.
    // Загрузка данных произойдет только, если id из стейта НЕ совпадает с id из url
    if ( !film || (film && !(film.id === id)) ) {
      dispatch(fetchCurrentFilmAction(id));
    }
    dispatch(fetchSimilarFilmsAction(id));
    dispatch(fetchReviewsAction(id));
  }, [id, film]);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />
            <SignIn />
          </header>
          {film &&
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>
                <FilmButtons film={film} />
              </div>
            </div>}
        </div>

        {film ?
          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <Video posterImage={film.posterImage} videoLink={film.videoLink} />
              </div>
              <FilmNav film={film} />
            </div>
          </div>
          : <Spiner />}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {isSimilarFilmsLoaded
            ? <FilmShortList maxCount={MAX_SIMILAR_FILM_COUNT} films={similarFilms} />
            : <Spiner />}
        </section>

        <footer className="page-footer">
          <Logo />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Film;
