const WIN_LENGTH = 4;

export const PLAYER = { ONE: 1, TWO: 2};
export const GAME_STATE = { ONGOING: 0, ONE_WON: 1, TWO_WON: 2, TIE: 3, HOLD: 4}
export const GAME_TYPE = { SINGLE: 0, MULTIPLAYER: 1 }
export const EMPTY_BOARD = 
[
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0]
];

export function lowestRow(y, board) {
  let x = -1;
  for (let i = 0; i < board.length; i++) {
    if (board[i][y]) {
      break;
    }
    x = i
  }
  return x;
}

export function makeMove(x, y, board, currentPlayer) {
    // Column is full
    if (board[0][y]) {
      return false;
    }

    // Find height to drop
    x = lowestRow(y, board);

    const newBoard = [
      ...board.slice(0, x), 
      [...board[x].slice(0, y), currentPlayer, ...board[x].slice(y+1)], 
      ...board.slice(x+1)
    ];
    return newBoard
}

export function checkState(board) {
  const height = board.length;
  const width = board[0].length;

  let last = 0;
  let count = 0;
  const checkCell = (x, y) => {
    if (board[x][y] === last){
      count += 1;
      if (count === WIN_LENGTH) {
        return last;
      }
    } else {
      last = board[x][y]
      count = 1
    }
    return 0;
  }

  // Horizontal
  let countZero = 0;
  for (let i = 0; i < height; i++) {
    last = 0;
    count = 0;
    for (let j = 0; j < width; j++) {
      if (!board[i][j]) {
        countZero++;
      }
      const result = checkCell(i, j);
      if (result) {
        return result;
      }
    }
  }

  if (!countZero) {
    return GAME_STATE.TIE;
  }
  
  // Vertical
  for (let j = 0; j < width; j++) {
    last = 0;
    count = 0;
    for (let i = 0; i < height; i++) {
      const result = checkCell(i, j);
      if (result) {
        return result;
      }
    }
  }

  //Diagonal - Down and Right
  for (let i = height - WIN_LENGTH; i >= 0; i--) {
    let j = 0;
    let k = i;
    last = 0;
    count = 0;
    while (j < width && k < height) {
      const result = checkCell(k, j);
      if (result) {
        return result;
      }
      j += 1;
      k += 1;
    }
  }

  
  for (let j = width - WIN_LENGTH; j >= 0; j--) {
    let i = 0;
    let k = j;
    last = 0;
    count = 0;
    while (i < height && k < width) {
      const result = checkCell(i, k);
      if (result) {
        return result;
      }
      i += 1;
      k += 1;
    }
  }

  //Diagonal - Up and Right
  for (let i = WIN_LENGTH - 1; i < height; i++) {
    let j = 0;
    let k = i;
    last = 0;
    count = 0;
    while (j < width && k >= 0) {
      const result = checkCell(k, j);
      if (result) {
        return result;
      }
      j += 1;
      k -= 1;
    }
  }

  
  for (let j = width - WIN_LENGTH; j > 0; j--) {
    let i = height - 1;
    let k = j;
    last = 0;
    count = 0;
    while (i > 0 && k < width) {
      const result = checkCell(i, k);
      if (result) {
        return result;
      }
      i -= 1
      k += 1;
    }
  }

  return GAME_STATE.ONGOING;
}