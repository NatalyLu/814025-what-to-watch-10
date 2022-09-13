
import {useState, useCallback} from 'react';
import {filmTabs} from '../../const';
import {Film} from '../../types/types';
import Tabs from '../../components/tabs/tabs';
import NavTabs from '../../components/nav-tabs/nav-tabs';

function FilmNav(props: {film: Film}): JSX.Element {
  const [type, setType] = useState(filmTabs[0]);
  const handleListClick = useCallback((active: string): void => {
    setType(active);
  }, []);

  return (
    <div className="film-card__desc">
      <NavTabs onClick={handleListClick} filmTabs={filmTabs} />
      <Tabs activeType={type} film={props.film} />
    </div>
  );
}

export default FilmNav;
