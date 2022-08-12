import {Link} from 'react-router-dom';

type NavTabsProps = {
  onClick: ((active: string) => void);
  filmTabs: string[];
}

function NavTabs(props: NavTabsProps): JSX.Element {
  const {filmTabs} = props;

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {filmTabs.map((tab) =>
          (
            <li key={tab} className="film-nav__item">
              <Link to="#" className="film-nav__link" onClick={() => {props.onClick(tab);}}>{tab}</Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

export default NavTabs;
