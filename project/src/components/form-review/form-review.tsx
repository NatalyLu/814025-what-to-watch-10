import {useState, ChangeEvent, SyntheticEvent, Fragment, useRef} from 'react';
import {useAppDispatch} from '../../hooks';
import {sendReviewAction} from '../../store/api-actions';

type FormReviewProps = {
  filmId: number;
  rating: number;
}

function FormReview(props: FormReviewProps): JSX.Element {
  const {filmId, rating} = props;

  const starsArray = [
    {
      value: 10,
      checked: false,
    },
    {
      value: 9,
      checked: false,
    },
    {
      value: 8,
      checked: true,
    },
    {
      value: 7,
      checked: false,
    },
    {
      value: 6,
      checked: false,
    },
    {
      value: 5,
      checked: false,
    },
    {
      value: 4,
      checked: false,
    },
    {
      value: 3,
      checked: false,
    },
    {
      value: 2,
      checked: false,
    },
    {
      value: 1,
      checked: false,
    }
  ];

  const [review, setReview] = useState({
    stars: Math.floor(rating), // Инпут с этим значением активен по умолчанию
    text: '',
  });

  const handleReviewChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    switch (name) {
      case 'rating':
        return setReview({...review, stars: Number(value)});
      case 'review-text':
        return setReview({...review, text: value});
      default:
        throw new Error('The new field has been edited. Please, describe the state of this field');
    }
  };

  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleReviewSend = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(sendReviewAction( {id: filmId, review: {comment: review.text, rating: review.stars}} ));
    formRef.current?.reset();
  };

  return(
    <form onSubmit={handleReviewSend} ref={formRef} action="#" className="add-review__htmlForm">
      <div className="rating">
        <div className="rating__stars">
          {
            starsArray.map((star) =>
              (
                <Fragment key={`key-star-${star.value}`}>
                  <input onChange={handleReviewChange} className="rating__input" id={`star-${star.value}`} type="radio" name="rating" value={star.value} checked={star.value === review.stars} />
                  <label className="rating__label" htmlFor={`star-${star.value}`}>Rating {star.value}</label>
                </Fragment>
              )
            )
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={handleReviewChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>
      </div>
    </form>
  );
}

export default FormReview;
