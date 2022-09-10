import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import {fetchFavoriteFilmsAction, sendFavoriteFilmAction} from '../store/api-actions';
import useCheckAuthStatus from './useCheckAuthStatus';

function useChangeFavoriteFilm(id: number, isFavorite: boolean) {
  const dispatch = useAppDispatch();
  const isAuth = useCheckAuthStatus();

  const favoriteFilms = useAppSelector((state) => state.favoriteFilms);

  const [isFilmFavorite, setIsFilmFavorite] = useState(isFavorite);
  const [filmsCount, setFilmsCount] = useState(favoriteFilms.length);

  useEffect(() => {
    console.log('Start loading favorite films');
    isAuth && dispatch(fetchFavoriteFilmsAction());

    console.log('Got Favorite films!');
    // При размонтировании компонента фиксируем данные о статусе фильма(выбран ли он как favorite), отправив их на сервер
    return () => {
      console.log('Delete component!');
      dispatch(
        sendFavoriteFilmAction({
          id: id,
          status: Number(isFilmFavorite),
        })
      );
    };
  }, [dispatch, isAuth, id]);

  const handleMyListClick = (): void => {
    setIsFilmFavorite((prev) => {
      console.log("INSIDE");
      const toggleValue = !prev;

      if (toggleValue) {
        setFilmsCount((prevCount) => {
          console.log('PREV', prevCount);
          console.log('PREV+1', prevCount + 1);
          return prevCount + 1;
        })
      } else {
        setFilmsCount((prevCount) => prevCount - 1);
      }

      return toggleValue;
    });
  };

  return { isAuth, handleMyListClick, isFilmFavorite, filmsCount };
}

export default useChangeFavoriteFilm;
