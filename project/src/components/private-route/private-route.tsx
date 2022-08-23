import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/index';
import LoadingScreen from '../../pages/loading/loading';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoaded) {
    return <LoadingScreen />;
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}

export default PrivateRoute;
