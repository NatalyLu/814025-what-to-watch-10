import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import {default as OneFilm} from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import {PromoFilm} from '../../types/types';
import {Film} from '../../types/types';

type AppProps = {
  promoFilm: PromoFilm;
  films: Film[];
}

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main promoFilm={props.promoFilm} films={props.films} />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />

        <Route
          path={AppRoute.MyList}
          element={<MyList films={props.films} />}
        />

        <Route
          path={AppRoute.Film}
          element={<OneFilm films={props.films} />}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />

        <Route
          path={AppRoute.Player}
          element={<Player />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
