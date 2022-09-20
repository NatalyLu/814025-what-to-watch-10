import './spiner.css';

type SpinerProps = {
  classes?: string;
}

function Spiner(props: SpinerProps): JSX.Element {
  const {classes} = props;
  return (
    <div className={`loading-spiner ${classes && classes}`}></div>
  );
}

export default Spiner;
