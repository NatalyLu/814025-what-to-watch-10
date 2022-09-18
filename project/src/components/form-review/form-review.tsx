import {useState, ChangeEvent, SyntheticEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {sendReviewAction} from '../../store/current-film/api-actions';
import {TEXTAREA_MIN_LENGTH} from '../../const';
import FormStars from '../form-stars/form-stars';
import FormTextarea from '../form-textarea/form-textarea';
import { getSendingReviewStatus } from '../../store/current-film/selectors';

type FormReviewProps = {
  filmId: number;
  rating: number;
}

function FormReview(props: FormReviewProps): JSX.Element {
  const {filmId, rating} = props;
  const isReviewSending = useAppSelector(getSendingReviewStatus);
  const dispatch = useAppDispatch();

  const [stars, setStar] = useState(Math.floor(rating));
  const handleStarsChange = (evt: ChangeEvent<HTMLInputElement>) => ( setStar(Number(evt.target.value)) );

  const [text, setText] = useState('');
  const handleTextChange = (evt: ChangeEvent<HTMLTextAreaElement>) => ( setText(evt.target.value) );

  const formRef = useRef<HTMLFormElement>(null);
  const handleReviewSend = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(sendReviewAction( {id: filmId, review: {comment: text, rating: stars}} ));
    formRef.current?.reset();
  };

  return(
    <form onSubmit={handleReviewSend} ref={formRef} action="#" className="add-review__htmlForm">
      <div className="rating">
        <FormStars handleStarsChange={handleStarsChange} isSending={isReviewSending} stars={stars} />
      </div>

      <div className="add-review__text">
        <FormTextarea handleTextChange={handleTextChange} isSending={isReviewSending} text={text} />

        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={text.length < TEXTAREA_MIN_LENGTH || !stars || isReviewSending}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormReview;
