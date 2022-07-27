import Main from '../../pages/main/main';
import {PromoFilm} from '../../types/types';
import {Films} from '../../types/types';

function App(props: PromoFilm & Films): JSX.Element {
  return (
    <Main
      promoFilm = {props.promoFilm}
      films={props.films}
    />
  );
}

export default App;
