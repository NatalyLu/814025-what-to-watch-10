import {ChangeEvent} from 'react';
import {TEXTAREA_MIN_LENGTH, TEXTAREA_MAX_LENGTH} from '../../const';

type FormTextareaProps = {
  handleTextChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
  isSending: boolean;
  text: string;
}

function FormTextarea (props: FormTextareaProps):JSX.Element {
  const{handleTextChange, isSending, text} = props;

  return (
    <textarea
      onChange={handleTextChange}
      value={text}
      minLength={TEXTAREA_MIN_LENGTH}
      maxLength={TEXTAREA_MAX_LENGTH}
      className="add-review__textarea"
      name="review-text"
      id="review-text"
      placeholder="Review text"
      disabled={isSending}
    >
    </textarea>
  );
}

export default FormTextarea;
