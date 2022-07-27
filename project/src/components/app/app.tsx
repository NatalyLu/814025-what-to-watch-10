import Main from '../../pages/main/main';

type AppProps = {
  promoFilm: {
    name: string;
    genre: string;
    year: string;
  },
  films: {link: string, name: string}[],
}

function App(props: AppProps): JSX.Element {
  return (
    <Main
      promoFilm = {props.promoFilm}
      films={props.films}
    />
  );
}

export default App;
