import {Link} from 'react-router-dom';
import {Film} from '../../types/types';
import {AppRoute} from '../../const';
import Video from '../video/video';
import {useAppDispatch} from '../../hooks';
import {loadCurrentFilm} from '../../store/action';

type FilmCardProps = {
  film: Film;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  const dispatch = useAppDispatch();

  const handleFilmTitleClick = (): void => {
    dispatch(loadCurrentFilm(film));
  };

  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image" style={ {pointerEvents: 'none'} }>
        <Video posterImage={film.posterImage} videoLink={film.videoLink} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film + film.id} onClick={handleFilmTitleClick}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
