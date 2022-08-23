import {useAppSelector} from '../../hooks/index';
import {Film} from '../../types/types';

type OverviewTabProps = {
  film: Film;
}

function OverviewTab(props: OverviewTabProps): JSX.Element {
  const {film} = props;
  // По id фильма будем получать описание
  const review = useAppSelector((store) => store.reviews.find((item) => film.id === item.id));

  let level = '';
  if (review) {
    if (review.rating < 3){
      level = 'Bad';
    } else if(review.rating < 5){
      level = 'Normal';
    } else if (review.rating < 8) {
      level = 'Good';
    } else if (review.rating < 10) {
      level = 'Very good';
    } else {
      level = 'Awesome';
    }
  }

  return (
    <>
      { review && 
        <>
          <div className="film-rating">
            <div className="film-rating__score">{review.rating}</div>
            <p className="film-rating__meta">
              <span className="film-rating__level">{level}</span>
              <span className="film-rating__count">{film.scoresCount} ratings</span>
            </p>
          </div>

          <div className="film-card__text">
            <p>{review && review.comment}</p>
            <p className="film-card__director"><strong>{film && film.director}</strong></p>
            <p className="film-card__starring"><strong>{film && film.starring}</strong></p>
          </div>
        </>
      }
    </>
  );
}

export default OverviewTab;
