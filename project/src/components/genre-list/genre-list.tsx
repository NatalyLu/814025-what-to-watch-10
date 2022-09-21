import {useAppSelector} from '../../hooks';
import ShowMore from '../show-more/show-more';
import useShowMore from '../../hooks/useShowMore';
import { getGenres } from '../../store/main/selectors';
import { MaxCount } from '../../enums';

type GenreListProps = {
  activeGenre: string;
  onClick: ((genre: string) => void);
};

function GenreList(props: GenreListProps):JSX.Element {
  const {activeGenre, onClick} = props;
  const genres = useAppSelector(getGenres);

  const {isMoreItemsExist, handleButtonClick, someFilteredItems} = useShowMore(MaxCount.Genres, genres);

  return (
    <ul className="catalog__genres-list">
      {someFilteredItems.map((genre) => (
        <li key={genre} className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`} onClick={() => {onClick(genre);}} >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}

      {(isMoreItemsExist) && <ShowMore classes="catalog__genres-button" onClick={handleButtonClick}/> }
    </ul>
  );
}

export default GenreList;
