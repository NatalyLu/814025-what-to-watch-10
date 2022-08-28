import {useAppSelector} from '../../hooks';
import FilmCards from '../../components/film-cards/film-cards';
import Logo from '../../components/logo/logo';
import Signing from '../../components/signing/signing';

function MyList(): JSX.Element {
  // Пока подгружаем несколько фильмов из хранилища, позже добавить логику избранных фильмов
  const films = useAppSelector((state) => state.favoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <Signing />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FilmCards films={films} />
        </div>
      </section>

      <footer className="page-footer">
        <Logo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
