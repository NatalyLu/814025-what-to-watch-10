import {Link} from 'react-router-dom';
import {Film} from '../../types/types';
import {AppRoute} from '../../const';

type FilmCardProps = {
  film: Film;
  onMouseOver: ((film: Film) => void);
}

function FilmCard(props: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => {props.onMouseOver(props.film);}}>
      <div className="small-film-card__image">
        <img src={props.film.link} alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoute.Film}>{props.film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
