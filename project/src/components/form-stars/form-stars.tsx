import {Fragment, ChangeEvent} from 'react';

type FormStarsProps = {
  handleStarsChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  isSending: boolean;
  stars: number;
}

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

function FormStars (props: FormStarsProps): JSX.Element {
  const {handleStarsChange, isSending, stars} = props;

  return (
    <div className="rating__stars">
      {
        starsArray.map((star) =>
          (
            <Fragment key={star.value}>
              <input
                onChange={handleStarsChange}
                className="rating__input"
                id={`star-${star.value}`}
                type="radio" name="rating"
                value={star.value}
                checked={star.value === stars}
                disabled={isSending}
              />
              <label className="rating__label" htmlFor={`star-${star.value}`}>Rating {star.value}</label>
            </Fragment>
          ))
      }
    </div>
  );
}

export default FormStars;
