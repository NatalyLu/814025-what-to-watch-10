import {useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import FilmCards from '../../components/film-cards/film-cards';
import Logo from '../../components/logo/logo';
import Video from '../../components/video/video';
import Tabs from '../../components/tabs/tabs';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import {filmTabs, AppRoute} from '../../const';
import {fetchCurrentFilmAction, fetchSimilarFilmsAction, fetchReviewsAction} from '../../store/api-actions';
import {checkId} from '../../utils/utils';
import SignIn from '../../components/sign-in/sign-in';
import Spiner from '../../components/spiner/spiner';
import FilmButtons from '../../components/film-buttons/film-buttons';


function Film(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const allFilms = useAppSelector((state) => state.films);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsLoading);
  const isSimilarFilmsLoading = useAppSelector((state) => state.isSimilarFilmsLoading);

  const id = Number(useParams().id);

  useEffect(() => {
    if (!isFilmsLoading) {
      const isIdCorrect = checkId(allFilms, id);
      if (!isIdCorrect) {
        navigate(AppRoute.NotFound);
      }
    }
  }, [allFilms, isFilmsLoading, id]);

  const film = useAppSelector((state) => state.film);

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


  const [type, setType] = useState(filmTabs[0]);
  const handleListClick = (active: string): void => {
    setType(active);
  };

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

        {film &&
          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <Video posterImage={film.posterImage} videoLink={film.videoLink} />
              </div>

              <div className="film-card__desc">
                <NavTabs onClick={handleListClick} filmTabs={filmTabs} />
                <Tabs activeType={type} film={film} />
              </div>
            </div>
          </div>}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {isSimilarFilmsLoading
              ? <Spiner />
              : <FilmCards films={similarFilms} />}
          </div>
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
