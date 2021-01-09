import './Board.css';
import { useState } from 'react';
import Board from './Board';
import { EMPTY_BOARD, FINAL_STATE, PLAYER, makeMove, checkState } from '../util/game';
import { Button, Container } from '@material-ui/core';

const Game = (_) => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPlayer, setPlayer] = useState(PLAYER.ONE);
  const [gameState, setGameState] = useState(FINAL_STATE.ONGOING);

  const onCellClick = (x, y) => {
    const newBoard = makeMove(x, y, board, currentPlayer);
    if (!newBoard || gameState) {
      return;
    }
    setBoard(newBoard);

    const result = checkState(newBoard);
    if (result) {
      setGameState(result);
    }

    setPlayer(currentPlayer === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE);
  };

  const reset = () => {
    setBoard(EMPTY_BOARD);
    setPlayer(PLAYER.ONE);
    setGameState(FINAL_STATE.ONGOING);
  }

  return (
  <div className="Game">
    <Container>
      <Button variant="contained" color="primary" onClick={reset}>Reset</Button>
    </Container>
    <Board {...{ board, gameState, onCellClick}}/>
  </div>
  )

}

export default Game;