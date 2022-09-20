import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchFavoriteFilmsAction, sendFavoriteFilmAction } from '../store/user/api-actions';
import { getFavorites } from '../store/user/selectors';
import useCheckAuthStatus from './useCheckAuthStatus';

function useChangeFavoriteFilm(id: number, isFavorite: boolean) {
  const dispatch = useAppDispatch();
  const isAuth = useCheckAuthStatus();
  const favoriteFilms = useAppSelector(getFavorites);
  const favoriteFilmsCount = favoriteFilms.length;

  // Используем реф, чтобы в useEffect было актуальное значение переменой
  const latestState = useRef(isFavorite);
  // Обновляем значение реф-переменной при смене страницы фильма
  useEffect(() => {
    latestState.current = isFavorite;
  }, [id]);

  useEffect(() => {
    isAuth && dispatch(fetchFavoriteFilmsAction());
  }, [isAuth, dispatch]);

  const handleMyListClick = (): void => {
    const toggleValue = !latestState.current;

    latestState.current = toggleValue;
    dispatch(
      sendFavoriteFilmAction({
        id: id,
        status: Number(latestState.current),
      })
    );
  };

  return {
    isAuth,
    handleMyListClick,
    isFilmFavorite: latestState.current,
    filmsCount: favoriteFilmsCount,
  };
}

export default useChangeFavoriteFilm;
