import {Link} from 'react-router-dom';
import {FilmData} from '../../types/types';
import {AppRoute} from '../../const';
import Video from '../video/video';

type FilmCardProps = {
  film: FilmData;
  // onMouseOver: ((film: FilmData) => void);
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film} = props;
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <Video video={film.video} />
        {/* <img src={props.film.link} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" /> */}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
