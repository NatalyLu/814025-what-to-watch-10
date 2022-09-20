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
              <button type="button" className="film-nav__link" onClick={() => {props.onClick(tab);}}>{tab}</button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

export default NavTabs;
