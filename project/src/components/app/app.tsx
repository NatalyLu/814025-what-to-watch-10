import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Error from '../../pages/error/error';
import {PromoFilm, FilmsData, Review} from '../../types/types';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  promoFilm: PromoFilm;
  films: FilmsData;
  reviews: Review[];
}

function App(props: AppProps): JSX.Element {
  const {promoFilm, films, reviews} = props;

  const filmsTextData = films.map((film) =>
    ({
      id: film.id,
      genre: film.genre,
      name: film.name,
      link: film.link,
    })
  );

  const videoArr = films.map((film) =>
    ({
      poster: film.video.poster,
      link: film.video.link,
    })
  );

  // Здесь в будущем достанем данные из общего массива
  const video = videoArr[0];
  const review = reviews[0];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main promoFilm={promoFilm} films={filmsTextData} />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyList films={filmsTextData} />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Film}
          element={<Film films={filmsTextData} review={review} video={video} />}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />

        <Route
          path={AppRoute.Player}
          element={<Player video={video} />}
        />

        <Route
          path='*'
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
