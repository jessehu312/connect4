import { useState, useEffect } from 'react';
import Board from './Board';
import Status from './Status';
import Roster from './Roster';
import { EMPTY_BOARD, GAME_STATE, GAME_TYPE, PLAYER, makeMove, checkState } from '../util/game';
import { Button, Container, Switch, FormGroup, FormControlLabel, TextField, Box } from '@material-ui/core';
import { EventProvider } from '../context/EventProvider';

const Game = (_) => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPlayer, setPlayer] = useState(PLAYER.ONE);
  const [gameState, setGameState] = useState(GAME_STATE.ONGOING);
  const [gameType, setGameType] = useState(GAME_TYPE.SINGLE);
  const [playerName, setPlayerName] = useState("");

  const onCellClick = (x, y) => {
    const newBoard = makeMove(x, y, board, currentPlayer);
    if (!newBoard || gameState) {
      return;
    }
    setBoard(newBoard);

    const result = checkState(newBoard);
    if (!result || gameState === GAME_TYPE.SINGLE) {
      setGameState(result);
    }

    if (window.sendMatch && gameType === GAME_TYPE.MULTIPLAYER) {
      console.log('!!!Send Game State');
      console.log(newBoard)
      if (result === GAME_STATE.ONGOING)
        setGameState(GAME_STATE.HOLD);
      window.sendMatch(newBoard);
    } else {
      setPlayer(currentPlayer === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE);
    }
  };

  const reset = () => {
    if (gameType !== GAME_TYPE.SINGLE && (gameState === GAME_STATE.ONGOING || gameState === GAME_STATE.HOLD)) {
      return;
    }
    setBoard(EMPTY_BOARD);
    setPlayer(PLAYER.ONE);
    setGameState(GAME_STATE.ONGOING);
  };

  const onMatch = data => {
    const result = checkState(data);
    setGameState(result);
    console.log(`!!! Received Game State - CURRENT_STATE: ${gameState} - HOLD: ${GAME_STATE.HOLD}`);
    console.log(data);
    setBoard(data);
  };

  const onAccept = (data, socket) => {
      reset();
      // YOU ARE PLAYER 1, Send Match
      console.log('!!! Received Accept')
      window.sendMatch = ((newBoard) => {
        if (!newBoard) {
          console.log('null');
          return;
        }
        socket.emit('match', { ...data, "board": newBoard});
      });
  };

  const onNewMatch = ({players, eventEmitter}) => {
    reset();
    setGameState(GAME_STATE.HOLD);
    setPlayer(PLAYER.TWO);
    const matchId = Date.now();
    // YOU ARE PLAYER 2, Send Accept
    console.log('!!! Send Accept')
    window.sendMatch = ((newBoard) => {
      if (!newBoard) {
        console.log('null');
        return;
      }
      eventEmitter.socket.emit('match', { id: matchId, players, "board": newBoard});
    })
    eventEmitter.match({ id: matchId, players, "board": EMPTY_BOARD });
  };

  //console.log(`${gameType} - ${playerName}`);
  return (
  <Box className="Game" display="flex">
    <Container>
      <Status {...{gameState, currentPlayer}}/>
      <Container>
        <FormGroup row>
          <Button variant="contained" color="primary" onClick={reset}>Reset</Button>
          <div style={{width: "20px"}}/>
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
          <form noValidate autoComplete="off">
            <TextField label="Name" onInput={ e => setPlayerName(e.target.value)} disabled={gameType === GAME_TYPE.MULTIPLAYER}/>
          </form>
        </FormGroup>
      </Container>
      <Board {...{ board, gameState, currentPlayer, onCellClick}}/>
    </Container>
    {(gameType === GAME_TYPE.MULTIPLAYER && playerName) ? 
      <EventProvider {...{playerName, gameType, onMatch, onAccept}}><Roster {...{onNewMatch}}/></EventProvider>: null
    }
  </Box>
  )

}

export default Game;