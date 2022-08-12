import {filmReviews} from '../../mocks/film-reviews';
import {TabsReview} from '../../types/types';

function ReviewsTab(): JSX.Element {
  // Так как отзывы выводятся в 2 колонки, то
  // необходимо разбить массив напополам =>
  // находим индекс центрального элемента массива (делением на 2 :))
  // Eсли число отзывов нечетное, то округляем в большую сторону, чтобы в первой (левой) колонке было большее количество элементов
  // -1, т.к. индексы в массиве идут с 0
  const IndexOfArrayCenter = ( (filmReviews.length % 2) ? Math.ceil(filmReviews.length / 2) : filmReviews.length / 2);

  const firstColumn = filmReviews.slice(0, IndexOfArrayCenter);
  const secondColumn = filmReviews.slice(IndexOfArrayCenter);

  const getReviews = (array: TabsReview[]): JSX.Element[] => {
    return(
      array.map((item) =>
        (
          <div className="review" key={item.author}>
            <blockquote className="review__quote">
              <p className="review__text">{item.description}</p>
              <footer className="review__details">
                <cite className="review__author">{item.author}</cite>
                <time className="review__date" dateTime={item.dateTime}>{item.date}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{item.rating}</div>
          </div>
        )
      )
    );
  };

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {getReviews(firstColumn)}
      </div>
      <div className="film-card__reviews-col">
        {getReviews(secondColumn)}
      </div>
    </div>
  );
}

export default ReviewsTab;
