import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { checkId } from '../utils/utils';
import { AppRoute } from '../enums';
import {useAppSelector} from '../hooks';
import { getFilms, getFilmsStatus } from '../store/main/selectors';

function useCheckFilmId(id: number) {
  const allFilms = useAppSelector(getFilms);
  const isFilmsLoaded = useAppSelector(getFilmsStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFilmsLoaded) {
      const isIdCorrect = checkId(allFilms, id);
      if (!isIdCorrect) {
        navigate(AppRoute.NotFound);
      }
    }
  }, [allFilms, isFilmsLoaded, id]);
}

export default useCheckFilmId;
