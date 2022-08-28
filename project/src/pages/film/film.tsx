import {Link, useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute} from '../../const';
import FilmCards from '../../components/film-cards/film-cards';
import Logo from '../../components/logo/logo';
import Video from '../../components/video/video';
import Tabs from '../../components/tabs/tabs';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import {filmTabs} from '../../const';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import {checkId} from '../../utils/utils';


function Film(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const allFilms = useAppSelector((state) => state.films);

  const id = Number(useParams().id);
  console.log(id);
  const isIdCorrect = checkId(allFilms, id);

  useEffect(() => {
    if (!isIdCorrect) {
      navigate(AppRoute.NotFound);
    }
    // Если перешли сюда по ссылке на карточке фильма, то загрузка с сервера не требуется.
    // При клике на карточку данные фильма были сохранены в state.
    // Загрузка данных произойдет только, если id из стейта НЕ совпадает с id из url
    if ( !film || (film && !(film.id === id)) ) {
      dispatch(fetchCurrentFilmAction(id));
    }
  }, [id]);
  const film = useAppSelector((state) => state.film);

  const [type, setType] = useState(filmTabs[0]);
  const handleListClick = (active: string): void => {
    setType(active);
  };

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>
          {film &&
            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">9</span>
                  </button>
                  <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
                </div>
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
            <FilmCards films={similarFilms} />
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
