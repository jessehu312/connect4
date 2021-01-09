import './Board.css';
import { useState } from 'react';
import Board from './Board';
import Status from './Status';
import { EMPTY_BOARD, GAME_STATE, GAME_TYPE, PLAYER, makeMove, checkState } from '../util/game';
import { Button, Container, Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const Game = (_) => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPlayer, setPlayer] = useState(PLAYER.ONE);
  const [gameState, setGameState] = useState(GAME_STATE.ONGOING);
  const [gameType, setGameType] = useState(GAME_TYPE.SINGLE);

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
    if (gameType !== GAME_TYPE.SINGLE && gameState === GAME_STATE.ONGOING) {
      return;
    }
    setBoard(EMPTY_BOARD);
    setPlayer(PLAYER.ONE);
    setGameState(GAME_STATE.ONGOING);
  }

  return (
  <div className="Game">
    <Container>
      <FormGroup row>
        <Button variant="contained" color="primary" onClick={reset}>Reset</Button>
        <div style={{width: "30px"}}/>
        <FormControlLabel
          control={
            <Switch
              checked={!!gameType}
              onChange={() => setGameType(gameType === GAME_TYPE.SINGLE ? GAME_TYPE.MULTIPLAYER : GAME_TYPE.SINGLE)}
              name="checkedB"
              color="primary"
            />
          }
          label="Multiplayer"
        />
        <Status {...{gameState, currentPlayer}}/>
      </FormGroup>
    </Container>
    <Board {...{ board, gameState, currentPlayer, onCellClick}}/>
  </div>
  )

}

export default Game;