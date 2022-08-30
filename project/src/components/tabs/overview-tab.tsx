import {Film} from '../../types/types';

type OverviewTabProps = {
  film: Film;
}

function OverviewTab(props: OverviewTabProps): JSX.Element {
  const {film} = props;

  let level = '';
  if (film) {
    if (film.rating < 3){
      level = 'Bad';
    } else if(film.rating < 5){
      level = 'Normal';
    } else if (film.rating < 8) {
      level = 'Good';
    } else if (film.rating < 10) {
      level = 'Very good';
    } else {
      level = 'Awesome';
    }
  }

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
          <strong>Starring: {film.starring.map((item) => (
            <>
              {' '}{item},
            </>
          ))}
          </strong>
        </p>
      </div>
    </>
  );
}

export default OverviewTab;
