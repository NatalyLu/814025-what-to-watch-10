import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {loadCurrentFilm} from '../../store/action';
import {useAppDispatch} from '../../hooks';
import {Film} from '../../types/types';
import useChangeFavoriteFilm from '../../hooks/useChangeFavoriteFilm';

type FilmButtonsProps = {
  film: Film;
}

function FilmButtons(props: FilmButtonsProps):JSX.Element {
  const {film} = props;
  const {isAuth, handleMyListClick, isFilmFavorite, filmsCount} = useChangeFavoriteFilm(film.id, film.isFavorite);
  const dispatch = useAppDispatch();

  const handlePlayClick = (): void => {
    dispatch(loadCurrentFilm(film));
  };

  return(
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        to={AppRoute.Player.replace(':id', String(film.id))}
        onClick={handlePlayClick}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>

      {isAuth &&
      <button
        className="btn btn--list film-card__button"
        onClick={handleMyListClick}
        type="button"
      >
        {isFilmFavorite
          ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>}
        <span>My list</span>
        <span className="film-card__count">{filmsCount}</span>
      </button>}

      {isAuth && <Link to={AppRoute.AddReview.replace(':id', String(film.id))} className="btn film-card__button">Add review</Link>}
    </div>
  );
}

export default FilmButtons;
