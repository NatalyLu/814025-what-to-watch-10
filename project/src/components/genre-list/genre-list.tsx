import {useAppSelector} from '../../hooks';
import ShowMore from '../show-more/show-more';
import useShowMore from '../../hooks/useShowMore';
import {MAX_GENRES_COUNT} from '../../const';
import { getGenres } from '../../store/main/selectors';

type GenreListProps = {
  activeGenre: string;
  onClick: ((genre: string) => void);
};

function GenreList(props: GenreListProps):JSX.Element {
  const {activeGenre, onClick} = props;
  const genres = useAppSelector(getGenres);

  const {isItems, handleButtonClick, someFilteredItems} = useShowMore(MAX_GENRES_COUNT, genres);

  return (
    <ul className="catalog__genres-list">
      {someFilteredItems.map((genre) => (
        <li key={genre} className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`} onClick={() => {onClick(genre);}} >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}

      {(isItems) && <ShowMore classes="catalog__genres-button" onClick={handleButtonClick}/> }
    </ul>
  );
}

export default GenreList;
