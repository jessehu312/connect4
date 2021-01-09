import './Board.css';
import { useState } from 'react';
import Cell from './Cell';
import { FINAL_STATE, PLAYER, makeMove, checkState } from '../util/game';

const Board = (_) => {
  const [board, setBoard] = useState(
    [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ]
  );
  const [currentPlayer, setPlayer] = useState(PLAYER.ONE);
  const [gameState, setGameState] = useState(FINAL_STATE.ONGOING);

  const onClick = (x, y) => {
    const newBoard = makeMove(x, y, board, currentPlayer);
    if (!newBoard || gameState) {
      return;
    }
    setBoard(newBoard);

    const result = checkState(newBoard);
    if (result) {
      console.log(`PLAYER ${result} WON`);
      setGameState(result);
    }

    setPlayer(currentPlayer === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE);
  }

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
      {row.map((cell, y) => <Cell key={y} {...{v: cell, x, y, onClick}}/>)}
    </div>)}
  </div>
  )

}

export default Board;