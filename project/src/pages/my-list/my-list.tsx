import {useAppSelector} from '../../hooks';
import FilmCards from '../../components/film-cards/film-cards';
import Logo from '../../components/logo/logo';
import SignIn from '../../components/sign-in/sign-in';

function MyList(): JSX.Element {
  const films = useAppSelector((state) => state.favoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
        <SignIn />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCards films={films} />
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
