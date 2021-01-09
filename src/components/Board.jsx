import './Board.css';
import Cell from './Cell';
import { FINAL_STATE } from '../util/game';

const Board = (props) => {
  const { board, gameState, onCellClick: onClick } = props; 

  let className = "board";
  if (gameState === FINAL_STATE.ONE_WON) {
    className += " player1";
  } else if (gameState === FINAL_STATE.TWO_WON) {
    className += " player2";
  } else if (gameState === FINAL_STATE.TIE) {
    className += " tie";
  }

  return (
  <div className={className}>
    {board.map((row, x) => <div className="row" key={x}>
      {row.map((cell, y) => <Cell key={`${x},${y}`} {...{v: cell, x, y, onClick}}/>)}
    </div>)}
  </div>
  )

}

export default Board;