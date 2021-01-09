import './Cell.css';
import { PLAYER } from '../util/game';

const Cell = (props) => {
  const { v, x, y, onClick } = props;
  let className = "cell";
  if (v === PLAYER.ONE) {
    className += " player1";
  } else if (v === PLAYER.TWO) {
    className += " player2";
  }
  return <div className={className} onClick={ _ => onClick(x, y)}></div>;
}

export default Cell;