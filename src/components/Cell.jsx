import './Cell.css';
import { PLAYER } from '../util/game';

const Cell = (props) => {
  const { v, x, y, hovered, onClick, onMouseEnter } = props;
  let className = "cell";
  if (v === PLAYER.ONE) {
    className += " player1";
  } else if (v === PLAYER.TWO) {
    className += " player2";
  }
  
  if (hovered) {
    if (hovered === PLAYER.ONE) {
      className += " player1";
    } else if (hovered === PLAYER.TWO) {
      className += " player2";
    }
    className += " hovered";
  }
  return <div className={className} onClick={ _ => onClick(x, y)} onMouseEnter={ _ => onMouseEnter(y)}></div>;
}

export default Cell;