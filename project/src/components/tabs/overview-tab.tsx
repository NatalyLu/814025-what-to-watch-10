import {Film} from '../../types/types';
import {getStarsCount} from '../../utils/utils';

type OverviewTabProps = {
  film: Film;
}

function OverviewTab(props: OverviewTabProps): JSX.Element {
  const {film} = props;

  const level = getStarsCount(film.rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{level}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring">
          <strong>Starring: {film.starring.map((item, index) => (
            <span key={item}>
              {' '}{item}{Boolean(film.starring.length - index - 1) && ','}
            </span>
          ))}
          </strong>
        </p>
      </div>
    </>
  );
}

export default OverviewTab;
