import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { checkId } from '../utils/utils';
import { AppRoute } from '../const';
import {useAppSelector} from '../hooks';

function useCheckFilmId(id: number) {
  const allFilms = useAppSelector((state) => state.films);
  const isFilmsLoading = useAppSelector((state) => state.isFilmsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isFilmsLoading) {
      const isIdCorrect = checkId(allFilms, id);
      if (!isIdCorrect) {
        navigate(AppRoute.NotFound);
      }
    }
  }, [allFilms, isFilmsLoading, id]);
}

export default useCheckFilmId;
