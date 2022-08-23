import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import Film from '../../pages/film/film';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import Error from '../../pages/error/error';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading/loading';
import {isCheckedAuth} from '../../functions';

function App(): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
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
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
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
    </BrowserRouter>
  );
}

export default App;
