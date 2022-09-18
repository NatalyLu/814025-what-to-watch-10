import { useAppSelector } from '../hooks';
import { AuthorizationStatus } from '../enums';
import { getAuthorizationStatus } from '../store/user/selectors';

function useCheckAuthStatus() {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth;
}

export default useCheckAuthStatus;
