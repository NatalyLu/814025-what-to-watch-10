import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../enums';
import { useAppSelector } from '../../hooks';
import SignIn from '../../pages/sign-in/sign-in';
import { getAuthorizationStatus } from '../../store/user/selectors';

function SignInRoute ():JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? <SignIn />
      : <Navigate to={AppRoute.Main} />
  );
}

export default SignInRoute;
