import {useAppSelector} from '../../hooks/index';
// import {TabsReview} from '../../types/types';

function ReviewsTab(): JSX.Element {
  const reviews = useAppSelector((store) => store.reviews);
  // Так как отзывы выводятся в 2 колонки, то
  // необходимо разбить массив напополам =>
  // находим индекс центрального элемента массива (делением на 2 :))
  // Eсли число отзывов нечетное, то округляем в большую сторону, чтобы в первой (левой) колонке было большее количество элементов
  // -1, т.к. индексы в массиве идут с 0
  // const IndexOfArrayCenter = ( (filmReviews.length % 2) ? Math.ceil(filmReviews.length / 2) : filmReviews.length / 2);

  // const firstColumn = filmReviews.slice(0, IndexOfArrayCenter);
  // const secondColumn = filmReviews.slice(IndexOfArrayCenter);

  // const getReviews = (array: TabsReview[]): JSX.Element[] => (
  //   array.map((item) =>
  //     (
  //       <div className="review" key={item.author}>
  //         <blockquote className="review__quote">
  //           <p className="review__text">{item.description}</p>
  //           <footer className="review__details">
  //             <cite className="review__author">{item.author}</cite>
  //             <time className="review__date" dateTime={item.dateTime}>{item.date}</time>
  //           </footer>
  //         </blockquote>
  //         <div className="review__rating">{item.rating}</div>
  //       </div>
  //     )
  //   )
  // );

  return (
    <div className="film-card__reviews film-card__row">
      {/* <div className="film-card__reviews-col">
        {getReviews(firstColumn)}
      </div> */}
      {/* <div className="film-card__reviews-col"> */}
      {/* {getReviews(secondColumn)}
      </div> */}

      <div className="film-card__reviews-col">
        {
          reviews.map((review) => (
            <div className="review" key={review.id}>
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>
                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime={review.date}>{review.date}</time>
                </footer>
              </blockquote>
              <div className="review__rating">{review.rating}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default ReviewsTab;
