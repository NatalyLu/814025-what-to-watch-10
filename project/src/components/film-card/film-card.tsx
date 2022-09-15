import {memo} from 'react';
import {Link} from 'react-router-dom';
import {Film} from '../../types/types';
import {AppRoute} from '../../const';
import Video from '../video/video';
import {useAppDispatch} from '../../hooks';
import { changeCurrentFilm } from '../../store/current-film/actions';

type FilmCardProps = {
  film: Film;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  const dispatch = useAppDispatch();

  const handleFilmTitleClick = (): void => {
    dispatch(changeCurrentFilm(film));
  };

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image" style={ {pointerEvents: 'none'} }>
        <Video posterImage={film.posterImage} videoLink={film.videoLink} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film.replace(':id', String(film.id))} onClick={handleFilmTitleClick}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default memo(FilmCard);
