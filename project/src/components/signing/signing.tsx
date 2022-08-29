import { SyntheticEvent } from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function Signing(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.user);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const handleLinkClick = (evt: SyntheticEvent) : void=> {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? (
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={userData && userData.avatarUrl} alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <Link className="user-block__link" onClick={handleLinkClick} to='/'>Sign out</Link>
          </li>
        </ul>
      )
      : (
        <div className="user-block">
          <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
        </div>
      )
  );
}

export default Signing;
