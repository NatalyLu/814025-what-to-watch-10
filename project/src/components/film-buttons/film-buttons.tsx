import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../const';
import {loadCurrentFilm} from '../../store/action';
import {fetchFavoriteFilmsAction, sendFavoriteFilmAction} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {Film} from '../../types/types';
import { useEffect, useState } from 'react';

type FilmButtonsProps = {
  film: Film;
}

function FilmButtons(props: FilmButtonsProps):JSX.Element {
  const {film} = props;
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const favoriteFilms = useAppSelector((state) => state.favoriteFilms);
  // console.log({'favoriteFilms': favoriteFilms});

  const isFavoriteFirstState = film.isFavorite;
  // console.log({'isFavoriteFirstState': film.isFavorite});

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const [isFilmFavorite, setIsFilmFavorite] = useState (isFavoriteFirstState);
  const [filmsCount, setFilmsCount] = useState (favoriteFilms.length);

  useEffect(() => {
    console.log('/////////////////////////////');
    console.log('UseEffect First');
    console.log({'authorizationStatus': authorizationStatus});
    authorizationStatus === AuthorizationStatus.Auth && dispatch(fetchFavoriteFilmsAction());
    // При размонтировании компонента фиксируем данные о статусе фильма(выбран ли он как favorite), отправив их на сервер
    return () => {
      console.log('/////////////////////////////');
      console.log('UseEffect Second');

      console.log({'isFavoriteFirstState': isFavoriteFirstState, 'isFilmFavorite': isFilmFavorite});
      // if(isFavoriteFirstState !== isFilmFavorite) {
      console.log('We are inside!');
      dispatch(sendFavoriteFilmAction({id: film.id, status: Number(isFilmFavorite)}));
      // dispatch(fetchFavoriteFilmsAction);
      // }
    };
  }, [dispatch, authorizationStatus, film.id]);

  const handlePlayClick = (): void => {
    dispatch(loadCurrentFilm(film));
  };

  const handleMyListClick = (): void => {

    // console.log('/////////////////////////////');
    // Меняем статус фильма по нажатию на кнопку
    setIsFilmFavorite((prev) => !prev);
    // + меняем количество фильмов
    isFilmFavorite ? setFilmsCount((prev) => prev + 1) : setFilmsCount((prev) => prev - 1);
    // console.log({'CLICK newstate ': isFilmFavorite});
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
