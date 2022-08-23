import {useAppSelector} from '../../hooks';

type GenreListProps = {
  activeGenre: string;
  onClick: ((genre: string) => void);
};

function GenreList(props: GenreListProps):JSX.Element {
  const {activeGenre, onClick} = props;
  const genres = useAppSelector((state) => state.genres);

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`} onClick={() => {onClick(genre);}} >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
