import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Error from '../../pages/error/error';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main />}
        />

        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />

        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
        />

        <Route
          path={AppRoute.Film}
          element={<Film />}
        />

        <Route
          path={AppRoute.AddReview}
          element={<AddReview />}
        />

        <Route
          path={AppRoute.Player}
          element={<Player />}
        />

        <Route
          path='*'
          element={<Error />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
