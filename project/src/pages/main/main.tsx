import { useEffect } from 'react';
import {store} from '../../store';
import {useAppSelector} from '../../hooks';
import {fetchPromoFilmAction} from '../../store/main/api-actions';
import Logo from '../../components/logo/logo';
import FilmCatalog from '../../components/film-catalog/film-catalog';
import Spiner from '../../components/spiner/spiner';
import SignIn from '../../components/sign-in/sign-in';
import FilmButtons from '../../components/film-buttons/film-buttons';
import { getPromo, getPromoStatus } from '../../store/main/selectors';


function Main(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchPromoFilmAction());
  }, []);

  const promoFilm = useAppSelector(getPromo);
  const isPromoFilmLoaded = useAppSelector(getPromoStatus);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />
          <SignIn />
        </header>

        <div className="film-card__wrap">
          {(!promoFilm || !isPromoFilmLoaded)
            ? <Spiner />
            :
            <div className="film-card__info">
              <div className="film-card__poster">
                <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327" />
              </div>

              <div className="film-card__desc">
                <h2 className="film-card__title">{promoFilm.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{promoFilm.genre}</span>
                  <span className="film-card__year">{promoFilm.released}</span>
                </p>

                <FilmButtons film={promoFilm} />
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
