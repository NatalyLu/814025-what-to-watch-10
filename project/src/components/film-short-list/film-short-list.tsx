import FilmCards from '../../components/film-cards/film-cards';
import ShowMore from '../show-more/show-more';
import useShowMore from '../../hooks/useShowMore';
import {Films} from '../../types/types';

type FilmShortListProps ={
  maxCount: number,
  films: Films,
}

function FilmShortList (props: FilmShortListProps):JSX.Element {
  const {maxCount, films} = props;
  const {isMoreItemsExist, handleButtonClick, someFilteredItems} = useShowMore(maxCount, films);

  return (
    <>
      <FilmCards films={someFilteredItems} />
      {(isMoreItemsExist) && <ShowMore onClick={handleButtonClick}/> }
    </>
  );
}

export default FilmShortList;
