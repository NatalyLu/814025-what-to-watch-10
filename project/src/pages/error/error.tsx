import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Logo from '../../components/logo/logo';

function Error(): JSX.Element {
  return (
    <section>
      <Logo />
      <h1>404: Страница не найдена</h1>
      <Link to={AppRoute.Main}> На главную</Link>
    </section>
  );
}

export default Error;
