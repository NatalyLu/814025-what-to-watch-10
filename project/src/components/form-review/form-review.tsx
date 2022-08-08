import {useState, ChangeEvent, SyntheticEvent} from 'react';

function FormReview(): JSX.Element {
  const STAR_ARRAY = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

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
            STAR_ARRAY.map((star) =>
              (
                <>
                  <input key={`key-star-${star}`} onChange={handleReviewChange} className="rating__input" id={`star-${star}`} type="radio" name="rating" value={star} checked={Number(review.stars) === star ? true : false} />
                  <label key={`key-star-${star}`} className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
                </>
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
