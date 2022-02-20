export const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick} data-square={`square_${props.number}`}>
      {props.value}
    </button>
  );
}