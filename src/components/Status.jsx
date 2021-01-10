import './Status.css';
import { GAME_STATE, PLAYER } from '../util/game';

const GameStatus = ({gameState, currentPlayer}) => {
  let className = "status";
  let status = "";

  switch(gameState) {
    case GAME_STATE.ONGOING:
      if (currentPlayer === PLAYER.ONE) {
        className += " player1";
        status = "Player 1 Turn";
      } else {
        className += " player2";
        status = "Player 2 Turn";
      }
      break;
    case GAME_STATE.ONE_WON:
      className += " player1 won";
      status = "Player 1 Won";
      break;
    case GAME_STATE.TWO_WON:
      className += " player2 won";
      status = "Player 2 Won";
      break;
    case GAME_STATE.TIE:
      className += " tie";
      status = "Tied";
      break;
    case GAME_STATE.HOLD:
      status = "Other Players Turn"
      break;
    default:
      console.log(`??? ${gameState}`);
      break;
  }

  return <div className={className}>{status}</div>;
}

export default GameStatus;