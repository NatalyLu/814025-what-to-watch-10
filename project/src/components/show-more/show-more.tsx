type ShowMoreProps = {
  onClick: (() => void);
}

function ShowMore (props: ShowMoreProps):JSX.Element {
  return(
    <div className="catalog__more">
      <button className="catalog__button" onClick={props.onClick} type="button">Show more</button>
    </div>
  );
}

export default ShowMore;
