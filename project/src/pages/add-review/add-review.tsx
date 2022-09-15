import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute} from '../../const';
import {fetchCurrentFilmAction} from '../../store/current-film/api-actions';
import Logo from '../../components/logo/logo';
import FormReview from '../../components/form-review/form-review';
import SignIn from '../../components/sign-in/sign-in';
import useCheckFilmId from '../../hooks/useCheckFilmId';
import { getFilm } from '../../store/current-film/selectors';
import Spiner from '../../components/spiner/spiner';

function AddReview(): JSX.Element {
  const dispatch = useAppDispatch();
  const id = Number(useParams().id);
  const film = useAppSelector(getFilm);

  useCheckFilmId(id);

  useEffect(() => {
    // Если перешли сюда по ссылке на карточке фильма, то загрузка с сервера не требуется.
    // При клике на карточку данные фильма были сохранены в state.
    // Загрузка данных произойдет только, если id из стейта НЕ совпадает с id из url
    if ( !film || (film && !(film.id === id)) ) {
      dispatch(fetchCurrentFilmAction(id));
    }
  }, [id]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film} className="breadcrumbs__link">{film?.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <SignIn />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        {film ? <FormReview filmId={film.id} rating={film.rating} /> : <Spiner />}
      </div>
    </section>
  );
}

export default AddReview;
