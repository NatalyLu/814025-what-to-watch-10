import {ChangeEvent} from 'react';
import { TextAreaLength } from '../../enums';

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
      minLength={TextAreaLength.Min}
      maxLength={TextAreaLength.Max}
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
