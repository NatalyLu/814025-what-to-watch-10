import Logo from '../../components/logo/logo';

function Error(): JSX.Element {
  return (
    <section>
      <Logo />
      <h1>404: Страница не найдена</h1>
      <a href="/"> На главную</a>
    </section>
  );
}

export default Error;
