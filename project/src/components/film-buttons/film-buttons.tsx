import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {AppRoute, ErrorText} from '../../enums';
import {changeCurrentFilm} from '../../store/current-film/actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Film} from '../../types/types';
import useChangeFavoriteFilm from '../../hooks/useChangeFavoriteFilm';
import {getFavoriteStatus} from '../../store/user/selectors';
import { useEffect } from 'react';
import { replaceId } from '../../utils/utils';

type FilmButtonsProps = {
  film: Film;
}

function FilmButtons(props: FilmButtonsProps):JSX.Element {
  const {film} = props;
  const {isAuth, handleMyListClick, isFilmFavorite, filmsCount} = useChangeFavoriteFilm(film.id, film.isFavorite);
  const dispatch = useAppDispatch();

  // true - если мы ещё в процессе отправления статуса фильма, false - если ответ получен, null - отклонен
  const isFavoriteStatusSending = useAppSelector(getFavoriteStatus);
  const isStatusDefault = isFavoriteStatusSending === null;

  useEffect(()=> {
    if (isStatusDefault) {
      toast.error(ErrorText.Default);
    }
  }, [isFavoriteStatusSending]);

  const handlePlayClick = (): void => {
    dispatch(changeCurrentFilm(film));
  };

  return(
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        to={replaceId(AppRoute.Player, film.id)}
        onClick={handlePlayClick}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </Link>

      {isAuth && !isStatusDefault &&
        <>
          <button
            className="btn btn--list film-card__button"
            onClick={handleMyListClick}
            type="button"
            disabled={isFavoriteStatusSending}
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
          </button>
          <Link to={replaceId(AppRoute.AddReview, film.id)} className="btn film-card__button">Add review</Link>
        </>}
    </div>
  );
}

export default FilmButtons;
