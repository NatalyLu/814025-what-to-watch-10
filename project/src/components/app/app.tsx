import Main from '../../pages/main/main';
import {PromoFilm} from '../../types/types';
import {Film} from '../../types/types';

type AppProps = {
  promoFilm: PromoFilm;
  films: Film[];
}

function App(props: AppProps): JSX.Element {
  return (
    <Main promoFilm={props.promoFilm} films={props.films} />
  );
}

export default App;
