import './Board.css';
import Cell from './Cell';
import { GAME_STATE, lowestRow } from '../util/game';
import { useState } from 'react';

const Board = (props) => {
  const { board, gameState, currentPlayer, onCellClick: onClick } = props; 
  const [proposedDrop, setProposedDrop] = useState([-1, -1]);

  const onMouseEnter = (col) => {
    const row = lowestRow(col, board);
    setProposedDrop([row, col]);
  }

  let className = "board";
  if (gameState === GAME_STATE.ONE_WON) {
    className += " player1";
  } else if (gameState === GAME_STATE.TWO_WON) {
    className += " player2";
  } else if (gameState === GAME_STATE.TIE) {
    className += " tie";
  }

  return (
  <div className={className}>
    {board.map((row, x) => <div className="row" key={x}>
      {row.map((cell, y) => {
        let hovered = 0;
        if (!cell && proposedDrop[0] === x && proposedDrop[1] === y) {
          hovered = currentPlayer;
        }
        return <Cell key={`${x},${y}`} {...{v: cell, x, y, hovered, onClick, onMouseEnter}}/>
      })}
    </div>)}
  </div>
  )

}

export default Board;