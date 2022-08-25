import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {fetchPromoFilmAction} from '../../store/api-actions';
import {store} from '../../store';
import Logo from '../../components/logo/logo';
import FilmCatalog from '../../components/film-catalog/film-catalog';
import Spiner from '../../components/spiner/spiner';
import { useEffect } from 'react';


function Main(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchPromoFilmAction(2));
  }, []);

  const {promoFilm, authorizationStatus, isPromoFilmLoaded} = useAppSelector((state) => state);
  const userData = useAppSelector((state) => state.user);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          {authorizationStatus && userData
            ? (
              <ul className="user-block">
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src={userData.avatarUrl} alt="User avatar" width="63" height="63" />
                  </div>
                </li>
                <li className="user-block__item">
                  <a className="user-block__link">Sign out</a>
                </li>
              </ul>
            )
            : (
              <div className="user-block">
                <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
              </div>
            )}
        </header>

        <div className="film-card__wrap">
          {!promoFilm && isPromoFilmLoaded && <Spiner />}
          {promoFilm &&
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt={promoFilm.name} width="218" height="327" />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promoFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promoFilm.genre}</span>
                  <span className="film-card__year">{promoFilm.released}</span>
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
                </div>
              </div>
            </div>}
        </div>
      </section>

      <div className="page-content">
        <FilmCatalog />
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

export default Main;
