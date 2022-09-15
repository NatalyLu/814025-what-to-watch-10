import { useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchFavoriteFilmsAction, sendFavoriteFilmAction } from '../store/user/api-actions';
import { getFavorites } from '../store/user/selectors';
import useCheckAuthStatus from './useCheckAuthStatus';

function useChangeFavoriteFilm(id: number, isFavorite: boolean) {
  const dispatch = useAppDispatch();
  const isAuth = useCheckAuthStatus();
  const favoriteFilms = useAppSelector(getFavorites);
  const [filmsCount, setFilmsCount] = useState(favoriteFilms.length);

  // Используем реф, чтобы в useEffect было актуальное значение переменой
  const latestState = useRef(isFavorite);

  useEffect(() => {
    isAuth && dispatch(fetchFavoriteFilmsAction());
  }, [isAuth, dispatch]);

  useEffect(() => () => {
    // При размонтировании компонента сравниваем, изменилось ли значение флага добавления фильма
    // и отправляем данные о статусе фильма(выбран ли он как favorite) на сервер
    if (latestState.current !== isFavorite) {
      dispatch(
        sendFavoriteFilmAction({
          id: id,
          status: Number(latestState.current),
        })
      );
    }
  }, [dispatch, id, isFavorite]);

  const handleMyListClick = (): void => {
    const toggleValue = !latestState.current;

    latestState.current = toggleValue;
    toggleValue
      ? setFilmsCount((prev) => prev + 1)
      : setFilmsCount((prev) => prev - 1);
  };

  return {
    isAuth,
    handleMyListClick,
    isFilmFavorite: latestState.current,
    filmsCount: filmsCount,
  };
}

export default useChangeFavoriteFilm;
