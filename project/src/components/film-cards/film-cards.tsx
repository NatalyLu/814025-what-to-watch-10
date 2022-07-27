import FilmCard from '../film-card/film-card';

type FilmCardsProps = {
  films: {link: string, name: string}[],
}

function FilmCards(props: FilmCardsProps): JSX.Element {

  const film = props.films.map((item) =>
    <FilmCard key={item.name} film={item} />
  );

  return (
    <div className="catalog__films-list">
      {film}
    </div>
  );
}

export default FilmCards;
