import Main from '../../pages/main/main';

type AppFilmProps = {
  promoFilm: {
    name: string;
    genre: string;
    year: string;
  }
}

function App(props: AppFilmProps): JSX.Element {
  return (
    <Main
      promoFilm = {props.promoFilm}
    />
  );
}

export default App;
