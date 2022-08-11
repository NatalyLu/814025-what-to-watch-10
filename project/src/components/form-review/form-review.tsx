import {useState, ChangeEvent, SyntheticEvent, Fragment} from 'react';

function FormReview(): JSX.Element {
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
    stars: '8', // Инпут с этим значением активен по умолчанию
    text: '',
  });
  const [isHideValues, setIsHideValue] = useState(false);

  const handleReviewChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    switch (name) {
      case 'rating':
        return setReview({...review, stars: value});
      case 'review-text':
        return setReview({...review, text: value});
      default:
        throw new Error('The new field has been edited. Please, describe the state of this field');
    }
  };

  const handleDetailsShow = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsHideValue (true);
  };

  return(
    <form onSubmit={handleDetailsShow} action="#" className="add-review__htmlForm">
      <div className="rating">
        <div className="rating__stars">
          {
            starsArray.map((star) =>
              (
                <Fragment key={`key-star-${star.value}`}>
                  <input onChange={handleReviewChange} className="rating__input" id={`star-${star.value}`} type="radio" name="rating" value={star.value} checked={star.checked} />
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

      {/* Временно создала блок для показа состояния */}
      {
        isHideValues ?
          <div>
            <span style={ {marginRight: '20px'} }>Rating: {review.stars}</span>
            <span>Review: {review.text}</span>
          </div>
          : null
      }
    </form>
  );
}

export default FormReview;
