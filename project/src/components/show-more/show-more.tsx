type ShowMoreProps = {
  onClick: (() => void);
  classes?: string;
}

function ShowMore (props: ShowMoreProps):JSX.Element {
  return(
    <div className="catalog__more">
      <button className={`catalog__button ${props.classes ? props.classes : ''}`} onClick={props.onClick} type="button">Show more</button>
    </div>
  );
}

export default ShowMore;
