import {useState, ChangeEvent, SyntheticEvent} from 'react';

function FormReview(): JSX.Element {
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
          <input onChange={handleReviewChange} className="rating__input" id="star-10" type="radio" name="rating" value="10" />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-9" type="radio" name="rating" value="9" />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-8" type="radio" name="rating" value="8" checked />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-7" type="radio" name="rating" value="7" />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-6" type="radio" name="rating" value="6" />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-5" type="radio" name="rating" value="5" />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-4" type="radio" name="rating" value="4" />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-3" type="radio" name="rating" value="3" />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-2" type="radio" name="rating" value="2" />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>

          <input onChange={handleReviewChange} className="rating__input" id="star-1" type="radio" name="rating" value="1" />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>

      <div className="add-review__text">
        <input onChange={handleReviewChange} className="add-review__text" name="review-text2" type="text" id="review-text2" placeholder="Review textjdjdjd" />
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
