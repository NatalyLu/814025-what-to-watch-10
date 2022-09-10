import { useAppSelector } from '../hooks';
import { AuthorizationStatus } from '../const';

function useCheckAuthStatus() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth;
}

export default useCheckAuthStatus;
